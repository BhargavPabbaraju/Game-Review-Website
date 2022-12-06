
import React from "react";
import Created_game from "./created_game";
import {useSelector} from "react-redux";

const ViewGameComponent = ()=>{
  const results =
      useSelector(state => state.game)
  //     [{
  //   id: 3498,
  //   active:false,
  //   background_image:"https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
  //   name:"Grand Theft Auto V",
  //   rating:4.47,
  // },
  //   {
  //     id:3328,
  //     active:true,
  //     background_image:"https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
  //     name:"The Witcher 3: Wild Hunt",
  //     rating:4.06,
  //   },
  //   {
  //     id:4200,
  //     active:false,
  //     background_image:"https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
  //     name:"Portal 2",
  //     rating:4.61,
  //   }, ]
  console.log("ViewGameComp",results)
  return(
      <div>
        <h4 className="mb-0">View Your Games</h4>
        <div className="row">
          <div className="col-12">
            <div className="row">
              {results.map(obj=><Created_game key={results._id} result={obj}/>)}
            </div>
          </div>
        </div>
      </div>
  );
}

export default ViewGameComponent;