import mongoose from "mongoose";


const pollSchema = mongoose.Schema({

    name: {type: String, index: {unique: false},required:true},
    owner: {type: String},
    options: {type: [String]},
    expire: {type: Date}
})

pollSchema.post('save', function(doc){
    console.log("post save",doc)
    //TODO: send message to votes here
})

export default pollSchema

