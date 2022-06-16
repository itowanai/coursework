const Event = ({ event, onClick, buttonText}) => {
    return (
        <div className="event-container">
        <div className="event">
            <div className="event-text">
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            </div>
            <div  className="event-button-container">
                <button className="btn-event" onClick={(e) => onClick(event.id)}>{buttonText}</button>
            </div>
        </div>
        </div>
    )
}

export default Event