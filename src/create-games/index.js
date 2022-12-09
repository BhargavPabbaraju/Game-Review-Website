import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import gameReducer, {
  createGame,
  deleteGame,
  updateGame,
} from "./game-reducer";
import { createGameThunk, updateGameThunk } from "../services/create-game";
import axios from "axios";
import { BACKEND_API } from "../services/user-service";
import {updateUserThunk} from "../services/user-thunks";

const CreateGameComponent = () => {
  const userData = useSelector((state) => state.userData);
  let [title, setTitle] = useState("");
  let [image, setImage] = useState("");
  let [tag, setTag] = useState("");
  let [repr, setRepr] = useState("");
  let [url, setUrl] = useState("");
  const [gameHandle, setGameHandle] = useState("");
  const [validGamehandle, setValidGameHandle] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  async function checkGameHandleExist() {
    if (gameHandle.toString().length == 0) return;
    const token = localStorage.getItem("WebDevToken");
    const response = await axios.get(
      `${BACKEND_API}/games/checkhandle/` + gameHandle.toLowerCase(),
      {
        headers: { "x-auth-token": token },
      }
    );
    if (response.data.status == 200 && response.data.available) {
      setValidGameHandle(true);
    } else {
      alert("Sorry,you already created a game with this handle");
      setValidGameHandle(false);
    }
  }

  const dispatch = useDispatch();
  useEffect(() => {
    if (searchParams.get("id")) {
      const data = userData.profile.createdGames.find(
        (user) => user._id == searchParams.get("id")
      );
      setTitle(data.name);
      setTag(data.genres.join(","));
      setUrl(data.stores.join(","));
      setRepr(data.description);
      setGameHandle(data.handle);
    }
  }, [userData]);

  const saveClickHandler = async () => {
    const tags = tag.split(",");
    const store = url.split(",");
    const response = await upload();
    if (response) {
      const newGame = {
        name: title,
        genres: tags,
        description: repr,
        stores: store,
        handle: gameHandle,
      };
      if (searchParams.get("id")) {
        newGame.cgameid = searchParams.get("id");
        console.log("updategame",{...newGame,...response})
        dispatch(updateGameThunk({...newGame,...response}));
      } else {
        console.log("creategame",{...newGame,...response})
        dispatch(createGameThunk({...newGame,...response}));
      }
    }

  };



  const upload = async () => {
    const obj = {};
    if (!image == "") {
      const imgName = userData.profile.username + gameHandle+ "gamepic.jpg";
      const response = await axios.get(`${BACKEND_API}/image/s3Url/${imgName}`);
      const { url } = response.data;
      const response1 = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: image,
      });
      if (response1) {
        const imageUrl = url.split("?")[0];
        obj.background_image = imageUrl;
        setImage(imageUrl);
      }
    }
    return obj;
  };

  const updateGamePic=(e)=>{
    const file = e.target.files[0];
    setImage(file);
  }

  return (
    <form id="usrform">
      <div className="border border-secondary rounded-4 ">
        {searchParams.get("id") ? (
          <h4 className="mb-0 p-3">Edit Game</h4>
        ) : (
          <h4 className="mb-0 p-3">Add Game</h4>
        )}
        <div className="row p-2 mb-1">
          <div className="col-3 col-md-3 pt-4">
            <label>Title:</label>
          </div>
          <div className="col-3 col-md-2 pt-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Title goes here"
              onChange={(event) => setTitle(event.target.value)}
              value={title}
            ></input>
          </div>
        </div>
        <div className="row p-2 mb-1">
          <div className="col-3 col-md-3 pt-4">
            <label>Game Handle:</label>
          </div>
          <div className="col-3 col-md-2 pt-4">
            <input
              type="text"
              id="gamehandle"
              name="gamehandle"
              placeholder="Game handle goes here"
              onChange={(event) => setGameHandle(event.target.value)}
              disabled={!!searchParams.get("id")}
              value={gameHandle}
              onBlur={checkGameHandleExist}
            ></input>
          </div>
        </div>
        <div className="row p-2 mb-1">
          <div className="col-3 col-md-3 pt-1">
            <label>Upload image:</label>
          </div>
          <div className="col-9 col-md-9 pt-4">
            <input
                className="form-control"
                type="file"
                id="myFile"
                onChange={updateGamePic}
            />
          </div>
        </div>
        <div className="row p-2 mb-1">
          <div className="col-3 col-md-3 pt-1">
            <label>Tags:</label>
          </div>
          <div className="col-9 col-md-9 pt-4">
            <textarea
              rows="5"
              cols="30"
              name="genres"
              form="usrform"
              placeholder="Tags can be separated with ',' (Example: RPG,Adventure,Playstation,..)"
              onChange={(event) => setTag(event.target.value)}
              value={tag}
            ></textarea>
          </div>
        </div>
        <div className="row p-2 mb-1">
          <div className="col-3 col-md-3 pt-1">
            <label>Description:</label>
          </div>
          <div className="col-9 col-md-9 pt-4">
            <textarea
              rows="5"
              cols="30"
              name="description"
              form="usrform"
              placeholder="Description goes here"
              onChange={(event) => setRepr(event.target.value)}
              value={repr}
            ></textarea>
          </div>
        </div>
        <div className="row p-2 mb-1">
          <div className="col-3 col-md-3 pt-4">
            <label>Where to Buy:</label>
          </div>
          <div className="col-9 col-md-9 pt-4">
            <textarea
              rows="5"
              cols="30"
              name="tags"
              form="usrform"
              placeholder="URLs can be separated with ',' (Example: amazon.com,nintendo.com,..)"
              onChange={(event) => setUrl(event.target.value)}
              value={url}
            ></textarea>
          </div>
        </div>
        <Link to="/viewGame">
          <div className="row p-2 mb-1">
            <div align="center" className="col-12 col-md-12 pt-4">
              {searchParams.get("id") ? (
                  <button onClick={saveClickHandler}>Save</button>
              ) : (
                  <button
                      disabled={
                        !title || !gameHandle || !tag || !validGamehandle || !repr
                            ? true
                            : false
                      }
                      onClick={saveClickHandler}
                  >
                    Save
                  </button>
              )}
            </div>
          </div>
        </Link>
      </div>
    </form>
  );
};
export default CreateGameComponent;
