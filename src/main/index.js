import React, { useEffect } from "react";
import HomeComponent from "../home";
import NavigationSidebar from "../navigation-sidebar";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import FavoriteGames from "../favorite-games";
import SearchComponent from "../search";
import DetailComponent from "../detail";
import ProfileComponent from "../profile";
import ProfileComponentOther from "../profile/ProfileComponentOther";
import profileReducer from "../profile/profile-reducer";
import searchQueryReducer from "../search/search-reducer";
import EditProfile from "../edit-profile";
import { configureStore } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import SearchPeople from "../searchProfile";
import RegisterUser from "../registerPage";
import { useLocation } from "react-router";
import Login from "../registerPage/login";
import CreateGameComponent from "../create-games";
import ViewGameComponent from "../view-created-games";
import { CheckIsLoggedIn } from "../services/user-thunks";
import Logout from "../registerPage/logout";
const store = configureStore({
  reducer: { profile: profileReducer, searchQuery: searchQueryReducer },
});

function MainComponent() {
  const { pathname } = useLocation();
  const paths = pathname.split("/");
  const active = paths[1];
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("WebDevToken");
    console.log("bhargav", userData);
    if (token) {
      dispatch(CheckIsLoggedIn());
    }
  }, []);
  return (
    <div className="row mt-2">
      <div className="col-2 col-md-2 col-lg-1 col-xl-2">
        <NavigationSidebar active="explore" />
      </div>
      <div
        className="col-10 col-md-10 col-lg-7 col-xl-6"
        style={{ position: "relative" }}
      >
        <Routes>
          <Route index path="home" element={<HomeComponent />} />
          <Route path="search" element={<SearchComponent />} />
          <Route path="detail/*" element={<DetailComponent />} />
          <Route
            path="profile"
            element={
              userData.profile.isLoggedIn ? (
                <ProfileComponent />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="profile/*" element={<ProfileComponentOther />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="register" element={<RegisterUser />} />

          <Route
            path="login"
            element={
              userData.profile.isLoggedIn ? <Navigate to="/home" /> : <Login />
            }
          />
          <Route path="searchPeople" element={<SearchPeople />} />
          <Route path="addGame" element={<CreateGameComponent />} />
          <Route path="viewGame" element={<ViewGameComponent />} />
          <Route path="logout" element={<Logout />} />
        </Routes>
      </div>
      {active != "register" && active != "login" && (
        <div className="d-none d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4">
          <h4>Favorite Games</h4>
          {userData.profile.isLoggedIn && <FavoriteGames />}
          {!userData.profile.isLoggedIn && (
            <ul className="list-group">
              <li className="list-group-item">
                Login to view your favorite games.
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
export default MainComponent;
