import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ProfileComponentDetails from "./ProfileComponentDetails";
import { BACKEND_API } from "../services/user-service";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ProfileReview from "./ProfileOtherReview";
import { useNavigate } from "react-router-dom";
import { followUserThunk, unFollowUserThunk } from "../services/user-thunks";

function ProfileComponentOther() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const userData = useSelector((state) => state.userData);
  useEffect(() => {
    const lastSegment = location.pathname.split("/").pop();
    userApi(lastSegment);
  }, [userData]);

  const userApi = async (lastSegment) => {
    let response = {};
    if (userData.profile.isLoggedIn) {
      response = await axios.get(`${BACKEND_API}/profile/${lastSegment}`, {
        headers: { "x-auth-token": userData.profile.token },
      });
    } else {
      response = await axios.get(`${BACKEND_API}/profile/${lastSegment}`);
    }
    if (response.data.status == 200) {
      setData(response.data.userObject);
    } else {
      alert("User Not Found");
    }
  };

  const followHandler = async (e) => {
    if (userData.profile.isLoggedIn) {
      dispatch(followUserThunk({ uid: data._id }));
    } else {
      navigate("/login");
    }
  };
  const unfollowHandler = async (e) => {
    if (userData.profile.isLoggedIn) {
      dispatch(unFollowUserThunk({ uid: data._id }));
    }
  };

  return (
    <div className="border border-secondary rounded-4 ">
      <div className="row ">
        <div className="col-auto ps-5">
          <div className="row fw-bolder">
            {data.firstname} {data.lastname}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <img
            alt="Banner"
            src={data.cover_pic}
            className="w-100"
            height={240}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-3 ms-4 me-0">
          <img
            alt="profile"
            src={data.profile_pic}
            className="rounded-circle wd-profile-picture"
            width={120}
          />
        </div>
        <div className="col-1">
          <span className="badge rounded-pill bg-primary fs-6">
            {data.role}
          </span>
        </div>
      </div>
      <div className="wd-pull-up ms-4">
        <div className="row">
          <div className="col">
            <h5 className="fw-bolder">
              {data.firstname} {data.lastname}
            </h5>
          </div>
          <div className="col">
            <div className="p-1">
              {data.following ? (
                <button
                  className="btn btn-dark rounded-pill float-end"
                  onClick={unfollowHandler}
                >
                  Following
                </button>
              ) : (
                <button
                  className="btn btn-primary rounded-pill float-end"
                  onClick={followHandler}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="row wd-handle">
          <span className="text-secondary mt-0"> {data.handle}</span>
        </div>
        <div className="row">
          <p>{data.bio}</p>
        </div>
        <ProfileComponentDetails profile={data} />
        <div className="row mt-3">
          <h5>Activities</h5>
          <div className="row mb-2 rounded-4">
            <ProfileReview profile={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponentOther;
