import React, { useEffect, useState } from "react";
import ReviewItem from "./review-item";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_API } from "../services/user-service";
import { Modal } from "../detail/modal";
import { Link } from "react-router-dom";
import {
  favoriteGameThunk,
  updateLikesThunk,
  unfavoriteGameThunk,
} from "../services/user-thunks";

const Reviews = (game) => {
  const [gamereview, setgamereview] = useState("");
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [reviewed, setreviewed] = useState(false);
  const [favorited, setFavorited] = useState(false);
  //const [totalData, setTotalData] = useState({
  //   likes: 0,
  //   liked: false,
  //   reviewed: false,
  //   favorited: false,
  // });
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    getGameReviews();
  }, [userData]);

  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const increaseCount = (e) => {
    const obj = {
      like: true,
      gameid: game.game.id,
    };
    // setTotalData((preState) => ({
    //   ...preState,
    //   likes: preState.likes + 1,
    //   liked: !preState.liked,
    // }));
    setLiked(!liked);
    setLikes(likes + 1);
    dispatch(updateLikesThunk(obj));
  };

  const decreaseCount = (e) => {
    const obj = {
      like: false,
      gameid: game.game.id,
    };
    // setTotalData((preState) => ({
    //   ...preState,
    //   likes: preState.likes - 1,
    //   liked: !preState.liked,
    // }));
    setLiked(!liked);
    setLikes(likes - 1);
    dispatch(updateLikesThunk(obj));
  };

  async function getGameReviews() {
    const response = await axios.get(
      `${BACKEND_API}/details/getdetails/` + game.game.id,
      { headers: { "x-auth-token": userData.profile.token } }
    );
    const obj = response.data.data.reviews;
    console.log("data", obj);
    obj.sort(function (a, b) {
      if (a.role == "streamer") return -1;
      return 1;
    });
    setFavorited(response.data.data.favorited);
    setLikes(response.data.data.likes.length);
    setLiked(response.data.data.liked);
    setreviewed(response.data.data.reviewed);
    setgamereview(response.data.data.reviews);
    //setTotalData(response.data.data);
  }

  const favoriteGameHandler = () => {
    dispatch(favoriteGameThunk({ gameid: game.game.id }));
    //setTotalData((preState) => ({ ...preState, favorited: true }));
    setFavorited(true);
  };

  const unfavoriteGameHandler = () => {
    dispatch(unfavoriteGameThunk(game.game.id));
    //setTotalData((preState) => ({ ...preState, favorited: false }));
    setFavorited(false);
  };

  return (
    <>
      <div className="row mb-5 mt-2">
        <div className="col h-100">
          {!favorited ? (
              <button
                  className="btn btn-warning rounded-pill col-3"
                  onClick={favoriteGameHandler}
              >
                Favorite
              </button>
          ) : (
               <button
                   className="btn btn-dark rounded-pill col-3"
                   onClick={unfavoriteGameHandler}
               >
                 Unfavorite
               </button>
           )}
        </div>
        <div className="col-3 ps-5 h-100 fs-5 d-flex">
          {!liked && (
            <i
              className="bi bi-heart me-1 pt-2"
              onClick={(e) => {
                increaseCount(e);
              }}
            ></i>
          )}
          {liked && (
            <i
              className="bi bi-heart-fill me-1 text-danger pt-2"
              onClick={(e) => {
                decreaseCount(e);
              }}
            ></i>
          )}
          <span className="d-flex p-1">{likes}</span>
        </div>
      </div>
        <div className="row">
          <h5 className="col-9">Reviews</h5>
          <div className="col-3">
            {/*<button className="btn btn-primary rounded rounded-pill">*/}
            {/*  Post a review*/}
            {/*</button>*/}

            {userData.profile.isLoggedIn && (
                <button
                    className="btn btn-primary rounded rounded-pill"
                    disabled={reviewed ? true : false}
                    onClick={openModal}
                >
                  Post review
                </button>
            )}
            {!userData.profile.isLoggedIn && (
                <Link to="/login">
                  <button className="btn btn-primary rounded rounded-pill">
                    Post review
                  </button>
                </Link>
            )}
            {showModal ? (
                <Modal setShowModal={setShowModal} game={game.game} type={"new"} />
            ) : null}
          </div>
        </div>


      <ul className="list-group">
        <br />
        {gamereview &&
          gamereview.map(
            (review) =>
              userData.profile.isLoggedIn &&
              review.uid._id == userData.profile._id && (
                <ReviewItem
                  key={review._id}
                  review={review}
                  aReview={review.review}
                  iseditable={true}
                />
              )
          )}
        <br />
        {gamereview &&
          gamereview.map(
            (review) =>
              (!userData.profile.isLoggedIn ||
                review.uid._id != userData.profile._id) && (
                <ReviewItem
                  key={review.uid._id}
                  review={review}
                  aReview={review.review}
                  iseditable={false}
                />
              )
          )}
      </ul>
    </>
  );
};

export default Reviews;
