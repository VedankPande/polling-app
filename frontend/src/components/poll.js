import React, { useEffect, useState } from "react";

import VoteContainer from "./votesContainer";
import Vote from "./vote";
import "../styles/poll.css";

export default function Poll() {
  const [responseData, setResponseData] = useState(null);

  const fetchData = () => {
    //fetch data and set state here
  };

  return (
    <div className="poll-container">
      <div className="poll">
        <h1>POLL TITLE</h1>
        <VoteContainer>
          <Vote />
          <Vote />
          <Vote />
          <Vote />
          <Vote />
          <Vote />
        </VoteContainer>
      </div>
    </div>
  );
}
