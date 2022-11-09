import React from "react";
import ProfileReviewItem from "./profile-review-item";



const ProfileReview = ()=>{
    const user={
        _id:123,
        userName:"Roronoa Zoro",
        userAvatar:"https://pbs.twimg.com/profile_images/1589592333208924161/v0rPPnAA_400x400.jpg",



    }
    const reviews=[
        {
            _id:123,
            game:{
                title:"Grand Theft Auto V",
                id:123,
                image:"https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
            },

            comment:"I keep getting lost in this game.",
            rating:0.2,

        },
        {
            _id:123,
            gameTitle:"The Witcher 3: Wild Hunt",
            gameId:123,
            comment:"I keep getting lost in this game.",
            rating:5.0,

        },

    ]
    return (
        <div className="row">
            <div className="row">
                <h4>{reviews.length}</h4>
            </div>
            <ul className="list-group">
                {reviews.map(review=><ProfileReviewItem key={review._id} review={review}/>)
                }
            </ul>
        </div>

    );
}

export  default  ProfileReview;