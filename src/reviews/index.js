import React, {useEffect, useState} from "react";
import ReviewItem from "./review-item";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {BACKEND_API} from "../services/user-service";
import {Modal} from "../detail/modal";
import {Link} from "react-router-dom";
import {updateLikesThunk} from "../services/user-thunks";

const Reviews = (game) => {
    const [gamereview, setgamereview]=useState("")
    const [liked, setLiked] = useState(false);
    const [likes, setLikes]=useState(0);
    const [reviewed,setreviewed]=useState(false)
    const dispatch=useDispatch();
    const userData = useSelector((state) => state.userData);
    useEffect(() => {
        getGameReviews();
    }, [userData]);

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };

    const increaseCount=(e)=>{
        const obj={
            like:true,
            gameid:game.game.id
        }
        dispatch(updateLikesThunk(obj))
    }

    const decreaseCount=(e)=>{
        const obj={
            like:false,
            gameid:game.game.id
        }
        dispatch(updateLikesThunk(obj))
    }

    async function getGameReviews() {
        console.log("game",game)
        const response = await axios.get(
            `${BACKEND_API}/details/getdetails/`+game.game.id,{headers: { "x-auth-token": userData.profile.token }}
        );
        console.log("response",response)
        const obj=response.data.data.reviews;
        obj.sort(function(a, b){
            if(a.role=="streamer")return -1
            return 1;
        });
        setLikes(response.data.data.likes.length)
        setLiked(response.data.data.liked)
        setreviewed(response.data.data.reviewed)
        setgamereview(response.data.data.reviews);
        console.log("reviewed",reviewed)
        console.log("likes",likes)
    }



    return (
        <>
        <div className="row">
            <h5 className="col">Reviews</h5>
            <div className="col-2 fs-5">
                {!liked && (
                    <i
                        className="bi bi-heart me-1 pt-2"
                        onClick={(e) => {
                           increaseCount(e)
                        }}
                    ></i>
                )}
                {liked && (
                    <i
                        className="bi bi-heart-fill me-1 text-danger pt-2"
                        onClick={(e) => {
                          decreaseCount(e)
                        }}
                    ></i>
                )}
                {likes}
            </div>
            <div className="col-3">
                {/*<button className="btn btn-primary rounded rounded-pill">*/}
                {/*  Post a review*/}
                {/*</button>*/}

                { userData.profile.isLoggedIn&&  <button className="btn btn-primary rounded rounded-pill"  disabled={reviewed?true:false} onClick={openModal}>Post review</button>}
                { !userData.profile.isLoggedIn&& <Link to="/login"><button className="btn btn-primary rounded rounded-pill" >Post review</button></Link> }
                {showModal ? <Modal setShowModal={setShowModal} game={game.game} type={"new"}/> : null}

            </div>

           </div>

            <ul className="list-group">
                <br/>
                {gamereview&& gamereview.map(review=> userData.profile.isLoggedIn && review.uid==userData.profile._id && <ReviewItem key={review._id} review={review} iseditable={true}/>)}
                <br/>
                {gamereview&& gamereview.map(review=> (!userData.profile.isLoggedIn||review.uid!=userData.profile._id) &&  <ReviewItem key={review._id} review={review} iseditable={false}/>)}
                {/*{gamereview&& gamereview.map(review=><ReviewItem key={review._id} review={review} iseditable={true}/>)}*/}
                {/*{gamereview&&gamereview.filter(review=>review._id==userData.profile.id)}*/}
                {/*{gamereview&& gamereview.forEach((review)=>{*/}
                {/*    if(userData.profile.isLoggedIn && review.uid==userData.profile._id){*/}
                {/*        console.log("userreview")*/}
                {/*        && <ReviewItem  review={review} iseditable={true}/>*/}
                {/*    }*/}
                {/*    else {*/}
                {/*      return   <ReviewItem review={review} iseditable={false}/>*/}
                {/*    }*/}
                {/*})}*/}
            </ul>
        </>
    );
}

export default  Reviews;