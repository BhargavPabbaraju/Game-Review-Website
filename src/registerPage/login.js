import { useRef, useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {createUserThunk, loginUserThunk} from "../services/user-thunks";
import HomeComponent from "../home";

const Login = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  // useEffect(() => {
  //   userRef.current.focus();
  // }, [])
  //
  // useEffect(() => {
  //   setErrMsg('');
  // }, [user, pwd])

  const dispatch = useDispatch();
  const navigate=useNavigate();
  const userData=useSelector(state => state.userData);
  useEffect(()=>{
    if(userData.profile.isLoggedIn){
      navigate("/home")
    }
  },[])
  useEffect(()=>{
    console.log("login",userData.profile);
    if(userData.profile.isLoggedIn){
      navigate("/home")
    }
  },[userData])

  const handleSubmit =async (e)=>{
    e.preventDefault()
    const userrequest={username:user,password:pwd}
    dispatch(loginUserThunk(userrequest));
  }
  return (
      <section>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Sign In</h1>
        <form >
          <label htmlFor="username">Username:</label>
          <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
          />
          <label htmlFor="password">Password:</label>
          <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
          />
          <br/>
          <button onClick={handleSubmit}>Sign In</button>
        </form>
        <p>
          Need an Account?<br />
          <span className="line">
                    <Link to="/register">Sign Up</Link>
          </span>
        </p>
      </section>
  )
}

export default Login