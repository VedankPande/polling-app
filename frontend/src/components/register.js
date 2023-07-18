import React from "react";

import "../styles/register.css";
export default function Register() {
  return (
    <div className="register-container">
      <div className="register">
        <h1>Register</h1>
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
            <div className="row">
              <text>Re-enter Password:</text>
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
