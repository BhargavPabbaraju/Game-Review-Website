import React from "react";

const SearchResult = ({result={
    _id:345,
    image:"https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
    title:"Portal 2"
}})=> {
    return (
            <div className="col-lg-6 d-flex align-items-center p-3 col-xs-12 mh-100">
                <div className="card w-100">
                    <img className="card-img-top" alt="Card" src={result.image} height={100} width={100}/>
                    <div className="card-body">
                        <i className="bi bi-star-fill text-warning pe-1"></i>{result.rating}
                        <p className="card-title">{result.title}</p>
                    </div>
                </div>
            </div>
    );
}

export default SearchResult;