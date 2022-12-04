import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";
import { BACKEND_API } from "../services/user-service";
import axios from "axios";

function ProfileComponentOther() {
  const location = useLocation();
  const [data, setData] = useState({});
  useEffect(() => {
    const lastSegment = location.pathname.split("/").pop();
    userApi(lastSegment);
  }, []);

  const userApi = async (lastSegment) => {
    const response = await axios.get(`${BACKEND_API}/profile/${lastSegment}`);
    if (response.data.status == 200) {
      setData(response.data.userObject);
    } else {
      alert("User Not Found");
    }
  };

  return <div>ProfileComponentOther</div>;
}

export default ProfileComponentOther;
