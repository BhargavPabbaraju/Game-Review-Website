import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileItem from "./profileItem";
import "./index.css";
import { BACKEND_API } from "../services/user-service";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { followUserThunk, unFollowUserThunk } from "../services/user-thunks";

const SearchPeople = () => {
  const [profiles, setprofiles] = useState([]);
  const userData = useSelector((state) => state.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    userApi();
  }, [userData]);

  const userApi = async () => {
    let response = {};
    if (userData.profile.isLoggedIn) {
      response = await axios.get(`${BACKEND_API}/getuserslist`, {
        headers: { "x-auth-token": userData.profile.token },
      });
    } else {
      response = await axios.get(`${BACKEND_API}/getuserslist`);
    }
    if (response.data.status == 200) {
      setprofiles(response.data.usersData);
    } else {
      alert("Data Not Found");
    }
  };
  const followHandler = async (profileData) => {
    if (userData.profile.isLoggedIn) {
      dispatch(followUserThunk({ uid: profileData._id }));
    } else {
      navigate("/login");
    }
  };
  const unfollowHandler = async (profileData) => {
    if (userData.profile.isLoggedIn) {
      dispatch(unFollowUserThunk({ uid: profileData._id }));
    }
  };
  const searchHandler = async (e) => {
    if (e.key == "Enter") {
      let response = {};
      if (e.target.value.length > 0) {
        if (userData.profile.isLoggedIn) {
          response = await axios.get(
            `${BACKEND_API}/searchuser/${e.target.value}`,
            {
              headers: { "x-auth-token": userData.profile.token },
            }
          );
        } else {
          response = await axios.get(
            `${BACKEND_API}/searchuser/${e.target.value}`
          );
        }
        if (response.data.status == 200) {
          setprofiles(response.data.usersData);
        }
      } else {
        userApi();
      }
    }
  };
  return (
    <div>
      <h4 className="mb-0">Search</h4>
      <div className="row">
        <div className="col-12">
          <i className="bi bi-search wd-search-icon text-light ps-2"></i>
          <input
            className="form-control rounded-pill bg-dark ps-4"
            onKeyUp={searchHandler}
          />
          <div className="row">
            {profiles.map((p1) => (
              <ProfileItem
                profile={p1}
                unfollowHandler={unfollowHandler}
                followHandler={followHandler}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPeople;
