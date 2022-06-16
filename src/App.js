import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Navigate,
  Routes,
  useNavigate,
  useLocation
} from "react-router-dom";

import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AllEvents from "./components/AllEvents";
import Profile from "./components/Profile"
import { sendRequest } from "./components/SendRequest.js";



function Root() {
  const [isAuth, setIsAuth] = useState(false);
  const [userData, setUserData] = useState({});

  let navigate = useNavigate();
  const location = useLocation()

  useEffect(() => { //try to login using token from local storage
    var loacal_token = localStorage.getItem("calendar_token");
    console.log("FROM TOKEN LOGIN:", loacal_token);
    
    if (loacal_token !== null) {
      sendRequest("POST", "/api/login_with_token", loacal_token, null)
      .then((data) => {
        console.log("FROM TOKEN LOGIN:", data);
        window.localStorage.setItem("calendar_user", JSON.stringify(data));
        setUserData(data)
        setIsAuth(true)
      }) 
      .catch((err) => {
        console.log("local token is missing");
        if (location.pathname !== "/register")
          navigate("/login")
      });
    } else {
      if (location.pathname !== "/register")
        navigate("/login")
    }
  }, [])

  const onUpdateUser = async (user) => {
    sendRequest("PUT", `/api/user/${user.id}`, null, user)
      .then((data) => {
        window.localStorage.setItem("calendar_user", JSON.stringify(data));
        console.log("FROM USER UPDATE:", data);
        setUserData(data)
      })
      .catch((err) => {
        alert("Something went wrong when updating user");
      });
  }

  const tryToLogin = async (logpass) => { //try to login using username and password
    sendRequest("POST", "/api/login", null, logpass)
      .then((data) => {
        window.localStorage.setItem("calendar_token", data.token.slice(2,-1));
        window.localStorage.setItem("calendar_user", JSON.stringify(data));

        setUserData(data)
        setIsAuth(true)
        navigate("/")
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };

  const tryToRegister = async (userFields) => { //try to register using username and password
    sendRequest("POST", "/api/user", null, userFields)
      .then((data) => {

        console.log(data.token)
        console.log(JSON.stringify(data))
        window.localStorage.setItem("calendar_token", data.token.slice(2,-1));
        window.localStorage.setItem("calendar_user", JSON.stringify(data));
        console.log("FROM Register:", data);
        setUserData(data)
        setIsAuth(true)
        navigate("/")
      })
      .catch((err) => {
        console.log(err)
        alert("Something went wrong");
      });
  };

  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" && <Header setIsAuth={setIsAuth}/>}

      <Routes>
        <Route exact path="/"
          element={!isAuth ? <Navigate to="/login" /> : <Navigate to="/home" />}
        />

        <Route path="/login" 
        element={!isAuth ? <Login tryToLogin={tryToLogin}/> : <Navigate to="/home"/>} 
        />
        <Route path="/register" 
        element={!isAuth ? <Register tryToRegister={tryToRegister} /> : <Navigate to="/home"/>} 
        />

        <Route path="/home" element={<Home loacal_token={localStorage.getItem("calendar_token")} />} />
        <Route path="/all_events" element={<AllEvents userData={userData} />} /> 
        <Route path="/profile" element={<Profile onChange={onUpdateUser} />} /> 

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}


const App = () => {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
};

export default App;
