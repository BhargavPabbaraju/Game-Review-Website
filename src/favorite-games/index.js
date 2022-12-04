import React from "react";
import FavoriteGame from "./favorite-game";
import {useSelector} from "react-redux";

const FavoriteGames = () => {
    const userData = useSelector((state) => state.userData);
    return (
        <div>
            <ul className="list-group">
                {userData.profile.favorites.map((game)=>{
                    return  <FavoriteGame key={game.id} game={game}/>
                })}
            </ul>
        </div>
    );
}

export default  FavoriteGames;