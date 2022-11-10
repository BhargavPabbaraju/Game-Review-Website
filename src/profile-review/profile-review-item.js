import React from "react";

const ProfileReviewItem =({review}) =>{

    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-3">
                    <img alt="game" src={review.game.image} className="w-100" height={100} />
                </div>
                <div className="col">

                    <div className="row">
                        <div className="col">
                            <p>{review.game.title}</p>
                        </div>
                        <div className="col-md-2 col-3">
                            <i className="bi bi-star-fill text-warning pe-1"></i>
                            {Math.round(review.rating * 10) / 10}
                        </div>
                    </div>
                    <div className="row ps-2">
                        <textarea className="form-control">
                            {review.comment}
                        </textarea>
                    </div>
                </div>
            </div>

        </li>
    );
}

export default ProfileReviewItem;