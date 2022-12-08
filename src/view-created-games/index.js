import React from "react";
import Created_game from "./created_game";
import { useSelector } from "react-redux";

const ViewGameComponent = () => {
  const results = useSelector((state) => state.userData);
  return (
    <div>
      <h4 className="mb-0">View Your Games</h4>
      <div className="row">
        <div className="col-12">
          <div className="row">
            {results.profile.isLoggedIn &&
              results.profile.createdGames.map((obj) => (
                <Created_game key={results._id} result={obj} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGameComponent;
