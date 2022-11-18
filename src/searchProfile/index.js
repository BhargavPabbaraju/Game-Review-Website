import React, {useState} from "react";
import ProfileItem from "./profileItem";
import "./index.css";

import userList from "./usersList.json"
import SearchResult from "../search/search-result";

const SearchPeople = ()=>{
  const [profiles, setprofiles]=useState(userList);
  const p1 = {
    firstName:"Roronoa",
    lastName:"Zoro",
    bannerPicture:"https://pbs.twimg.com/profile_banners/1356621333250138118/1666110824/1500x500",
    profilePicture:"https://pbs.twimg.com/profile_images/1589592333208924161/v0rPPnAA_400x400.jpg",
    location:"I'm lost",
    dateOfBirth:"2001-11-11",
    dateJoined:"1999-10-11",
    followingCount:123,
    followersCount:234,
    email:"roronoa-zoro@onepiece.com",
    phone:"+91 1234567890",
    role:"Streamer"
  }
  return(
      <div>
        <h4 className="mb-0">Search</h4>
        <div className="row">
          <div className="col-12">
            <i className="bi bi-search wd-search-icon text-light ps-2"></i>
            <input className="form-control rounded-pill bg-dark ps-4"/>
            <div className="row">
              {profiles.map(p1=><ProfileItem  profile={p1}/>)}
            </div>
          </div>
        </div>
      </div>
  );
}

export default SearchPeople;