import Events from './Events.js';

const FollowedEvents = ({events, onClick}) => {

    return(
        <div className="followed-events">
            <h3 className="form_heading">Events you follow:</h3>
            <div className="followed-events-list">
                {events.length > 0 ? (
                <Events events={events} buttonText="Unfollow" onClick={onClick}/>
                ) : (
                    <h4 className="no-events-text">
                    No Events to show
                </h4>
            )}
        </div>
        </div>
    )
}

export default FollowedEvents;