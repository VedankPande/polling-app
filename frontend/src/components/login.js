import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:3030/login/",
        requestData,
        { withCredentials: true }
      );
      console.log(response);

      setEmail("");
      setPassword("");
      if (response.status === 200) {
        navigate('/home',{replace:true});
      }
    } catch (err) {
      console.error(err);
    }
  };

  //TODO: Add to css
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
          <h2>Sign In</h2>
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
        <FormControlLabel
          control={<Checkbox name="checkedB" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit}
          style={btnstyle}
          fullWidth
        >
          Sign in
        </Button>
        <Typography>
          <Link href="#">Forgot password ?</Link>
        </Typography>
        <Typography>
          {" "}
          Don't have an account?
          <Link href="/register">Register</Link>
        </Typography>
      </Paper>
    </Grid>
  );
}
