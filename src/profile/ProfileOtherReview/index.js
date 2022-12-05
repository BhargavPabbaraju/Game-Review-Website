import React from "react";
import ProfileReviewItem from "./ProfileReviewItem";
import { useSelector } from "react-redux";

const ProfileReview = ({ profile }) => {
  return (
    <div className="row">
      <ul className="list-group">
        {profile.activity
          ? profile.activity.map((x) => (
              <ProfileReviewItem review={x} profile={profile} />
            ))
          : ""}
      </ul>
    </div>
  );
};

export default ProfileReview;
