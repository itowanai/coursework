import { useState } from 'react'
import Calendar from 'react-calendar';

const getDateString = (date) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return date.toLocaleDateString("en-US", options)
}

const AddEvent = ({ onAdd }) => {
    const [name, setName] = useState('')
    const [date, setDate] = useState(getDateString(new Date))

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            alert('Please enter event name')
            return 
        }

        onAdd({name, date})

        setName('')
    }

    return(
      <form className="add-form" >
        <p className="form_heading">Create Event</p>

        <input
          type="text"
          placeholder="Name"
          className="text_field"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Calendar
          onChange={(calDate) => setDate(getDateString(calDate))}
        />
        <div className="btn-sumbit-container">
        <button type="submit" onClick={handleSubmit} className='btn btn-submit'>
            Create
        </button>
        </div>
      </form>
    );
}

export default AddEvent;