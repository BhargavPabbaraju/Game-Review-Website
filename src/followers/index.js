import React, {useEffect, useState} from "react";

import FollowerItem from "./follower-item";
import {Link} from "react-router-dom";
import axios from "axios";
import {apiKey, BACKEND_API} from "../services/user-service";
import {useSelector} from "react-redux";


const FollowersComponent = ({following}) =>{

    const userData = useSelector((state) => state.userData);

    const [profiles, setProfiles] = useState([]);
    useEffect(() => {
        getProfiles();
    }, []);

    async function getProfiles() {
        if(following){
            const response = await axios.get(
                `${BACKEND_API}/getfollowing/${userData.profile._id}`
            );
            setProfiles(response.data.data.following_list);
        }else{
            const response = await axios.get(
                `${BACKEND_API}/getfollowers/${userData.profile._id}`
            );
            setProfiles(response.data.data.followers_list);
        }


    }

    return (
        <div>
            <div className="row">
                <div className="col-3">
                    <Link to="/profile"><i className="bi bi-arrow-left fs-5"></i></Link>
                </div>
                <div className="col">
                    {following && <h5>Following</h5>}
                    {!following && <h5>Followers</h5>}
                </div>
            </div>
            <div className="row">
                <ul className="list-group">
                    {profiles.map((profile)=>{
                        return  <FollowerItem key={profile.id} profile={profile}/>
                    })}
                </ul>
            </div>
        </div>

    );


}

export default FollowersComponent;