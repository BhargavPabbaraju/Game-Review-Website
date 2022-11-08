import React from "react";

const FavoriteGame = ({game={
    _id:345,
    image:"https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
    title:"Portal 2"
}})=> {
    return(
        <li className="list-group-item">
            <div className="row">
                <div className="col-2 me-2">
                    <img src={game.image} width={48} height={48} className="rounded-circle" alt="Thumbnail"/>
                </div>
                <div className="col">
                    <h6 className="pt-2">{game.title}</h6>
                </div>
            </div>

        </li>
    );
}

export default FavoriteGame;