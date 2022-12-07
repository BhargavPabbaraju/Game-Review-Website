import React from "react";

import {Link} from "react-router-dom";
import ProfileComponent from "../profile";

const FollowerItem = ({profile})=> {
    return(
        <li className="list-group-item">
            <Link className="text-dark text-decoration-none"
                  to={"/profile/"+profile._id} element={<ProfileComponent/>}>


                <div className="row">
                    <div className="col-2 me-2">
                        <img src={profile.profile_pic} width={48} height={48} className="rounded-circle" alt="Thumbnail"/>
                    </div>
                    <div className="col">
                        <h6 className="pt-2">{profile.firstname} {profile.lastname}</h6>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default FollowerItem;