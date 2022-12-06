import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import gameReducer, {createGame, deleteGame, updateGame} from "./game-reducer";

const CreateGameComponent = () => {
  let [title, setTitle] = useState('');
  let [image, setImage] = useState('');
  let [tag, setTag] = useState('');
  let [repr, setRepr] = useState('');
  let [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const saveClickHandler = () => {
    const newGame = {
      name: title,
      genres: tag,
      desc: repr,
      stores: url,
    }
    console.log("Dispatching ViewGameComp", newGame)
    dispatch(createGame(newGame));
  }

  return (
      <form id="usrform">
        <div className="border border-secondary rounded-4 ">
        <h4 className="mb-0 p-3">Add game</h4>
        <div className="row p-2 mb-1">
          <div className="col-3 col-md-3 pt-4">
            <label>Title:</label>
          </div>
          <div className="col-3 col-md-2 pt-4">
            <input type="text"
                   id="name" name="name" placeholder="Title goes here"
                   onChange={(event) => setTitle(event.target.value)}
                   value={title}></input>
          </div>
        </div>
        <div className="row p-2 mb-1">
          <div className="col-3 col-md-3 pt-1">
            <label>Upload image:</label>
          </div>
          <div className="col-9 col-md-9 pt-4">
            <input type="file" id="myFile" name="filename"
                   onChange={(event) => setImage(event.target.value)}
            value={image}></input>
          </div>
        </div>
        <div className="row p-2 mb-1">
          <div className="col-3 col-md-3 pt-1">
            <label>Tags:</label>
          </div>
          <div className="col-9 col-md-9 pt-4">
            <textarea rows="5" cols="30" name="genres" form="usrform"
                      placeholder="Tags can be separated with ',' (Example: RPG,Adventure,Playstation,..)"
                      onChange={(event) => setTag(event.target.value)}
                      value={tag}></textarea>
          </div>
        </div>
        <div className="row p-2 mb-1">
          <div className="col-3 col-md-3 pt-1">
            <label>Description:</label>
          </div>
          <div className="col-9 col-md-9 pt-4">
            <textarea rows="5" cols="30" name="description" form="usrform"
                      placeholder="Description goes here"
                      onChange={(event) => setRepr(event.target.value)}
                      value={repr}></textarea>
          </div>
        </div>
        <div className="row p-2 mb-1">
          <div className="col-3 col-md-3 pt-4">
            <label>Where to Buy:</label>
          </div>
          <div className="col-9 col-md-9 pt-4">
            <textarea rows="5" cols="30" name="tags" form="usrform"
                      placeholder="URLs can be separated with ',' (Example: amazon.com,nintendo.com,..)"
                      onChange={(event) => setUrl(event.target.value)}
                      value={url} ></textarea>
          </div>
        </div>
          <Link to="/viewGame">
            <div className="row p-2 mb-1">
              <div align='center' className="col-12 col-md-12 pt-4">
                <button onClick={saveClickHandler}>Save</button>
              </div>
            </div>
          </Link>
        </div>
      </form>
  );
  }
export default CreateGameComponent;