import React, { useEffect, useState } from "react";
import ReviewItem from "./review-item";
import { useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_API } from "../services/user-service";

const Reviews = (game) => {
  const [gamereview, setgamereview] = useState("");
  const userData = useSelector((state) => state.userData);
  useEffect(() => {
    getGameReviews();
  }, [userData]);

  async function getGameReviews() {
    const response = await axios.get(
      `${BACKEND_API}/details/getdetails/` + game.game.id,
      { headers: { "x-auth-token": userData.profile.token } }
    );
    const obj = response.data.data.reviews;
    obj.sort(function (a, b) {
      if (a.role == "streamer") return -1;
      return 1;
    });
    setgamereview(response.data.data.reviews);
  }

  const reviews = [
    {
      _id: 123,
      userName: "Monkey D. Luffy",
      userAvatar:
        "https://pbs.twimg.com/profile_images/1584225321917751296/EexwtMbM_400x400.jpg",
      comment:
        "This game is one of the best I've ever played! Kaizoku ou ni ore wa naru!",
      rating: 5.0,
      featured: true,
    },
    {
      _id: 234,
      userName: "Anya Forger",
      userAvatar:
        "https://pbs.twimg.com/profile_images/1576209420949782529/ZOMWYEMI_400x400.jpg",
      comment: "Anya waku waku!",
      rating: 3.8,
      featured: true,
    },
    {
      _id: 345,
      userName: "Itadori Yuji",
      userAvatar:
        "https://pbs.twimg.com/profile_images/1356460276581687296/fI2e__Ft_400x400.jpg",
      comment: "One of the worst games I've ever played!",
      rating: 1.23,
      featured: false,
    },
    {
      _id: 456,
      userName: "Roronoa Zoro",
      userAvatar:
        "https://pbs.twimg.com/profile_images/1589592333208924161/v0rPPnAA_400x400.jpg",
      comment: "This game is very hard to navigate. I kept losing my way.😠",
      rating: 1.23,
      featured: false,
    },
  ];
  return (
    <ul className="list-group">
      {gamereview &&
        gamereview.map(
          (review) =>
            userData.profile.isLoggedIn &&
            review.uid == userData.profile._id && (
              <ReviewItem key={review._id} review={review} iseditable={true} />
            )
        )}
      <br />
      {gamereview &&
        gamereview.map(
          (review) =>
            (!userData.profile.isLoggedIn ||
              review.uid != userData.profile._id) && (
              <ReviewItem key={review._id} review={review} iseditable={false} />
            )
        )}
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
  );
};

export default Reviews;
