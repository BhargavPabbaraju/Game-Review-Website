import React from "react";
import ProfileReviewItem from "./profile-review-item";
import { useSelector } from "react-redux";

const ProfileReview = () => {
  const games = useSelector((state) => state.userData.profile.activity);

  return (
    <div className="row">
      {/*<div className="row">*/}
      {/*    <h4>{reviews.length}</h4>*/}
      {/*</div>*/}
      <ul className="list-group pe-0">
        {games ? games.map((x) => <ProfileReviewItem review={x} />) : ""}
      </ul>
    </div>
  );
};

export default ProfileReview;
