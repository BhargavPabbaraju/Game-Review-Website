import React from "react";
import Slideshow from "./slideshow";
import GameCards from "./game-cards";


const HomeComponent = () => {
    const loggedIn = true;
    return (
        <div>
            <h4>Latest Releases</h4>
            <Slideshow/>
            {loggedIn && <h5>Top Rated Games</h5>}
            <GameCards/>
        </div>
    );
}

export default  HomeComponent;