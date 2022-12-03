import React from "react";
import HomeComponent from "../home";
import NavigationSidebar from "../navigation-sidebar";
import {Route, Routes} from "react-router-dom";
import FavoriteGames from "../favorite-games";
import SearchComponent from "../search";
import DetailComponent from "../detail";
import ProfileComponent from "../profile";
import profileReducer from "../profile/profile-reducer";
import searchQueryReducer from "../search/search-reducer";
import EditProfile from "../edit-profile";
import { configureStore }
  from '@reduxjs/toolkit';

import {Provider, useSelector} from "react-redux";
import SearchPeople from "../searchProfile";
import RegisterUser from "../registerPage";
import {useLocation} from "react-router";
import Login from "../registerPage/login";
import CreateGameComponent from "../create-games";
import ViewGameComponent from "../view-created-games";
const store = configureStore({
  reducer: {profile:profileReducer,
      searchQuery:searchQueryReducer

  },


});


function MainComponent() {
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const active = paths[1];
  const userData=useSelector(state => state.userData);
    return (

            <div className="row mt-2">
                <div className="col-2 col-md-2 col-lg-1 col-xl-2">
                    <NavigationSidebar active="explore"/>
                </div>
                <div className="col-10 col-md-10 col-lg-7 col-xl-6"
                     style={{"position": "relative"}}>

                  <Routes>
                        <Route path="home"    element={<HomeComponent/>}/>
                        <Route path="search"    element={<SearchComponent/>}/>
                        <Route path="detail/*"    element={<DetailComponent/>}/>
                        <Route path="profile/*"    element={<ProfileComponent/>}/>
                        <Route path="edit-profile" element={<EditProfile/>}/>
                          <Route path="register" element={<RegisterUser/>}/>
                    <Route path="login" element={<Login/>}/>
                        <Route path="searchPeople" element={<SearchPeople/>}/>
                        <Route path="addGame" element ={<CreateGameComponent/>}/>
                        <Route path="viewGame" element ={<ViewGameComponent/>}/>
                    </Routes>

                </div>
                {
                    active!="register" && active!="login" &&
                    <div className="d-none d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4">
                        <h4>Favorite Games</h4>
                        <FavoriteGames/>
                    </div>
                }


            </div>


    );
}
export default MainComponent;