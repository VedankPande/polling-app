import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import axios from "axios"

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:3030/register/",
        requestData
      );
      console.log(response);

      setEmail("");
      setPassword("");
      setReEnteredPassword("")

      if (response.status === 200) {
        sessionStorage.setItem("user", response.data.payload.user)
        navigate('/home',{replace:true});
      }

    } catch (err) {
      console.error(err);
    }
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Register</h2>
        </Grid>
        <TextField
          label="Email"
          placeholder="Enter email"
          onChange={(event) => setEmail(event.target.value)}
          variant="outlined"
          value={email}
          fullWidth
          required
        />
        <TextField
          label="Password"
          placeholder="Enter password"
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
          value={password}
          fullWidth
          required
        />
        <TextField
          label="Re-Password"
          placeholder="Re-enter password"
          type="password"
          onChange={(event) => setReEnteredPassword(event.target.value)}
          variant="outlined"
          value={reEnteredPassword}
          fullWidth
          required
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          style={btnstyle}
          fullWidth
        >
          Register
        </Button>
        <Typography>
          {" "}
          Already have an account?
          <Link href="/login">Sign In</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
