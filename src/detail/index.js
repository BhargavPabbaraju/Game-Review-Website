import React, { useEffect, useState } from "react";
import GenreItem from "./genre-item";
import parse from "html-react-parser";
import Reviews from "../reviews";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { apiKey } from "../services/user-service";
import "./modal.css"
import Popup from "reactjs-popup";
import {Modal} from "./modal";
import {useSelector} from "react-redux";


const DetailComponent = () => {
  const userData = useSelector((state) => state.userData);
  const path = useLocation().pathname;
  const id = path.split("/")[2];
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${apiKey}`
        );
        setGame(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setGame(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  let [liked, setLiked] = useState(false);

  let bg_image =
    "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";



  return (
    <div>
      {loading && <h5>Loading...</h5>}
      {!loading && (
        <>
          <div className="row mb-1">
            <div className="col">
              <h5 className=" fw-bolder text-primary">{game.name}</h5>
            </div>
            <div className="col-3 col-md-2 pt-1">
              <i className="bi bi-star-fill text-warning pe-2"></i>
              {game.rating}
            </div>
          </div>
          <div className="row mb-3">
            {game.background_image ? (
              <img
                alt="game bg"
                src={game.background_image}
                className="w-100 rounded-5"
                height={350}
              />
            ) : (
              <img
                alt="game bg"
                src={bg_image}
                className="w-100 rounded-5"
                height={350}
              />
            )}
          </div>
          <div className="row">
            {game.genres.map((genre) => (
              <GenreItem key={genre.id} genre={genre.name} />
            ))}
            {game.tags.map((genre) => (
              <GenreItem key={genre.id} genre={genre.name} />
            ))}
          </div>
          <div className="row">{parse(game.description)}</div>
          <div className="row fw-bolder text-decoration-underline">
            <p>Can be bought in:</p>
          </div>
          <div className="row mb-3">
            {game.stores.map((store) => (
              <div className="col-auto text-primary">
                <a
                  href={`https:\\${store.store.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {store.store.name}
                </a>
              </div>
            ))}
            {!game.stores && <p>No stores found.</p>}
            {game.stores.length <= 0 && <p>No stores found.</p>}
          </div>
          <div className="row">
            <h5 className="col">Reviews</h5>
            <div className="col-2 fs-5">
              {!liked && (
                <i
                  className="bi bi-heart me-1 pt-2"
                  onClick={(e) => {
                    setLiked(!liked);
                  }}
                ></i>
              )}
              {liked && (
                <i
                  className="bi bi-heart-fill me-1 text-danger pt-2"
                  onClick={(e) => {
                    setLiked(!liked);
                  }}
                ></i>
              )}
              {game.likes}
            </div>
            <div className="col-3">
              {/*<button className="btn btn-primary rounded rounded-pill">*/}
              {/*  Post a review*/}
              {/*</button>*/}

              { userData.profile.isLoggedIn&&  <button className="btn btn-primary rounded rounded-pill" onClick={openModal}>Post review</button>}
              {showModal ? <Modal setShowModal={setShowModal} game={game} type={"new"}/> : null}

            </div>
          </div>
          <div className="row mt-4">
            <Reviews game={game} />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailComponent;
