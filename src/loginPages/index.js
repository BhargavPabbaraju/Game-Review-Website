import React from "react";
import React, { useState } from "react";
import './login.css';
const Signin=()=> {
  const [currentPage, setCurrentPage] = useState('login');
  const togglepage = (page) => {
    setCurrentPage(page);
  }
  return (
      <div className="Signin">
        {
          currentPage === "login" ? <Login onFormSwitch={togglepage} /> : <Register onFormSwitch={togglepage} />
        }
      </div>
  );
}
export default Signin;