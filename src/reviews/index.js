import React from "react";
import ReviewItem from "./review-item";

const Reviews = () => {
    const reviews=[
        {
            _id:123,
            userName:"Monkey D. Luffy",
            userAvatar:"https://pbs.twimg.com/profile_images/1584225321917751296/EexwtMbM_400x400.jpg",
            comment:"This game is one of the best I've ever played! Kaizoku ou ni ore wa naru!",
            rating:5.0,
            featured:true
        },
        {
            _id:234,
            userName:"Anya Forger",
            userAvatar:"https://pbs.twimg.com/profile_images/1576209420949782529/ZOMWYEMI_400x400.jpg",
            comment:"Anya waku waku!",
            rating:3.8,
            featured:true
        },
        {
            _id:345,
            userName:"Itadori Yuji",
            userAvatar:"https://pbs.twimg.com/profile_images/1356460276581687296/fI2e__Ft_400x400.jpg",
            comment:"One of the worst games I've ever played!",
            rating:1.23,
            featured:false
        },
        {
            _id:456,
            userName:"Roronoa Zoro",
            userAvatar:"https://pbs.twimg.com/profile_images/1589592333208924161/v0rPPnAA_400x400.jpg",
            comment:"This game is very hard to navigate. I kept losing my way.😠",
            rating:1.23,
            featured:false
        },
    ]
    return (
            <ul className="list-group">
                {reviews.map(review=><ReviewItem key={review._id} review={review}/>)}
            </ul>
    );
}

export default  Reviews;