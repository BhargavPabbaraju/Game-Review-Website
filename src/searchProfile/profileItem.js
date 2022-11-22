import React from "react";
import {Link} from "react-router-dom";

const Profile = ({profile})=> {
  var badge="badge rounded-pill pt-1 pb-1 fw-bolder ";
  if(profile.role==="Streamer")badge=badge+" bg-warning ";
  else if(profile.role==="General")badge=badge+" bg-success ";
  else badge=badge+"bg-info";
  return (<>
        {/* <div className="col-md-6 d-flex align-items-center p-3 col-xs-12 mh-100">
        <div className="card w-100">
            <img className="card-img-top" alt="Card" src={profile.bannerPicture} height={100}/>
          <div className="card-body">
            <img alt="Profile"
                 src={profile.profilePicture} className="rounded-circle" width={75}/>
            <div className="row">
              <div className="col-10"><Link className="text-white text-decoration-none">{profile.firstName} {profile.lastName}</Link>
                <p className="card-title">Role : {profile.role}</p>
              </div>
              <div className="col-2">
                <button className="btn btn-primary rounded-pill float-end">Follow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      */}
        <div className="col-md-6 d-flex align-items-center p-3 col-xs-12 mh-100">
          <div className="card w-100">
           <div className="row">
             <div className="col-12  position-relative">
               <div className="col-12"><img className="card-img-top" alt="Card" src={profile.bannerPicture} height={100}/></div>
               <div>
                 <img  className="rounded-circle user-profile-pic position-absolute  " style={{width:"75px",height:"75px"}}
                      src={profile.profilePicture}
                 />
               </div>
               <div className="p-1">
                 <button className="btn btn-primary rounded-pill float-end">Follow</button>
               </div>
             </div>
             <div className="col-12  card-body p-3">
               <Link className="text-white text-decoration-none">{profile.firstName} {profile.lastName}</Link>
               <p className="card-title">{"Role : "}
               <span className={badge}>
                        {profile.role}
                    </span>
               </p>
             </div>
           </div>
          </div>
        </div>


  </>


  );
}

export default Profile;