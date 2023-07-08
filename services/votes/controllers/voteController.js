import mongoose from "mongoose";
import votesSchema from "../model/votes.js";

//TODO: Complete controllers
const getVotes = async (req,res)=>{

    const poll = req.query.poll
    try{
        const Votes = mongoose.model('votes',votesSchema)

        if (!poll){
            res.json({
                status: 400,
                message: "Polls id is required"
            })
        }
    
        const votes = await Votes.find({poll: poll}).exec()
        
        console.log("GET votes complete")
        res.json({status:200,message:votes})
    }
    catch(err){
        console.log(err)
        res.json({status:500,message:err})
    }

}

const updateVotes = async (req,res)=>{

    const poll = req.params.poll
    const {vote} = req.body

    if (!(poll && vote)){
        res.json({status:400,message:"Patch requires both id and vote"})
    }
    try{
        const Votes = mongoose.model('votes',votesSchema)

        await Votes.updateOne({poll: poll, "votes.option":vote},{$inc:{"votes.$.count":1}}).exec()
    
        const voteObject = await Votes.find({poll:poll}).exec()
        
        console.log("Updated votes object")
        res.json({status:200,message:voteObject})
    }
    catch(err){
        console.log(err)
        res.json({status:500,message:err})
    }

}

export {getVotes,updateVotes}