import mongoose from "mongoose"; 
import pollSchema from "../model/polls.js";

const getPolls = async (req,res)=>{
    const {uuid} = req.body
    const Polls = mongoose.model('polls',pollSchema)

    //validate request body
    if (!uuid){
        res.json({"status":400,
                  "message":"please provide a uuid"})
    }

    //Get poll and send response
    Polls.find({owner:uuid}).exec().then((doc)=>{
        console.log(doc)
        res.json({status:200,message:doc})
    }).catch((error)=>{
        console.log(error)
        res.json({status:500,message:`Error occurred when retrieving documents ${error}`})
    })
}

const getPoll = (req,res)=>{
    const poll = req.params.id
    const Polls = mongoose.model('polls',pollSchema)


    if (!poll){
        res.json({status:400,message: "Poll is required"})
    }

    Polls.findOne({_id:poll}).exec().then((doc)=>{
        res.json({status:200,message:doc})
    }).catch((error)=>{
        res.json({status:500,message:`Error occurred when trying to find Poll: ${error}`})
    })

}

const createPoll = async (req,res)=>{
    const Polls = mongoose.model('polls',pollSchema)

    console.log(req.body)
    const {uuid,pollName,options,expire} = req.body 

    //validate request body
    if (!(uuid && pollName && options && expire)){
        res.json({"status":400,
                  "message":"all fields are required"})
    }

    //create poll and send response
    Polls.create({name:pollName,owner:uuid,options:options,expire:expire}).then((doc)=>{
        console.log(`Saved poll ${doc}`)
        res.json({status:200,message:doc})
    }).catch((error)=>{
        console.log(error)
        res.json({status:500,message:`Error occurred when trying to save Poll: ${error}`})
    })
}

//TODO: Return poll that was deleted?
//FIXME: Check if poll exists
const deletePoll = (req,res)=>{
    console.log("delete poll request called")

    //setup model
    const Polls = mongoose.model('polls',pollSchema) 
    const {poll} = req.body

    //validate req body
    if (!poll){
        res.json({status:400,message:"Poll id is required"})
    }

    //Delete poll - passing poll id in options so that the post delete middleware can access it
    Polls.deleteOne({_id:poll},{id: poll}).exec().then(()=>{
        res.json({staus:200,message:"Deleted poll"})
    }).catch((error)=>{
        console.log(error)
        res.json({status:500,message:`Error occurred while deleting document: ${error}`})
    })
}

const updatePoll = (req,res)=>{
    console.log("update Poll request called")
    res.json({})
}


export {getPolls,getPoll,createPoll,deletePoll,updatePoll}