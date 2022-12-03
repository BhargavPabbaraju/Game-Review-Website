import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";

import SearchResult from "./search-result";

import { useDispatch, useSelector } from "react-redux";
import { updateURL } from "../search/search-reducer";
import { apiKey } from "../services/user-service";

const SearchComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchState = useSelector((state) => state.searchQuery);

  const [query, setQuery] = useState(searchState.query);

  const getData = async (url = searchState.url) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const searchHandler = (e) => {
    if (e.key === "Enter") {
      const arr = searchState.url.split("&");
      const newUrl = arr[0] + "&search_precise=true&search=" + query;
      prevNextClick(newUrl);
    }
  };

  const dispatch = useDispatch();
  const changeQuery = (e) => {
    setQuery(e.target.value);
  };

  const prevNextClick = (newUrl) => {
    const newState = {
      url: newUrl,
      query: query,
    };
    dispatch(updateURL(newState));
    getData(newUrl);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h4 className="mb-3">Search</h4>
      <div className="row">
        <div className="col-12">
          <i className="bi bi-search wd-search-icon text-light ps-2"></i>
          <input
            className="form-control rounded-pill bg-dark ps-4"
            value={query}
            onChange={changeQuery}
            onKeyDown={searchHandler}
          />
        </div>
      </div>
      {loading && <h5>Loading...</h5>}
      <div className="row">
        {!loading &&
          data.results.map((result) => (
            <SearchResult key={result.id} result={result} />
          ))}
      </div>
      {!loading && (
        <div className="row">
          <div className="col">
            {data.previous && (
              <button
                className="btn btn-primary rounded float-start p-3 w-25"
                onClick={() => {
                  prevNextClick(data.previous);
                }}
              >
                Prev
              </button>
            )}
            {data.next && (
              <button
                className="btn btn-primary rounded float-end p-3 w-25"
                onClick={() => {
                  prevNextClick(data.next);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
