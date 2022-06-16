import { useState } from "react";
import {Link} from 'react-router-dom'

const Login = ({ tryToLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    tryToLogin({ username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <div className="form-container">
      <form className="login-form">
        <h3 id="login" className="form_heading">
          Login
        </h3>

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
          type="password"
          className="text_field"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="btn-sumbit-container">
          <button
            type="submit"
            className="btn btn-submit"
            onClick={handleSubmit}
          >
            Log in
          </button>
        </div>
        <div className="auth-link-container">
            <Link className="auth-link" to="/register">Sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
