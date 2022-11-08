import React from "react";
import "./index.css";

const SlideshowItem = (
    {
        item = {
            _id:123,
            active:true,
            image:"https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
            title:"Grand Theft Auto V"
        },


    }
) => {

    return (
        <div className={`carousel-item ${item.active?"active":""}`}>
            <img alt="gta5" className="d-block w-100"
                 src={item.image}/>
            <div className="carousel-caption d-none d-md-block">
                <h5>{item.title}</h5>
                <p>{item.title}</p>
            </div>
        </div>
    );
}

export default SlideshowItem;