import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logoutUser } from "../profile/profile-reducer";

function Logout() {
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem("WebDevToken");
    dispatch(logoutUser());
  }, []);

  return (
    <section>
      <h2>Successfully Logged out!</h2>
      <p>
        <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
}

export default Logout;
