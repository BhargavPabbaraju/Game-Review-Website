import React, {useState} from "react";
import {Link} from "react-router-dom";
import DetailComponent from "../detail";
import {updateGame, deleteGame} from "../create-games/game-reducer";
import {useDispatch} from "react-redux";

const Created_game = ({result})=> {
    console.log("Created game", result);


    let [title, setTitle] = useState('');
    let [image, setImage] = useState('');
    let [tag, setTag] = useState('');
    let [repr, setRepr] = useState('');
    let [url, setUrl] = useState('');
    const dispatch = useDispatch();

    const updateClickHandler = () => {
        const newGame = {
            name: title,
            genres: tag,
            desc: repr,
            stores: url,
        }
        console.log("Dispatching ViewGameComp", newGame)
        dispatch(updateGame(newGame));
    }

    const deleteClickHandler = (id) => {
        console.log(id);
        dispatch(deleteGame(id));
    }

    let bg_image = result.background_image;
    if(!bg_image){
        bg_image = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg";
    }
    return (
            <div className="col-md-6 d-flex align-items-center p-3 col-xs-12 mh-100">
                <div className="card w-100 mh-200">
                    <Link className="text-dark text-decoration-none"
                          to={"/detail/"+result.id} element={<DetailComponent/>}>
                    <img className="card-img-top" alt="Card" src={bg_image} height={200}/>
                    <div className="card-body">
                        <i className="bi bi-star-fill text-warning pe-1"></i>{result.rating}
                        <i className="bi bi-trash3-fill float-end m-2" onClick={deleteClickHandler(result.id)}></i>
                        <Link to="/addGame">
                            <i className="bi bi-pencil-fill float-end m-2" onClick={updateClickHandler}></i>
                        </Link>
                        <p className="card-title">{result.name}</p>
                    </div>
                    </Link>
                </div>

            </div>


    );
}

export default Created_game;