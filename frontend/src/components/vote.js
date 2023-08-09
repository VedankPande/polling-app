import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/vote.css";

export default function Vote(props) {
    console.log(props)
    return <div className="vote">{`${props.data.option} - ${props.data.count}`}</div>
}
