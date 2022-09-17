const mongoose= require("mongoose");

const userSchema= mongoose.Schema({
    email:String,
    password: String
})

const UserModel= mongoose.model("students",userSchema);

module.exports={
    UserModel
}