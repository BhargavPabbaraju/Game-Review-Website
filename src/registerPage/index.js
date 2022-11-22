import React, {useState,useRef,useEffect} from "react";
import {faCheck,faTimes,faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./index.css"
import {Link} from "react-router-dom";
//import axios from './api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const REGISTER_URL = '/register';
const EMAIL_CHECK=
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const FIRST_NAME = /^[A-z][A-z0-9-_]{1,23}$/;
const LAST_NAME = /^[A-z][A-z0-9-_]{0,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const RegisterUser=()=>{
  const user1={
    "_id": "",
    "firstName": "",
    "lastName": "",
    "username": "",
    "email": "",
    "password": "",
    "confirm_password":"",
    "phone": "9887234723",
    "profile_pic":"",
    "banner_pic":"",
    "location":"",
    "dateOfBirth":""
  }
  const [profile,setProfile]=useState(user1);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [fistName, setFirstName] = useState('');
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState('');
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

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

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
    setValidFirstName(FIRST_NAME.test(fistName));
  }, [fistName])

  useEffect(() => {
    setValidLastName(LAST_NAME.test(lastName));
  }, [lastName])

  useEffect(() => {
    setvalidEmail(EMAIL_CHECK.test(email));
  }, [email])


  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])


  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      // const response = await axios.post(REGISTER_URL,
      //     JSON.stringify({ user, pwd }),
      //     {
      //       headers: { 'Content-Type': 'application/json' },
      //       withCredentials: true
      //     }
      // );
      // console.log(response?.data);
      // console.log(response?.accessToken);
      // console.log(JSON.stringify(response))
       setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUser('');
      setPwd('');
      setMatchPwd('');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    }
  }

      return(

          <>
            {success ? (
                <section>
                  <h1>Success!</h1>
                  <p>
                    <a href="#">Sign In</a>
                  </p>
                </section>
            ) : (
                <section>
                  <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                  <h1>Register</h1>
                  <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                      Username:
                      <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                      <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} />
                    </label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                        aria-invalid={validFirstName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validFirstName ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      4 to 24 characters.<br />
                      Must begin with a letter.<br />
                      Letters, numbers, underscores, hyphens allowed.
                    </p>

                    <label htmlFor="userType">
                      Role:
                    </label>

                    <select value={userType} id="userType"
                            onFocus={() => setuserTypeFocus(true)}
                            onBlur={() => setuserTypeFocus(false)}
                            onChange={(e) => setUserType(e.target.value)}>
                      <option name="General"> General</option>
                      <option name="Streamer">Streamer</option>
                      <option name="Creator">Creator</option>
                    </select>


                    <label htmlFor="fistName">
                      FirstName:
                      <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                      <FontAwesomeIcon icon={faTimes} className={validFirstName || !fistName ? "hide" : "invalid"} />
                    </label>

                     <input
                        type="text"
                        id="fistName"
                        autoComplete="off"
                        onChange={(e) => setFirstName(e.target.value)}
                        value={fistName}
                        required
                        aria-invalid={validFirstName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setFirstNameFocus(true)}
                        onBlur={() => setFirstNameFocus(false)}
                    />
                    <p id="uidnote" className={firstNameFocus && fistName && !validFirstName ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      2 to 24 characters.<br />
                      Must begin with a letter.<br />
                    </p>

                    <label htmlFor="lastName">
                      LastName:
                      <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                      <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
                    </label>

                    <input
                        type="text"
                        id="lastName"
                        autoComplete="off"
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        required
                        aria-invalid={validLastName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setLastNameFocus(true)}
                        onBlur={() => setLastNameFocus(false)}
                    />
                    <p id="uidnote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      1 to 24 characters.<br />
                      Must begin with a letter.<br />
                    </p>

                    <label htmlFor="password">
                      Password:
                      <FontAwesomeIcon icon={faCheck} className={validPwd ? "valid" : "hide"} />
                      <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? "hide" : "invalid"} />
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
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      8 to 24 characters.<br />
                      Must include uppercase and lowercase letters, a number and a special character.<br />
                      Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                    </p>


                    <label htmlFor="confirm_pwd">
                      Confirm Password:
                      <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                      <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
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
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Must match the first password input field.
                    </p>

                    <label htmlFor="email">
                      Email:
                      <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                      <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
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
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id="uidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Email should be of the format Alice@gmail.com<br />
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
                    <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                  </form>
                  <p>
                    Already registered?<br />
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


