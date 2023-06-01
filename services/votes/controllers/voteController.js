import mongoose from "mongoose";
import votesSchema from "../model/votes.js";

//TODO: Complete controllers
const getVotes = async (req,res)=>{

    const {poll} = req.body

    const Votes = mongoose.model('votes',votesSchema)

    if (!poll){
        res.json({
            status: 400,
            message: "Polls id is required"
        })
    }

    const votes = await Votes.find({poll: poll}).exec()

    res.json({votes})
}

const updateVotes = (req,res)=>{
    console.log(req.body)
    res.json({})
}

export {getVotes,updateVotes}