import React from "react";
import "./index.css";
import ProfileDetails from "./profile-details";
import {Link} from "react-router-dom";
import ProfileReview from "../profile-review";



const ProfileComponent = () => {
    const profile = {
        firstName:"Roronoa",
        lastName:"Zoro",
        bannerPicture:"https://pbs.twimg.com/profile_banners/1356621333250138118/1666110824/1500x500",
        profilePicture:"https://pbs.twimg.com/profile_images/1589592333208924161/v0rPPnAA_400x400.jpg",
        location:"Wano Kuni",
        dateOfBirth:"2001-11-11",
        bio:"On my path to become the strongest swordswman alive!"

    }
    return(
        <div className="border border-secondary rounded-4 ">
            <div className="row">
                <div className="col-auto ps-5">
                    <div className="row fw-bolder">
                        {profile.firstName} {profile.lastName}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <img alt="Banner"
                         src={profile.bannerPicture} className="w-100" height={240}/>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-3 ms-4 me-0">
                    <img alt="Profile"
                         src={profile.profilePicture} className="rounded-circle wd-profile-picture" width={120}/>
                </div>
                <div className="col-1">
                    <span className="badge rounded-pill bg-primary fs-6">Streamer</span>
                </div>
                <div className="col">
                    <Link to="/tuiter/edit-profile">
                        <button className="btn btn-light rounded-pill float-end me-3">Edit profile</button>
                    </Link>
                </div>
            </div>
            <div className="wd-pull-up ms-4">
                <div className="row">
                    <h5 className="fw-bolder">{profile.firstName} {profile.lastName}</h5>
                </div>
                <div className="row wd-handle">
                    <span className="text-secondary mt-0"> {profile.handle}</span>
                </div>
                <div className="row">
                    <p>{profile.bio}</p>
                </div>
                <ProfileDetails/>
                <div className="row mt-3">
                    <h5>Reviews</h5>
                    <div className="row mb-2 rounded-4">
                        <ProfileReview/>
                    </div>

                </div>
            </div>

        </div>
    );
};
export default ProfileComponent;