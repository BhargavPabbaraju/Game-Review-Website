import React from "react";
import {Link} from "react-router-dom";
import DetailComponent from "../detail";

const SearchResult = ({result})=> {
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
                        <p className="card-title">{result.name}</p>
                    </div>
                    </Link>
                </div>

            </div>


    );
}

export default SearchResult;