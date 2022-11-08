import React from "react";
import SlideshowItem from "./slideshow-item";


const Slideshow = () => {

    const slideshowitems = [
        {
            _id:123,
            active:false,
            image:"https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
            title:"Grand Theft Auto V",
            rating:4.47,
        },
        {
            _id:234,
            active:true,
            image:"https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
            title:"The Witcher 3: Wild Hunt",
            rating:4.06,
        },
        {
            _id:345,
            active:false,
            image:"https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
            title:"Portal 2",
            rating:4.61,
        },
    ]

    return (
        <div>
            <div id ="slideshow" class="carousel slide" data-ride ="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#slideshow" data-slide-to={0} class="active"></li>
                    <li data-target="#slideshow" data-slide-to={1}></li>
                    <li data-target="#slideshow" data-slide-to={2}></li>
                </ol>
                <div class="carousel-inner">
                    {
                        slideshowitems.map(item=>
                                               <SlideshowItem key={item._id} item={item}/>
                        )

                    }
                </div>
                <a className="carousel-control-prev" href="#slideshow" role="button"
                   data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#slideshow" role="button"
                   data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>

        </div>
    );
}

export default Slideshow;