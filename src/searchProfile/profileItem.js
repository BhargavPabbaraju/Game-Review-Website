import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Profile = ({ profile, followHandler, unfollowHandler }) => {
  const userData = useSelector((state) => state.userData);
  var badge = "badge rounded-pill pt-1 pb-1 fw-bolder ";
  if (profile.role === "streamer") badge = badge + " bg-warning ";
  else if (profile.role === "creator") badge = badge + " bg-success ";
  else badge = badge + "bg-info";

  const [following, setFollowing] = useState(false);
  useEffect(() => {
    if (
      userData.profile.following_list &&
      userData.profile.following_list.find((e) => e == profile._id)
    ) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [userData]);
  const followHandlers = async (e) => {
    followHandler(profile);
  };
  const unfollowHandlers = async (e) => {
    unfollowHandler(profile);
  };

  return (
    <>
      <div className="col-md-6 d-flex align-items-center p-3 col-xs-12 mh-100">
        <div className="card w-100">
          <div className="row">
            <div className="col-12  position-relative">
              <div className="col-12">
                <img
                  className="card-img-top"
                  alt="Card"
                  src={profile.cover_pic + "?v=" + Date.now()}
                  height={100}
                />
              </div>
              <div>
                <img
                  className="rounded-circle user-profile-pic position-absolute  "
                  style={{ width: "75px", height: "75px" }}
                  src={profile.profile_pic + "?v=" + Date.now()}
                />
              </div>
              <div className="p-1">
                {following ? (
                  <button
                    className="btn btn-dark rounded-pill float-end"
                    onClick={unfollowHandlers}
                  >
                    Following
                  </button>
                ) : (
                  <button
                    className="btn btn-primary rounded-pill float-end"
                    onClick={followHandlers}
                  >
                    Follow
                  </button>
                )}
              </div>
            </div>
            <Link
              to={`/profile/${profile._id}`}
              className="text-white text-decoration-none"
            >
              <div className="col-12  card-body p-3">
                {profile.firstname} {profile.lastname}
                <p className="card-title">
                  {"Role : "}
                  <span className={badge}>{profile.role}</span>
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
