import React from "react";

const ProfileReviewItem =({review}) =>{

    return (
        <li className="list-group-item">
            {review.gameTitle}
        </li>
    );
}

export default ProfileReviewItem;