import mongoose from "mongoose"
import dotenv from "dotenv"

import connectRabbitMQ from "../messaging/myRabbitMQ.js"
import sendRabbitMessage from "../messaging/rabbitProducer.js"
dotenv.config()

const channel = await connectRabbitMQ(process.env.RABBIT_URL,process.env.RABBIT_WEBSOCKET_QUEUE)

const votesSchema = mongoose.Schema({
    poll: {type: String, index: { unique: true}, required: true},
    votes: [{
        option: String,
        count: Number
    }]
})

//TODO: NOT DRY - maybe create function to switch between hooks?
votesSchema.post("save",(doc)=>{

    sendRabbitMessage(channel,process.env.RABBIT_WEBSOCKET_QUEUE,{message:"saved vote"})
    console.log(doc)
})

votesSchema.post("deleteOne",function(doc){

    sendRabbitMessage(channel,process.env.RABBIT_WEBSOCKET_QUEUE,{message:"saved vote"})
    console.log(doc)
})


export default votesSchema;