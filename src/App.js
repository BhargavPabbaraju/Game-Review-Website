import React  from 'react';
import {Routes, Route, BrowserRouter} from "react-router-dom";
import MainComponent from "./main";


function App() {
  return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/*" element={<MainComponent/>}/>
          </Routes>
        </div>
      </BrowserRouter>

  );
}
export default App;