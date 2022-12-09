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
  const [totalData, setTotalData] = useState({});
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
    setTotalData((preState) => ({
      ...preState,
      likes: preState.likes + 1,
      liked: !preState.liked,
    }));
    // setLiked(!liked);
    // setLikes(likes + 1);
    dispatch(updateLikesThunk(obj));
  };

  const decreaseCount = (e) => {
    const obj = {
      like: false,
      gameid: game.game.id,
    };
    setTotalData((preState) => ({
      ...preState,
      likes: preState.likes - 1,
      liked: !preState.liked,
    }));
    // setLiked(!liked);
    // setLikes(likes - 1);
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
    // setFavorited(response.data.data.favorited);
    // setLikes(response.data.data.likes.length);
    // setLiked(response.data.data.liked);
    // setreviewed(response.data.data.reviewed);
    // setgamereview(response.data.data.reviews);
    setTotalData(response.data.data);
  }

  const favoriteGameHandler = () => {
    dispatch(favoriteGameThunk({ gameid: game.game.id }));
    setTotalData((preState) => ({ ...preState, favorited: true }));
    // setFavorited(true);
  };

  const unfavoriteGameHandler = () => {
    dispatch(unfavoriteGameThunk(game.game.id));
    setTotalData((preState) => ({ ...preState, favorited: false }));
    // setFavorited(false);
  };

  return (
    <>
      <div className="row">
        <h5 className="col-3">Reviews</h5>
        {!totalData.favorited ? (
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

        <div className="col-3 fs-5 ps-5">
          {!totalData.liked && (
            <i
              className="bi bi-heart me-1 pt-2"
              onClick={(e) => {
                increaseCount(e);
              }}
            ></i>
          )}
          {totalData.liked && (
            <i
              className="bi bi-heart-fill me-1 text-danger pt-2"
              onClick={(e) => {
                decreaseCount(e);
              }}
            ></i>
          )}
          {totalData.likes && totalData.likes.length}
        </div>
        <div className="col-3">
          {/*<button className="btn btn-primary rounded rounded-pill">*/}
          {/*  Post a review*/}
          {/*</button>*/}

          {userData.profile.isLoggedIn && (
            <button
              className="btn btn-primary rounded rounded-pill"
              disabled={totalData.reviewed ? true : false}
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
        {totalData.reviews &&
          totalData.reviews.map(
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
        {totalData.reviews &&
          totalData.reviews.map(
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
        {/*{gamereview&& gamereview.map(review=><ReviewItem key={review._id} review={review} iseditable={true}/>)}*/}
        {/*{gamereview&&gamereview.filter(review=>review._id==userData.profile.id)}*/}
        {/*{gamereview&& gamereview.forEach((review)=>{*/}
        {/*    if(userData.profile.isLoggedIn && review.uid==userData.profile._id){*/}
        {/*        && <ReviewItem  review={review} iseditable={true}/>*/}
        {/*    }*/}
        {/*    else {*/}
        {/*      return   <ReviewItem review={review} iseditable={false}/>*/}
        {/*    }*/}
        {/*})}*/}
      </ul>
     
    </>
  );
};

export default Reviews;
