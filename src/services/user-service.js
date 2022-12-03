import axios from 'axios';

//const API_BASE = process.env.REACT_APP_API_BASE;
export const BACKEND_API = "http://localhost:8080";

export const updateUser = async (user) => {
  const response = await axios
  .put(`${BACKEND_API}/${user._id}`, user);
  return user;
}

export const findUser = async () => {
  const response = await axios.get(BACKEND_API);
  const user = response.data;
  return user;
}

export const loginUser = async (userrequest) => {
  const response = await axios.post(`${BACKEND_API}/login`, userrequest)
  if (response.data.err) {
    return false;
  }
  let token = response.data.token;
  console.log(token);
  localStorage.setItem("WebDevToken", token)
  return response;
}

export const isLoggedIn = async () => {
  const token = localStorage.getItem("WebDevToken")
  const response = await axios.post(`${BACKEND_API}/tokenvalidation`, {},
      {headers: {"x-auth-token": token}})
  if (response.err) {
    return false;
  }
  return response;
}

export const deleteUser = async (tid) => {
  const response = await axios
  .delete(`${BACKEND_API}/${tid}`)
  return response.data
}





