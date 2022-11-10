import React from "react";

const ProfileDetails = () => {
    const profile = {
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


    }
    const thisUser = true;
    return(
        <div>
            {thisUser &&
            <div className="mb-2">
                <div className="row">
                    <div className="col-6">
                        <i className="bi bi-envelope"></i>
                        <span className="ms-1 d-md-inline d-none">{profile.email}</span>
                    </div>
                    <div className="col-6">
                        <i className="bi bi-telephone"></i>
                        <span className="ms-1">{profile.phone}</span>
                    </div>
                </div>
            </div>}
            <div className="row">
                <div className="col-3">
                    <i className="bi bi-geo-alt"></i>
                    <span className="ms-1">{profile.location}</span>
                </div>
                <div className="col-5">
                    <i className="bi bi-balloon"></i>
                    <span className="ms-1">Born {
                        new Date(profile.dateOfBirth).toLocaleDateString(
                            'en-us',{day:"numeric",year:"numeric",month:"long"}
                        )
                    }</span>
                </div>
                <div className="col-4">
                    <i className="bi bi-calendar3"></i>
                    <span className="ms-1">Joined {

                        new Date(profile.dateJoined).toLocaleDateString(
                            'en-us',{year:"numeric",month:"long"}
                        )
                    }</span>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-3">
                    <span className="fw-bolder">{profile.followingCount}</span> Following
                </div>
                <div className="col-3">
                    <span className="fw-bolder">{profile.followersCount}</span> Followers
                </div>
            </div>
        </div>

    );
}

export default ProfileDetails;