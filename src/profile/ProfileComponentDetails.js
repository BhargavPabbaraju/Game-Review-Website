import React from "react";

function ProfileComponentDetails({ profile }) {
  return (
    <div>
      <div className="row">
        <div className="col-3">
          <i className="bi bi-geo-alt"></i>
          <span className="ms-1">{profile.location}</span>
        </div>
        <div className="col-5">
          <i className="bi bi-balloon"></i>
          <span className="ms-1">
            Born{" "}
            {new Date(profile.dob).toLocaleDateString("en-us", {
              day: "numeric",
              year: "numeric",
              month: "long",
            })}
          </span>
        </div>
        <div className="col-4">
          <i className="bi bi-calendar3"></i>
          <span className="ms-1">
            Joined{" "}
            {new Date(profile.doj).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
            })}
          </span>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-3">
          <span className="fw-bolder">{profile.following_count}</span> Following
        </div>
        <div className="col-3">
          <span className="fw-bolder">{profile.followers_count}</span> Followers
        </div>
      </div>
    </div>
  );
}

export default ProfileComponentDetails;
