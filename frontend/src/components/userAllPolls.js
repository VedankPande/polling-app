import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import axios from "axios";

import "../styles/allPolls.css";

export default function AllPolls() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const getData = async () => {
    await axios
      .get(`http://127.0.0.1:3080/polls?user=${sessionStorage.getItem("user")}`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error.request);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = (pollID,pollName) =>{
    navigate('/poll', {state: {poll: pollID, name: pollName}})
  }

  return (
    <div className="all-polls-container">
      {responseData && (
        <div className="all-polls">
          <Typography variant="h4" gutterBottom>
            All Polls
          </Typography>
          <List component="div">
            {responseData.message.map((poll) => (
              <ListItem divider key={poll._id}>
                <ListItemButton onClick={()=>{handleClick(poll._id,poll.name)}}>
                  <ListItemText primary={poll.name}></ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
}
