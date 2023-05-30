import mongoose from "mongoose";
import votesSchema from "../model/votes.js";

//TODO: Complete controllers
const getVotes = (req,res)=>{
    console.log(req.body)
    res.json({})
}

const updateVotes = (req,res)=>{
    console.log(req.body)
    res.json({})
}

export {getVotes,updateVotes}