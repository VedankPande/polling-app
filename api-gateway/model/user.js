import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    //user_id: {type: Number, unique: true, required: true},
    email: {type: String, index: {unique: true}, required: true},
    password: {type: String, required: true}
});

//TODO: Needs a try catch? Better error handling for hashing function
userSchema.pre('save', async function(next){

    const password = this.password
    const saltRounds = 10

    const hash = await new Promise((resolve,reject)=>{
        bcrypt.hash(password,saltRounds, function(err,hash){
            if (err){
                console.log("error while hashing password")
                reject(err)
            }
            resolve(hash)
        })
    })

    this.password = hash
    next()
})

userSchema.methods.validatePassword = async function(enteredPassword){
    
    try{
        const passwordMatch = await bcrypt.compare(enteredPassword,this.password)
        return passwordMatch
    }
    catch(err){
        console.log(err)
        return false
    }

}

export default userSchema