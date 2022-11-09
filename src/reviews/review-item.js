import React from "react";
const ReviewItem = ({review}) => {
    return (
        <li className="list-group-item">
            {
                review.featured &&
                <div className="row d-inline-block mb-2 ">
                    <span className="bg-success rounded-pill pt-1 pb-1 fw-bolder">
                        Featured Review
                    </span>
                </div>

            }
            <div className="row">
                <div className="col-2 me-3">
                    <img alt="avatar" src={review.userAvatar} className="rounded-circle" width={60}
                        height={60}/>
                </div>
                <div className="col">
                    <div className="row fw-bolder">
                        <div className="col-md-10 col-9">
                            {review.userName}
                        </div>
                        <div className="col-md-2 col-3">
                            <i className="bi bi-star-fill text-warning pe-1"></i>
                            {Math.round(review.rating * 10) / 10}
                        </div>
                    </div>
                    <div className="row mt-2">
                        <textarea className="form-control" readOnly>
                            {review.comment}
                        </textarea>
                    </div>
                </div>
            </div>
        </li>
    );
}

export default  ReviewItem;