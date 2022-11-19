import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../profile/index.css";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../profile/profile-reducer";

const RegisterUser=()=>{
  const user={
    "_id": "",
    "firstName": "",
    "lastName": "",
    "username": "",
    "email": "",
    "password": "",
    "confirm_password":"",
    "phone": "9887234723",
    "profile_pic":"",
    "banner_pic":"",
    "location":"",
    "dateOfBirth":""
  }
  const [profile,setProfile]=useState(user);
  // const dispatch = useDispatch();
  // const updateProfileHandler= () => {
  //   dispatch(updateProfile(profile))
  // }
      return(
      <div className="container">
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
              <input type="text" className="form-control"
                     onChange={(e)=>{setProfile(prevState=>({...prevState,dateOfBirth:e.target.value}))}}
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
  )
}
export default RegisterUser;


