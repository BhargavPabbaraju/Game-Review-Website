
import React from "react";
import SearchResult from "../search/search-result";

const ViewGameComponent = ()=>{
  const results=[{
    _id:123,
    active:false,
    background_image:"https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
    name:"Grand Theft Auto V",
    rating:4.47,
  },
    {
      _id:234,
      active:true,
      background_image:"https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
      name:"The Witcher 3: Wild Hunt",
      rating:4.06,
    },
    {
      _id:345,
      active:false,
      background_image:"https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
      name:"Portal 2",
      rating:4.61,
    }, ]
  return(
      <div>
        <h4 className="mb-0">View Your Games</h4>
        <div className="row">
          <div className="col-12">
            <div className="row">
              {results.map(result=><SearchResult key={result._id} result={result}/>)}
            </div>
          </div>
        </div>
      </div>
  );
}

export default ViewGameComponent;