import React, { useEffect, useState } from "react";

import FollowerItem from "./follower-item";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiKey, BACKEND_API } from "../services/user-service";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const FollowersComponent = ({ following }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const userData = useSelector((state) => state.userData);

  const [profiles, setProfiles] = useState([]);
  useEffect(() => {
    getProfiles();
  }, []);

  async function getProfiles() {
    const _id = searchParams.get("id")
      ? searchParams.get("id")
      : userData.profile._id;
    if (following) {
      const response = await axios.get(`${BACKEND_API}/getfollowing/${_id}`);
      setProfiles(response.data.data.following_list);
    } else {
      const response = await axios.get(`${BACKEND_API}/getfollowers/${_id}`);
      setProfiles(response.data.data.followers_list);
    }
  }

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <Link to="/profile">
            <i className="bi bi-arrow-left fs-5"></i>
          </Link>
        </div>
        <div className="col">
          {following && <h5>Following</h5>}
          {!following && <h5>Followers</h5>}
        </div>
      </div>
      <div className="row">
        <ul className="list-group">
          {profiles.map((profile) => {
            return <FollowerItem key={profile.id} profile={profile} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default FollowersComponent;
