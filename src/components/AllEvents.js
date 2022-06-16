import { useState, useEffect } from 'react'
import { sendRequest } from "./SendRequest.js";

import Events from './Events.js';

const AllEvents = ({userData}) => {
    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        sendRequest(
          "GET",
          "/api/all_events",
          null,
          null
        )
          .then((data) => {

            setAllEvents(data);
            console.log("USER EVENTS FROM ALL EVENTS EFFECT:", data);
          })
          .catch((err) => {
            alert("Something went wrong when loading all events");
          });
      }, []);

    const onFollowClick = (eventId) => {
      sendRequest(
        "POST",
        `/api/event/${eventId}/user/${userData.id}`,
        null,
        null
      )
        .then((data) => {
          alert("You successfully followed");
        })
        .catch((err) => {
          alert("You're already following");
        });
    }

    return(
        <div className="all-events-container">
            <div className="all-events-block">
            <h3 className="form_heading">All events:</h3>
            <div className="all-events-list">

            <div className="all-events">
                {allEvents.length > 0 ? (
                <Events events={allEvents} buttonText="Follow" onClick={onFollowClick}/>
                ) : (
                <h4 className="no-events-text">
                    No Events to show
                </h4>
            )}
        </div>
        </div>
        </div>
        </div>
    )
}

export default AllEvents;