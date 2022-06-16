import Events from './Events.js';

const UserEvents = ({events, onClick}) => {

    return(
        <div className="user-events">
            <h3 className="form_heading">Your events:</h3>
            <div className="user-events-list">
                {events.length > 0 ? (
                <Events events={events} buttonText={"Delete"} onClick={onClick}/>
                ) : (
                    <h4 className="no-events-text">
                    No Events to show
                </h4>
            )}
        </div>
        </div>
    )
}

export default UserEvents;