import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../profile/index.css";
import ProfileDetails from "../profile/profile-details";
import ProfileReview from "../profile-review";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../profile/profile-reducer";

const EditProfile=()=>{
  const userprofile=useSelector(state => state.profile)
  const [profile,setProfile]=useState(userprofile);
  const[date,setDate]=useState(userprofile.dateOfBirth)
  const dispatch = useDispatch();
  const updateProfileHandler= () => {
    dispatch(updateProfile(profile))
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
          <div className="col">
            <Link to="/profile">
              <button onClick={updateProfileHandler} className="btn btn-light rounded-pill float-end me-3">Save</button>
            </Link>
          </div>
        </div>
        <div className="p-2 row">
          <h5 className="fw-bolder">{userprofile.firstName} {userprofile.lastName}</h5>
        </div>
        <div className="pt-3">
          <form>
            <div className="form-group row p-2">
              <label htmlFor="firstname"
                     className="col-sm-2 col-form-label">FirstName</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                       onChange={(e)=>{setProfile(prevState=>({...prevState,firstName:e.target.value}))}}
                       id="firstname" value={profile.firstName}/>
              </div>
            </div>
            <div className="form-group row p-2">
              <label htmlFor="lastname"
                     className="col-sm-2 col-form-label">LastName</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                       onChange={(e)=>{setProfile(prevState=>({...prevState,lastName:e.target.value}))}}
                       id="lastname" value={profile.lastName}/>
              </div>
            </div>
            <div className="form-group row p-2">
              <label htmlFor="dateofbirth"
                     className="col-sm-2 col-form-label">D.O.B</label>
              <div className="col-sm-10">
                <input className="form-control" type="date"
                       onChange={(e)=>{setProfile(prevState=>({...prevState,dateOfBirth:e.target.value.toString()}))}}
                       id="dateofbirth" value={profile.dateOfBirth}/>
              </div>
            </div>
            <div className="form-group row p-2">
              <label htmlFor="location"
                     className="col-sm-2 col-form-label">Location</label>
              <div className="col-sm-10">
                <input type="text" className="form-control"
                       onChange={(e)=>{setProfile(prevState=>({...prevState,location:e.target.value}))}}
                       id="location" value={profile.location}/>
              </div>
            </div>
          </form>
        </div>


      </div>
  )
}
export default EditProfile;


