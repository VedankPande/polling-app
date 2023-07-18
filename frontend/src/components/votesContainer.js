import React from "react";

import '../styles/voteContainer.css'

export default function VoteContainer(props){
    //Render vote objects passed in here

    return(
        <div className="vote-container">
        {props.children}
        </div>
    )
}