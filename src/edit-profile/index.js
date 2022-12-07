import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../profile/index.css";
import ProfileDetails from "../profile/profile-details";
import ProfileReview from "../profile-review";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../profile/profile-reducer";
import { updateUserThunk } from "../services/user-thunks";

const EditProfile = () => {
  const userprofile = useSelector((state) => state.userData.profile);
  const [profile, setProfile] = useState(userprofile);
  const dispatch = useDispatch();
  const updateProfileHandler = () => {
    dispatch(updateUserThunk(profile));
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
            src={profile.cover_pic}
            className="w-100"
            height={240}
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-3 ms-4 me-0">
          <img
            alt="Profile"
            src={profile.profile_pic}
            className="rounded-circle wd-profile-picture"
            width={120}
          />
        </div>
        <div className="col">
          <Link to="/profile">
            <button
              onClick={updateProfileHandler}
              className="btn btn-light rounded-pill float-end me-3"
            >
              Save
            </button>
          </Link>
        </div>
      </div>
      <div className="p-2 row">
        <h5 className="fw-bolder">
          {userprofile.firstname} {userprofile.lastname}
        </h5>
      </div>
      <div className="pt-3">
        <form>
          <div className="form-group row p-2">
            <label htmlFor="firstname" className="col-sm-2 col-form-label">
              FirstName
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setProfile((prevState) => ({
                    ...prevState,
                    firstname: e.target.value,
                  }));
                }}
                id="firstname"
                value={profile.firstname}
              />
            </div>
          </div>
          <div className="form-group row p-2">
            <label htmlFor="lastname" className="col-sm-2 col-form-label">
              LastName
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setProfile((prevState) => ({
                    ...prevState,
                    lastname: e.target.value,
                  }));
                }}
                id="lastname"
                value={profile.lastname}
              />
            </div>
          </div>
          <div className="form-group row p-2">
            <label htmlFor="dateofbirth" className="col-sm-2 col-form-label">
              D.O.B
            </label>
            <div className="col-sm-10">
              <input
                className="form-control"
                type="date"
                onChange={(e) => {
                  setProfile((prevState) => ({
                    ...prevState,
                    dob: e.target.value.toString(),
                  }));
                }}
                id="dateofbirth"
                value={profile.dob}
              />
            </div>
          </div>
          <div className="form-group row p-2">
            <label htmlFor="location" className="col-sm-2 col-form-label">
              Location
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setProfile((prevState) => ({
                    ...prevState,
                    location: e.target.value,
                  }));
                }}
                id="location"
                value={profile.location}
              />
            </div>
          </div>
          <div className="form-group row p-2">
            <label htmlFor="phone" className="col-sm-2 col-form-label">
              Phone
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setProfile((prevState) => ({
                    ...prevState,
                    phone: e.target.value,
                  }));
                }}
                id="phone"
                value={profile.phone}
              />
            </div>
          </div>
          <div className="form-group row p-2">
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                onChange={(e) => {
                  setProfile((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }));
                }}
                id="email"
                value={profile.email}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditProfile;
