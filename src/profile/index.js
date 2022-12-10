import React, { useState } from "react";
import "./index.css";
import ProfileDetails from "./profile-details";
import { Link } from "react-router-dom";
import ProfileReview from "../profile-review";
import { useSelector } from "react-redux";
import { BACKEND_API } from "../services/user-service";
import axios from "axios";

const ProfileComponent = () => {
  const profile = useSelector((state) => state.userData.profile);
  const [file, setfile] = useState("");
  const [ff, setff] = useState("");

  const handlegetimg = (e) => {
    const file = e.target.files[0];
    setfile(file);
  };

  const upload = async (e) => {
    e.preventDefault();
    // get secure url from our server
    const response = await axios.get(`${BACKEND_API}/image/s3Url/eee.jpg`);
    const { url } = response.data;
    // post the image direclty to the s3 bucket
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    const imageUrl = url.split("?")[0];
    setff(imageUrl);
  };
  return (
    <div className="border border-secondary rounded-4 ">
      <div className="row">
        <div className="col-auto ps-5">
          <div className="row fw-bolder">
            {profile.firstname} {profile.lastname}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <img
            alt="Banner"
            src={profile.cover_pic + "?v=" + Date.now()}
            className="w-100"
            height={240}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-3 ms-4 me-0">
          <img
            alt="Profile"
            src={profile.profile_pic + "?v=" + Date.now()}
            className="rounded-circle wd-profile-picture"
            height={120}
            width={120}
          />
        </div>
        <div className="col-1">
          <span className="badge rounded-pill bg-primary fs-6">
            {profile.role}
          </span>
        </div>
        <div className="col">
          <Link to="/edit-profile">
            <button className="btn btn-light rounded-pill float-end me-3">
              Edit profile
            </button>
          </Link>
        </div>
      </div>
      <div className="wd-pull-up ms-4">
        <div className="row">
          <h5 className="fw-bolder">
            {profile.firstname} {profile.lastname}
          </h5>
        </div>
        <div className="row wd-handle">
          <span className="text-secondary mt-0"> {profile.handle}</span>
        </div>
        <div className="row">
          <p>{profile.bio}</p>
        </div>
        <ProfileDetails />
        <div className="row mt-3">
          <h5>Activities</h5>
          <div className="row mb-2 rounded-4">
            <ProfileReview />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileComponent;
