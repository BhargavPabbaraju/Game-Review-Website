import React, { useEffect, useState } from "react";
import GameCard from "./game-card";
import axios from "axios";
import { apiKey } from "../services/user-service";

export const GameCards = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    getlatestgames();
  }, []);

  async function getlatestgames() {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating&page_size=3`
    );
    setCards(response.data.results.slice(0, 3));
  }

  return (
    <div>
      <div className="row p-3">
        <h5>Top Rated Games</h5>
        <div className="row">
          <div>
            {cards.map((card) => {
              return <GameCard key={card.id} card={card} />;
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GameCards;
