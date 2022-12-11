import React from "react";
import DetailComponent from "../detail";
import {Link} from "react-router-dom";

export const GameCard = ({ card }) => {
  return (

        <div className=" align-items-stretch p-3 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-4">
          <Link className="text-dark text-decoration-none"
                to={"/detail/"+card.id} element={<DetailComponent/>}>
          <div className="card h-100 w-100">
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
          </Link>
        </div>


  );
};

export default GameCard;
