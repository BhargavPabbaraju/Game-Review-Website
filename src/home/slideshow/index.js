import React, {useEffect, useState} from "react";

// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Autoplay,EffectFade, Navigation, Pagination } from "swiper";

import axios from "axios";
import './index.css';
import {Link} from "react-router-dom";
import DetailComponent from "../../detail";


const apiKey = "f227150707ad40b08b9a626750b0564b";



const Slideshow = () => {
    const url = `https://api.rawg.io/api/games?key=${apiKey}&publishers=nintendo&ordering=-released&page_size=5`
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(null);

    const getData = async ()=>{
        try{
            const response = await axios.get(
                url
            );
            setData(response.data);
            setError(null);
        }catch(err){
            setError(err.message);
            setData(null);
        }finally {
            setLoading(false);
        }
    }

    useEffect(()=>{

                  getData();
              }

        ,[]
    )




    return (
            <>
                {loading && <h5>Loading..</h5>}
                {!loading &&
                 <Swiper
                     autoplay={{
                         delay: 2500,
                         disableOnInteraction: false,
                         waitForTransition:true,
                     }}
                     spaceBetween={60}
                     effect={"fade"}
                     navigation={true}
                     pagination={{
                         clickable: true,
                     }}
                     modules={[Autoplay,EffectFade, Navigation, Pagination]}
                     className="mySwiper"
                     style={{
                         "--swiper-pagination-color": "white",
                         "--swiper-pagination-bullet-inactive-color": "gray",
                         "--swiper-pagination-bullet-inactive-opacity": "0.6",
                         "--swiper-pagination-bullet-size":"10px",
                         "--swiper-pagination-bullet-horizontal-gap": "10px",

                 }}

                 >
                     {data.results.map(game=>{
                         return (<SwiperSlide>
                             <Link className="text-dark text-decoration-none"
                                   to={"/detail/"+game.id} element={<DetailComponent/>}>
                             <div className="wd-drk">
                                 <img src={game.background_image} className="w-100 rounded"
                                      height={400}
                                 />
                                 <h5 className="carousel-caption">{game.name}</h5>
                             </div>
                         </Link>
                         </SwiperSlide>);
                     })}
                 </Swiper>




                }
            </>


    );
}

export default Slideshow;
