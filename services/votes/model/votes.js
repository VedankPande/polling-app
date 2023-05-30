import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const votesSchema = mongoose.Schema({
    poll: {type: String, index: { unique: true}, required: true},
    votes: [{
        option: String,
        count: Number
    }]
})


votesSchema.post("save",(doc)=>{
    console.log("saved votes document",doc)
})


export default votesSchema;