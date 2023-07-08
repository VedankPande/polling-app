import mongoose from "mongoose"
import dotenv from "dotenv"

import connectRabbitMQ from "../messaging/myRabbitMQ.js"
import sendRabbitMessage from "../messaging/rabbitProducer.js"

/**
 * @openapi
 * components:
 *   schemas:
 *     Votes:
 *       type: object
 *       required:
 *         - poll
 *         - votes
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the poll
 *         poll:
 *           type: string
 *           description: The id of the poll that the votes correspond to
 *         votes:
 *           description: String to integer map that denotes votes per option
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               vote:
 *                  type: integer
 *                 
 *       example:
 *         id: d5fE_asz
 *         poll: asdf14sedf
 *         options: [{"A":0},{"B":1},{"C":3}]
 */

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

    //sendRabbitMessage(channel,process.env.RABBIT_WEBSOCKET_QUEUE,{message:"saved vote"})
    console.log(doc)
})

votesSchema.post("updateOne",function(){

    sendRabbitMessage(channel,process.env.RABBIT_WEBSOCKET_QUEUE,{poll: this.getQuery().poll})
    console.log("someone voted!")
})
votesSchema.post("deleteOne",function(doc){

    //sendRabbitMessage(channel,process.env.RABBIT_WEBSOCKET_QUEUE,{message:"saved vote"})
    console.log(doc)
})


export default votesSchema;