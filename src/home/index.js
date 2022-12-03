import React, {useEffect} from "react";
import Slideshow from "./slideshow";
import GameCards from "./game-cards";
import {useDispatch, useSelector} from "react-redux";
import {CheckIsLoggedIn} from "../services/user-thunks";


const HomeComponent = () => {
  // const dispatch=useDispatch();
  const userData=useSelector(state => state.userData);
  // useEffect(()=>{
  //  const token=localStorage.getItem("WebDevToken")
  //   if(token){
  //     dispatch(CheckIsLoggedIn())
  //   }
  // },[])

    return (
        <div>
            <h4>Latest Releases</h4>
            <Slideshow/>
            {!userData.profile.isLoggedIn && <h5>Top Rated Games</h5>}
            <GameCards/>
        </div>
    );
}

export default  HomeComponent;