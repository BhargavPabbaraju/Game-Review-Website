import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainComponent from "./main";
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profile/profile-reducer";
import searchReducer from "./search/search-reducer";
import { Provider } from "react-redux";
import gameReducer from "./create-games/game-reducer";
const store = configureStore({
  reducer: {
    userData: profileReducer,
    searchQuery: searchReducer,
    game: gameReducer,
  },
  response: "",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="container">
          <Routes>
            <Route path="/*" element={<MainComponent />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}
export default App;
