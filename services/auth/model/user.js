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
            console.log("hashed password successfully")
            resolve(hash)
        })
    })

    this.password = hash
    next()
})

userSchema.methods.validatePassword = function(enteredPassword){
    const passwordMatch = bcrypt.compare(enteredPassword, this.password, function(err,match){
        if (err){
            return err
        }
        return match
    })

    return passwordMatch
}

export default userSchema