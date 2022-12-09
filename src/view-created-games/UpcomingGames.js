import React, { useEffect, useState } from "react";
import { BACKEND_API } from "../services/user-service";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import GenreItem from "../detail/genre-item";

async function UpcomingGames() {
  //const [game, setGame] = useState({});
  // const path = useLocation().pathname;
  // const id = path.split("/")[2];
  //const userData = useSelector((state) => state.userData);

  // useEffect(() => {
  //   getgameDetails();
  // }, [userData]);

  //const getgameDetails = async () => {
  // const response = await axios.get(`${BACKEND_API}/games/getgame/${id}`, {
  //   headers: { "x-auth-token": userData.profile.token },
  // });
  // if (response.data.status == 200) {
  //   setGame(response.data.games);
  // } else {
  //   alert("Game Not Found");
  // }
  // };

  return (
    <>
      <div>Upcoming Games</div>
      {/* <div className="row mb-1">
        <div className="col">
          <h5 className=" fw-bolder text-primary">{game.name}</h5>
        </div>
      </div>
      <div className="row mb-3">
        {game.background_image ? (
          <img
            alt="game bg"
            src={game.background_image}
            className="w-100 rounded-5"
            height={350}
          />
        ) : (
          <img
            alt="game bg"
            src="https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"
            className="w-100 rounded-5"
            height={350}
          />
        )}
      </div>
      <div className="row">
        {game.genres.map((genre) => (
          <GenreItem key={genre.id} genre={genre.name} />
        ))}
      </div>
      <div className="row">{game.description}</div>
      <div className="row fw-bolder text-decoration-underline">
        <p>Can be bought in:</p>
      </div>
      <div className="row mb-3">
        {game.stores.map((store) => (
          <div className="col-auto text-primary">
            <a
              href={`https:\\${store.store.domain}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {store.store.name}
            </a>
          </div>
        ))}
        {!game.stores && <p>No stores found.</p>}
        {game.stores.length <= 0 && <p>No stores found.</p>}
      </div> */}
    </>
  );
}

export default UpcomingGames;
