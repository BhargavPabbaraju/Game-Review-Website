
import React from "react";
import "./index.css";

import SearchResult from "./search-result";

const SearchComponent = ()=>{
    const results=[{
            _id:123,
            active:false,
            image:"https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
            title:"Grand Theft Auto V",
            rating:4.47,
        },
        {
            _id:234,
            active:true,
            image:"https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
            title:"The Witcher 3: Wild Hunt",
            rating:4.06,
        },
        {
            _id:345,
            active:false,
            image:"https://media.rawg.io/media/games/328/3283617cb7d75d67257fc58339188742.jpg",
            title:"Portal 2",
            rating:4.61,
        }, ]
    return(
        <div>
            <h4 className="mb-0">Search</h4>
            <div className="row">
                <div className="col-12">
                    <i className="bi bi-search wd-search-icon text-light ps-2"></i>
                    <input className="form-control rounded-pill bg-dark ps-4"/>
                    <div className="row">
                        {results.map(result=><SearchResult key={result._id} result={result}/>)}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SearchComponent;