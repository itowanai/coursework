import { useState } from 'react'

import { useNavigate } from "react-router-dom";
  

const Profile = ({ onChange }) => {
    const[user, setUser] = useState(JSON.parse(window.localStorage.getItem("calendar_user")))
    const[newPassword, setNewPassword] = useState("")

    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(user)    
        if (!user.username || !user.firstName || !user.lastName) {
            alert('Can`t set empty names')
            return 
        }

        let newUser = Object.assign({},user)

        if (newPassword) {
            newUser["password"] = newPassword
        }
        onChange(newUser)
    }

    return (
    <div className="form-container">
      <form className="profile-form">
        <div className="form_heading">Profile</div>
        <div className="profile-subscript">
          Username:
          <input
          className="text_field"
            type="username"
            placeholder="username"
            value={user.username || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, username: e.target.value }))
            }
          />
        </div>
        <div className="profile-subscript">
          Firstname:
          <input
          className="text_field"
            type="text"
            placeholder="firstname"
            value={user.firstName || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, firstName: e.target.value }))
            }
          />
        </div>
        <div className="profile-subscript">
          Lastname:
          <input
          className="text_field"
            type="text"
            placeholder="lastname"
            value={user.lastName || ""}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
        </div>
        <div className="profile-subscript">
          Change password:
          <input
            className="text_field"
            type="text"
            placeholder="new password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="btn-sumbit-container">
        <button type="submit" onClick={handleSubmit} className="btn btn-submit">
          Submit changes
        </button>
        </div>
      </form>
    </div>
    );
}

export default Profile;