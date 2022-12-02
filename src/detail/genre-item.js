import React from "react";

const GenreItem =({genre})=>{
    return (
        <div className="col-auto">
            <p className="badge bg-primary fs-6" >{genre}</p>

        </div>
    );
}

export default  GenreItem;