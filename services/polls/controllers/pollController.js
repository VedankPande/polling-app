import mongoose, { mongo } from "mongoose"; 
import pollSchema from "../model/polls.js";

const getPolls = async (req,res)=>{
    const {uuid} = req.body
    const Polls = mongoose.model('polls',pollSchema)

    if (!uuid){
        res.json({"status":400,
                  "message":"please provide a uuid"})
    }

    const polls = await Polls.find({owner:uuid}).exec()
    res.json({polls})
}

const getPoll = (req,res)=>{

    res.json({})

}

const createPoll = async (req,res)=>{
    const Polls = mongoose.model('polls',pollSchema)

    console.log(req.body)
    const {uuid,pollName,options,expire} = req.body 

    try{
        await new Polls({name:pollName,owner:uuid,options:options,expire:expire}).save()

        console.log(`saved poll ${pollName}`)
    
    }
    catch(err){
        console.log(err)
    }
    
    res.json({"status":200,"message":req.body})
}

const deletePoll = (req,res)=>{
    console.log("delete poll request called")
    res.json({})
}

const updatePoll = (req,res)=>{
    console.log("update Poll request called")
    res.json({})
}


export {getPolls,getPoll,createPoll,deletePoll,updatePoll}