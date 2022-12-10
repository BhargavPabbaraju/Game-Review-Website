import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DetailComponent from "../detail";
import { updateGame, deleteGame } from "../create-games/game-reducer";
import { useDispatch } from "react-redux";
import { deleteGameThunk } from "../services/create-game";
import UpcomingGames from "./UpcomingGames";

const Created_game = ({ result }) => {
  const navigate = useNavigate();

  let [title, setTitle] = useState("");
  let [image, setImage] = useState("");
  let [tag, setTag] = useState("");
  let [repr, setRepr] = useState("");
  let [url, setUrl] = useState("");
  const dispatch = useDispatch();

  const updateClickHandler = () => {
    navigate(`/addgame?id=${result._id}`);
  };

  const deleteClickHandler = () => {
    dispatch(deleteGameThunk(result._id));
  };

  let bg_image = result.background_image;
  // if (!bg_image) {
  //   bg_image =
  //     "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
  // }
  return (
    <div className="col-md-6 d-flex align-items-center p-3 col-xs-12 mh-100">
      <div className="card w-100 mh-200">
        <img className="card-img-top" alt="Card" src={bg_image+ "?v=" + Date.now()} height={200} />
        <div className="card-body">
          <i
            className="bi bi-trash3-fill float-end m-2"
            onClick={deleteClickHandler}
          ></i>
          <i
            className="bi bi-pencil-fill float-end m-2"
            onClick={updateClickHandler}
          ></i>

          <Link
            className="text-dark text-decoration-none"
            to={"/upcoming/" + result._id}
          >
            <p className="card-title">{result.name}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Created_game;
