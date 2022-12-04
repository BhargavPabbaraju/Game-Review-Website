import React from "react";

export const GameCard = ({ card }) => {
  return (
    <div className="col-4 d-flex align-items-stretch p-3">
      <div className="card">
        <img
          className="card-img-top"
          alt="Card"
          src={card.background_image}
          height={100}
          width={100}
        />
        <div className="card-body">
          <i className="bi bi-star-fill text-warning pe-1"></i>
          {card.rating}
          <p className="card-title">{card.name}</p>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
