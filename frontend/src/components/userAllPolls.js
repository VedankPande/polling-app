import React, { useEffect, useState } from "react";
import { Typography, List, ListItem, ListItemText } from "@mui/material";
import Vote from "./vote";
import axios from "axios";

import "../styles/allPolls.css"

export default function AllPolls() {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    await axios
      .get("http://127.0.0.1:3080/polls?user=64749d4793bfab3dc9946246", {
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

  return (
    <div className="all-polls-container">
      {responseData && (
        <div className="all-polls">
          <Typography variant="h4" gutterBottom>
            All Polls
          </Typography>
          <List component="div">
            {responseData.message.map((poll) => (
              <ListItem button divider key={poll._id}>
                <ListItemText primary={poll.name}></ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </div>
  );
}
