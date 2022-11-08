import React from "react";
import HomeComponent from "../home";
import NavigationSidebar from "../navigation-sidebar";
import {Route, Routes} from "react-router-dom";
import FavoriteGames from "../favorite-games";
import SearchComponent from "../search";

function MainComponent() {
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
                    </Routes>

                </div>
                <div className="d-none d-sm-none d-md-none d-lg-block col-lg-4 col-xl-4">
                    <h4>Favorite Games</h4>
                    <FavoriteGames/>
                </div>

            </div>

    );
}
export default MainComponent;