import React, {useState, useRef, useEffect} from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./index.css"
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createUserThunk} from "../services/user-thunks";
import axios from "axios";
import {BACKEND_API} from "../services/user-service";
//import axios from './api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const REGISTER_URL = '/register';
const EMAIL_CHECK =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const FIRST_NAME = /^[A-z][A-z0-9-_]{1,23}$/;
const LAST_NAME = /^[A-z][A-z0-9-_]{0,23}$/;
const PHN_REGEX=/^[1-9][0-9]{9}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const RegisterUser = () => {
  // const user1 = {
  //   "_id": "",
  //   "firstname": "",
  //   "lastname": "",
  //   "username": "",
  //   "email": "",
  //   "password": "",
  //   "confirm_password": "",
  //   "phone": "9887234723",
  //   "profile_pic": "",
  //   "banner_pic": "",
  //   "location": "",
  //   "dob": ""
  // }
  //const [profile, setProfile] = useState(user1);
  const userRef = useRef();
  const errRef = useRef();
  const [useravailable, setuseravailable]=useState(false)
  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [firstname, setfirstname] = useState('');
  const [validfirstname, setValidfirstname] = useState(false);
  const [firstnameFocus, setfirstnameFocus] = useState(false);

  const [lastname, setlastname] = useState('');
  const [validlastname, setValidlastname] = useState(false);
  const [lastnameFocus, setlastnameFocus] = useState(false);

  const [location, setLocation] = useState('');
  const [locationFocus, setlocationFocus] = useState(false);

  const [dob, setDOB] = useState('');
  const [dobFocus, setDOBFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setvalidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [validPhoneNumber, setValidPhoneNumber] = useState(false);
  const [phoneNumberFocus, setPhoneNumberFocus] = useState(false);

  const [userType, setUserType] = useState('General');
  const [userTypeFocus, setuserTypeFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect( () => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  async function checkUserNameAvailable(){
    if(user.toString().length==0)return;
    setUserFocus(false)
    const response= await axios.get(`${BACKEND_API}/checkusername/`+user.toLowerCase());
    if(response.data.status==200 && response.data.available){
      setuseravailable(true)
    }
    else {console.log("not availble")
      alert("Sorry username already taken")
      setuseravailable(false)
   }
  }

  async function checkEmailAvailable(){
    if(email.toString().length==0)return;
    setEmailFocus(false)
    const response= await axios.get(`${BACKEND_API}/checkemail/`+email);
    if(response.data.status==200 && response.data.available){
      setuseravailable(true)
    }
    else {console.log("not availble")
      alert("Sorry, This email id already registered")
      setuseravailable(false)
    }
  }

  useEffect(() => {
    setValidfirstname(FIRST_NAME.test(firstname));
  }, [firstname])

  useEffect(() => {
    setValidlastname(LAST_NAME.test(lastname));
  }, [lastname])

  useEffect(() => {
    setvalidEmail(EMAIL_CHECK.test(email));
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
  setValidMatch(pwd===matchPwd)
  }, [pwd, matchPwd])

  useEffect(()=>{
    setValidPhoneNumber(PHN_REGEX.test(phoneNumber));
  },[phoneNumber])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    console.log("submit called")
     e.preventDefault();
    try {
      let role = "General"
      let userForm = {
        username: user.toLowerCase(), firstname: firstname,
        password: pwd,
        lastname: lastname,
        email: email.toLowerCase(),
        phone: phoneNumber,
        location: location,
        dob: dob, role: userType.toLowerCase()
      }
     const response = await axios.post(`${BACKEND_API}/register`,userForm);
      //const response= dispatch(createUserThunk(userForm));
      console.log(response);
      if(response.status==200){
        console.log("user created");
        setSuccess(true);
        setUser('');
        setPwd('');
        setMatchPwd('');
      }
      else{
        setSuccess(false);
      }

        setUser('');
        setPwd('');
        setMatchPwd('');

    } catch (err) {
    }
  }



  return (

      <>
        {success ? (
            <section>
              <h1>Success!</h1>
              <p>
                <Link to="/login">Sign In</Link>
              </p>
            </section>
        ) : (
            <section>
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
                 aria-live="assertive">{errMsg}</p>
              <h1>Register</h1>
              <form >
                <label htmlFor="username">
                  Username:
                  <FontAwesomeIcon icon={faCheck}
                                   className={validName&&useravailable ? "valid" : "hide"}/>
                  <FontAwesomeIcon icon={faTimes}
                                   className={validName&&useravailable || !user  ? "hide"
                                       : "invalid"}/>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => checkUserNameAvailable()}
                />
                <p id="uidnote" className={userFocus && user && !validName
                    ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle}/>
                  4 to 24 characters.<br/>
                  Must begin with a letter.<br/>
                  Letters, numbers, underscores, hyphens allowed.
                </p>

                <label htmlFor="userType">
                  Role:
                </label>

                <select value={userType} id="userType"
                        onFocus={() => setuserTypeFocus(true)}
                        onBlur={() => setuserTypeFocus(false)}
                        onChange={(e) => setUserType(e.target.value)}>
                  <option name="User"> User</option>
                  <option name="Streamer">Streamer</option>
                  <option name="Creator">Creator</option>
                </select>


                <label htmlFor="firstname">
                  FirstName:
                  <FontAwesomeIcon icon={faCheck}
                                   className={validfirstname ? "valid"
                                       : "hide"}/>
                  <FontAwesomeIcon icon={faTimes}
                                   className={validfirstname || !firstname
                                       ? "hide" : "invalid"}/>
                </label>

                <input
                    type="text"
                    id="firstname"
                    autoComplete="off"
                    onChange={(e) => setfirstname(e.target.value)}
                    value={firstname}
                    required
                    aria-invalid={validfirstname ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setfirstnameFocus(true)}
                    onBlur={() => setfirstnameFocus(false)}
                />
                <p id="uidnote"
                   className={firstnameFocus && firstname && !validfirstname
                       ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle}/>
                  2 to 24 characters.<br/>
                  Must begin with a letter.<br/>
                </p>

                <label htmlFor="lastname">
                  LastName:
                  <FontAwesomeIcon icon={faCheck}
                                   className={validlastname ? "valid"
                                       : "hide"}/>
                  <FontAwesomeIcon icon={faTimes}
                                   className={validlastname || !lastname
                                       ? "hide" : "invalid"}/>
                </label>

                <input
                    type="text"
                    id="lastname"
                    autoComplete="off"
                    onChange={(e) => setlastname(e.target.value)}
                    value={lastname}
                    required
                    aria-invalid={validlastname ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setlastnameFocus(true)}
                    onBlur={() => setlastnameFocus(false)}
                />
                <p id="uidnote"
                   className={lastnameFocus && lastname && !validlastname
                       ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle}/>
                  1 to 24 characters.<br/>
                  Must begin with a letter.<br/>
                </p>

                <label htmlFor="password">
                  Password:
                  <FontAwesomeIcon icon={faCheck}
                                   className={validPwd ? "valid" : "hide"}/>
                  <FontAwesomeIcon icon={faTimes}
                                   className={validPwd || !pwd ? "hide"
                                       : "invalid"}/>
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote"
                   className={pwdFocus && !validPwd ? "instructions"
                       : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle}/>
                  8 to 24 characters.<br/>
                  Must include uppercase and lowercase letters, a number and a
                  special character.<br/>
                  Allowed special characters: <span
                    aria-label="exclamation mark">!</span> <span
                    aria-label="at symbol">@</span> <span
                    aria-label="hashtag">#</span> <span
                    aria-label="dollar sign">$</span> <span
                    aria-label="percent">%</span>
                </p>


                <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <FontAwesomeIcon icon={faCheck}
                                   className={validMatch && matchPwd ? "valid"
                                       : "hide"}/>
                  <FontAwesomeIcon icon={faTimes}
                                   className={validMatch || !matchPwd ? "hide"
                                       : "invalid"}/>
                </label>
                <input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote"
                   className={matchFocus && !validMatch ? "instructions"
                       : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle}/>
                  Must match the first password input field.
                </p>

                <label htmlFor="email">
                  Email:
                  <FontAwesomeIcon icon={faCheck}
                                   className={validEmail ? "valid" : "hide"}/>
                  <FontAwesomeIcon icon={faTimes}
                                   className={validEmail || !email ? "hide"
                                       : "invalid"}/>
                </label>

                <input
                    type="email"
                    id="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => checkEmailAvailable()}
                />
                <p id="uidnote" className={emailFocus && email && !validEmail
                    ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle}/>
                  Email should be of the format Alice@gmail.com<br/>
                </p>

                <label htmlFor="dob">
                  Date Of Birth :
                </label>
                <input
                    type="date"
                    id="dob"
                    onChange={(e) => setDOB(e.target.value)}
                    value={dob}
                    onFocus={() => setDOBFocus(true)}
                    onBlur={() => setDOBFocus(false)}
                />

                <label htmlFor="phonenumber">
                  Phone Number :
                </label>
                <input
                    type="text"
                    id="phonenumber"
                    autoComplete="off"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    onFocus={() => setPhoneNumberFocus(true)}
                    onBlur={() => setPhoneNumberFocus(false)}
                />

                <p id="uidnote" className={phoneNumberFocus && phoneNumber && !validPhoneNumber
                    ? "instructions" : "offscreen"}>
                  <FontAwesomeIcon icon={faInfoCircle}/>
                  Enter valid 10 digit phone  number<br/>
                </p>

                <label htmlFor="location">
                  Location :
                </label>
                <input
                    type="text"
                    id="location"
                    autoComplete="off"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    onFocus={() => setlocationFocus(true)}
                    onBlur={() => setlocationFocus(false)}
                />


                <br/>

                <button disabled={!validName || !validMatch ||!validfirstname
                    || !validlastname || !validMatch || !validPwd || !validEmail
                    || dob.toString().length==0 || !validPhoneNumber || location.toString().length==0
                    ||!useravailable
                    ? true : false}
                        onClick={handleSubmit}>Sign Up
                </button>
              </form>
              <p>
                Already registered?<br/>
                <span className="line">
                            {/*put router link here*/}
                  <Link to="/login">Sign In</Link>
                        </span>
              </p>
            </section>
        )}
      </>
  )
}
export default RegisterUser;


