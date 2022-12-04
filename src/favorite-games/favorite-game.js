import React from "react";
import DetailComponent from "../detail";
import {Link} from "react-router-dom";

const FavoriteGame = ({game})=> {
    return(
        <li className="list-group-item">
            <Link className="text-dark text-decoration-none"
                  to={"/detail/"+game.gameid} element={<DetailComponent/>}>


            <div className="row">
                <div className="col-2 me-2">
                    <img src={game.gameImage} width={48} height={48} className="rounded-circle" alt="Thumbnail"/>
                </div>
                <div className="col">
                    <h6 className="pt-2">{game.gamename}</h6>
                </div>
            </div>
            </Link>
        </li>
    );
}

export default FavoriteGame;