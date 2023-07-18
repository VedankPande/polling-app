import React from "react";

import "../styles/login.css";
export default function Login() {
  return (
    <div className="login-container">
      <div className="login">
        <h1>Login</h1>
        <form>
          <label>
            <div className="row">
              <text>Username:</text>
              <input type="text" />
            </div>
          </label>
          <label>
            <div className="row">
              <text>Password:</text>
              <input type="text" />
            </div>
          </label>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
