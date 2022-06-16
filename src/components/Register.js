import { useState } from "react";
import {Link} from 'react-router-dom'


const Register = ({ tryToRegister }) => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !rPassword) {
      alert("Please enter username and password");
      return;
    }

    if (password !== rPassword) {
      alert("Passwords are not the same");
      return;
    }

    tryToRegister({ username, firstName, lastName, password });
    setUsername("");
    setFirstname("")
    setLastname("")
    setPassword("");
    setRPassword("");
  };

  return (
<div className="form-container">
      <form className="register-form">
        <h3 className="form_heading">Registration</h3>

        <input
          type="username"
          className="text_field"
          name="username"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="text"
          className="text_field"
          name="firstName"
          value={firstName}
          placeholder="First name"
          onChange={(e) => setFirstname(e.target.value)}
          required
        />

        <input
          type="text"
          className="text_field"
          name="lastName"
          value={lastName}
          placeholder="Last name"
          onChange={(e) => setLastname(e.target.value)}
          required
        />

        <input
          type="password"
          className="text_field"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          type="password"
          className="text_field"
          name="rPassword"
          value={rPassword}
          placeholder="Repeat password"
          onChange={(e) => setRPassword(e.target.value)}
          required
        />

        <div className="btn-sumbit-container">
          <button
            type="submit"
            className="btn btn-submit"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
        </div>

        <div className="auth-link-container">
            <Link className="auth-link" to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
