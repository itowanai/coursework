import Event from "./Event"

const Events = ({ events, onClick, buttonText }) => {
    return (
        <>
          {events.map((event, index) => (
            <Event key={index} event={event} onClick={onClick} buttonText={buttonText}/>
          ))}
        </>
      )
}

export default Events