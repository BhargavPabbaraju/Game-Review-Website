import React from "react";
import "./index.css";
import ProfileDetails from "./profile-details";
import {Link} from "react-router-dom";
import ProfileReview from "../profile-review";
import {useSelector} from "react-redux";



const ProfileComponent = () => {
    const profile = useSelector(
        (state) => state.profile);
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
                    <span className="badge rounded-pill bg-primary fs-6">{profile.role}</span>
                </div>
                <div className="col">
                    <Link to="/edit-profile">
                        <button className="btn btn-light rounded-pill float-end me-3">Edit profile</button>
                    </Link>
                    <Link to="/register">
                        <button className="btn btn-light rounded-pill float-end me-3">Register</button>
                    </Link>
                    <Link to="/login">
                        <button className="btn btn-light rounded-pill float-end me-3">Login</button>
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