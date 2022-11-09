import React from "react";
import {useLocation} from "react-router";
import GenreItem from "./genre-item";
import parse from "html-react-parser";
import Reviews from "../reviews";

const DetailComponent = () => {
    const game={
        _id:345,
        image:"https://media.rawg.io/media/games/5ab/5abb8e4af55eb8c867410c3a740355b9.jpg",
        title:"Pokémon Scarlet and Violet",
        rating:3.36,
        genres:["RPG","Platformer","Adventure","Isometric","Horror",
                "Nintendo Switch",],
        desc:'<p>The Pokémon Scarlet and Pokémon Violet games, the newest chapters in the Pokémon series, are coming to Nintendo Switch later this year. With these new titles, the Pokémon series takes a new evolutionary step, allowing you to explore freely in a richly expressed open world.</p>',

        stores:[
           "nintendo.com","amazon.com"
        ]
    }
    const {pathname} = useLocation();
    const paths = pathname.split('/')
    const id = paths[2]; // Get Game by Id

    return (
        <div>
            <div className="row mb-1">
                <div className="col">
                    <h5 className=" fw-bolder text-primary">{game.title}</h5>
                </div>
                <div className="col-3 col-md-2 pt-1">
                    <i className="bi bi-star-fill text-warning pe-2"></i>{game.rating}
                </div>
            </div>
            <div className="row mb-3">
                <img alt="game bg" src={game.image} className="w-100 rounded-5" height={350}/>
            </div>
            <div className="row">
                {game.genres.map(genre=><GenreItem key={genre} genre={genre}/>)}
            </div>
            <div className="row">
                {parse(game.desc)}
            </div>
            <div className="row fw-bolder text-decoration-underline">
                <p>Can be bought in:</p>
            </div>
            <div className="row mb-3">
                {game.stores.map(link=><div className="col text-primary">{link}</div>)}
            </div>
            <div className="row">
                <h5>Reviews</h5>
                <Reviews/>
            </div>
        </div>
    );

}

export default DetailComponent;