import React, {useEffect, useState} from "react";
import axios from "axios";
import {apiKey} from "../services/user-service";
import GameCard from "./game-card";
import {useSelector} from "react-redux";
import {BACKEND_API} from "../services/user-service";

function UserActivities() {
  const [cards, setCards] = useState([]);
  const userData = useSelector((state) => state.userData);
  useEffect(() => {
    getRecentActivity();
  }, []);

  async function getRecentActivity() {
    const response = await axios.get(
        `${BACKEND_API}/home/activities`,{headers: { "x-auth-token": userData.profile.token }}
    );
    setCards(response.data.data);
  }

  return (
      <div>
        <div className="row p-3">
          <h5>Recently Liked & Reviewed Games</h5>
          {cards.map((card) => {
            return <GameCard key={card.id} card={{
              background_image:card.gameImage,
                id:card.gameid,
                name:card.gamename,}

            } />;
          })}
        </div>
      </div>
  );
}

export default UserActivities;
