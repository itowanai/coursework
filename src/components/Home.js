import { useState, useEffect } from 'react'
import { sendRequest } from "./SendRequest.js";

import UserEvents from './UserEvents.js'; 
import FollowedEvents from './FollowedEvents.js';
import AddEvent from './AddEvent.js';
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from 'react-router-dom'

const Home = ({loacal_token}) => {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("calendar_user")))
  const [userEvents, setUserEvents] = useState([]);
  const [followedEvents, setFollowedEvents] = useState([]);
  const[userData,setUserData]=useState();
   let navigate = useNavigate();

  useEffect(() => {
    if(loacal_token){
    sendRequest("POST", "/api/login_with_token", loacal_token, null)
    .then((data) => {
      console.log("FROM Home TOKEN LOGIN:", data);
      window.localStorage.setItem("calendar_user", JSON.stringify(data));
      setUserData(data)
    }) 
    .catch((err) => {
      console.log("local token is missing");
      navigate("/login")
      return
    });}
    else{
        console.log("local token is missing");
        navigate("/login")
        return
    }


    console.log("test",userData)
    sendRequest(    
      "GET",
      "/api/your_events/user/" + user.id,
      null,
      null
    )
      .then((data) => {
        setUserEvents(data);
        // console.log("USER EVENTS FROM HOME EFFECT:", data);
      })
      .catch((err) => {
        console.log(err)
        alert("Something went wrong when loading events");
      });

    sendRequest(
      "GET",
      "/api/events/user/" + user.id,
      null,
      null
    )
      .then((data) => {
        setFollowedEvents(data);
        // console.log("FOLLOWED EVENTS FROM HOME EFFECT:", data);
      })
      .catch((err) => {
        console.log(err)
        alert("Something went wrong when loading events");
      });
  }, []);

  // Add Event
  const addEvent = (event) => {
    event["owner_id"] = userData.id
    console.log(event)
    
    sendRequest(
        "POST",
        "/api/event",
        null,
        event
      )
      .then((data) => {
        console.log("RETURNED CREATE EVENT:", data);
        setUserEvents([...userEvents, data])
      })
      .catch((err) => {
        alert("Could not add event");
      });

  };

  const onUnfollowClick = (eventId) => {
    sendRequest(
      "DELETE",
      `/api/event/${eventId}/user/${userData.id}`,
      null,
      null
    )
      .then((data) => {
        setFollowedEvents(followedEvents.filter((event) => event.id != eventId))
      })
      .catch((err) => {
        console.log(err)
      });
  }

  const onDeleteClick = (eventId) => {
    sendRequest(
      "DELETE",
      `/api/event/${eventId}`,
      null,
      null
    )
      .then((data) => {
        setUserEvents(userEvents.filter((event) => event.id != eventId))
      })
      .catch((err) => {
        console.log(err)
      });
}

  return (
    <div className="home-root">

      <UserEvents events={userEvents} onClick={onDeleteClick} />
      <FollowedEvents events={followedEvents} onClick={onUnfollowClick}/>
      <AddEvent onAdd={addEvent} />
    </div>
  );
}

export default Home;