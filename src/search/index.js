import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import axios from "axios";

import SearchResult from "./search-result";

import { useDispatch, useSelector } from "react-redux";
import { updateURL } from "../search/search-reducer";
import { apiKey } from "../services/user-service";
import { BACKEND_API } from "../services/user-service";

const SearchComponent = () => {
  const ref = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchState = useSelector((state) => state.searchQuery);
  const userData = useSelector((state) => state.userData);

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

  const searchHandler = async (e) => {
    if (e.key === "Enter" && !ref.current.checked) {
      const arr = searchState.url.split("&");
      const newUrl = arr[0] + "&search_precise=true&search=" + query;
      prevNextClick(newUrl);
    }
    if (e.key === "Enter" && ref.current.checked) {
      const response = await axios.get(
        `${BACKEND_API}/games/searchcreatedgames/${query}`,
        { headers: { "x-auth-token": localStorage.getItem("WebDevToken") } }
      );
      if (response.data.status == 200) {
        response.data.gamesData.next = false;
        const res = {
          results: response.data.gamesData,
          next: false,
        };
        setData(res);
      } else {
        alert("Search to Our API Failed");
      }
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

      {(userData.profile.role == "streamer" ||
        userData.profile.role == "creator") && (
        <div className="row form-check">
          <div className="col-2">
            <input
              ref={ref}
              className="form-check-input mt-3 pt-4"
              type="checkbox"
              value=""
              id="flexCheckChecked"
            />
          </div>
          <div className="col-10">
            <label class="form-check-label" for="flexCheckChecked">
              Search Upcoming Games
            </label>
          </div>
        </div>
      )}
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
