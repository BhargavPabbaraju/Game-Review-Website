import React, { useState } from "react";
import { Modal } from "../detail/modal";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteReviewThunk } from "../services/user-thunks";
const ReviewItem = ({ review, iseditable }) => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const dispatch = useDispatch();
  const deleteReview = (e) => {
    e.preventDefault();
    let obj = {
      gameid: review.gameid,
    };
    dispatch(deleteReviewThunk(obj));
    window.location.reload();
  };
  return (
    <li className="list-group-item">
      {review.role == "streamer" && (
        <div className="row d-inline-block mb-2 ">
          <span className="bg-success rounded-pill pt-1 pb-1 fw-bolder">
            Featured Review
          </span>
        </div>
      )}
      <div className="row">
        <div className="col-2 me-3">
          <img
            alt="avatar"
            src={review.uid.profile_pic}
            className="rounded-circle"
            width={60}
            height={60}
          />
        </div>
        <div className="col">
          <div className="row fw-bolder">
            <div className="col-md-9 col-9">{review.uid.username}</div>
            <div className="col-md-3 col-3">
              <i className="bi bi-star-fill text-warning pe-1"></i>
              {Math.round(review.rating * 10) / 10}
              {iseditable && (
                <Link className="p-1" onClick={openModal}>
                  <i className="bi bi-pencil"></i>
                </Link>
              )}
              {showModal ? (
                <Modal
                  setShowModal={setShowModal}
                  game={review}
                  type={"edit"}
                />
              ) : null}
              {iseditable && (
                <Link className="p-1" onClick={(e) => deleteReview(e)}>
                  <i className="bi bi-trash"></i>
                </Link>
              )}
            </div>
          </div>
          <div className="row mt-2">
            <textarea className="form-control" readOnly>
              {review.review}
            </textarea>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ReviewItem;
