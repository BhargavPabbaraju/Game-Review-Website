import React from "react";
import {useSelector} from "react-redux";
import DetailComponent from "../detail";
import {Link} from "react-router-dom";

const ProfileReviewItem =({review}) =>{
    const user=useSelector(state => state.userData.profile.firstname)

    return (
        <li className="list-group-item">
            <Link className="text-dark text-decoration-none"
                  to={"/detail/"+review.gameid} element={<DetailComponent/>}>
            <div className="row">
                <div className="col-3">
                    <img alt="game" src={review.gameImage} className="w-100" height={100} />
                </div>
                <div className="col">

                    <div className="row">
                        <div className="col">
                            {review.liked?<p>You liked {review.gamename}</p>:<p>{review.gamename}</p>}
                        </div>
                        {review.review && review.review.review?
                        <div className="col-md-2 col-3">
                            <i className="bi bi-star-fill text-warning pe-1"></i>
                            {Math.round(review.review.rating * 10) / 10}
                        </div>:""}
                    </div>
                    <div className="row ps-2 me-2">
                        {review.review && review.review.review?
                        <textarea className="form-control" disabled={true}>
                            {review.review.review}
                        </textarea>:""}

                    </div>
                </div>
            </div>
            </Link>
        </li>
    );
}

export default ProfileReviewItem;