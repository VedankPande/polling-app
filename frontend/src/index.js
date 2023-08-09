import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Poll from "./components/poll";
import Register from "./components/register";
import ResponsiveAppBar from "./components/navbar";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AllPolls from "./components/userAllPolls";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <ResponsiveAppBar/>
    <Routes>
      <Route index element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path = "register" element={<Register />}/>
      <Route path="poll" element={<Poll />} />
      <Route path="home" element={<AllPolls />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
