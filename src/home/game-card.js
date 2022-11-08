import React from "react";


export const GameCard = ({card={
    _id:345,
    image:"https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
    title:"Portal 2"
}})=> {
    return (
            <div className="col-4 d-flex align-items-stretch p-3">
                <div className="card">
                    <img className="card-img-top" alt="Card" src={card.image} height={100} width={100}/>
                    <div className="card-body">
                        <i className="bi bi-star-fill text-warning pe-1"></i>{card.rating}
                        <p className="card-title">{card.title}</p>
                    </div>
                </div>
            </div>
    );
}

export default GameCard;