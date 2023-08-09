import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import VoteContainer from "./votesContainer";
import Vote from "./vote";
import "../styles/poll.css";

export default function Poll() {
  const [responseData, setResponseData] = useState(null);
  const {state} = useLocation()

  const fetchData = async () => {
    //fetch data and set state here
    axios
      .get(`http://127.0.0.1:3080/votes?poll=${state.poll}`, {
        withCredentials: true,
      })
      .then((response) => {
        setResponseData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //TODO: Move ui to MUI completely 
  return (
    <div className="poll-container">
      {responseData && (
        <div className="poll">
          <h1>{state.name}</h1>
          <VoteContainer>
            {responseData.message[0].votes.map((voteOption)=>
              <Vote key={voteOption._id} data = {voteOption}/>
            )}
          </VoteContainer>
        </div>
      )}
    </div>
  );
}
