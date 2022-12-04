import React from "react";
import ProfileReviewItem from "./profile-review-item";
import {useSelector} from "react-redux";



const ProfileReview = ()=>{
    const games=useSelector(state => state.userData.profile.activity)
    console.log(games)
    const user={
        _id:123,
        userName:"Roronoa Zoro",
        userAvatar:"https://pbs.twimg.com/profile_images/1589592333208924161/v0rPPnAA_400x400.jpg",



    }
    const reviews=[
        {
            _id:123,
            comment:"I keep getting lost in this game.",
            rating:0.2,
            game:{
                title:"Grand Theft Auto V",
                id:123,
                image:"https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
            },



        },
        {
            _id:234,
            comment:"I'm not a witch. I'm a swordsman.",
            rating:0.2,
            game:{
                title:"The Witcher 3: Wild Hunt",
                id:123,
                image:"https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
            },



        },

    ]
    return (
        <div className="row">
            {/*<div className="row">*/}
            {/*    <h4>{reviews.length}</h4>*/}
            {/*</div>*/}
            <ul className="list-group">
                {games?games.map(x=><ProfileReviewItem  review={x}/>):""}
            </ul>
        </div>

    );
}

export  default  ProfileReview;