const express= require("express");
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');

const { connection } = require("./config/db");
const { UserModel } = require("./Model/UserModel");

const app= express();
app.use(express.json());

app.get("/",async(req,res)=>{
    const data = await UserModel.find();
    res.send(data);
})
app.get("/dashboard",(req,res)=>{
 const token= req.headers.authorization.split(" ")[1];
 jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
    if(err){
        res.status(401).send("You are not authorized")
    }
    else{
        res.send("This is a restricted page")
    } 
 })
})
app.post("/register",async(req,res)=>{
    const user= await UserModel.findOne({email: req.body.email});
    if(user){
        res.send("user already registered")
    }else{
        const {email,password}= req.body ;
        bcrypt.hash(password,6).then(async(hash)=>{
            const newUser= new UserModel({email,password:hash});
            await newUser.save();
            res.send("Registration successful")
        }).catch(()=>{
            res.send("Something went wrong. Plaese try after some time")
        })
    }
})
app.post("/login",async(req,res)=>{
    let {email,password}= req.body;
    let Exist= await UserModel.findOne({email});
    if(Exist){
        let hash= Exist.password;
    bcrypt.compare(password,hash,(err,result)=>{
        if(result){
            var token = jwt.sign({},process.env.SECRET_KEY,{expiresIn:'1h'});
            res.send({message:"Login Suucessful" , token:token})
        }else{
            res.status(401).send("invalid creds")
        }
    })
    }
    else{
        res.status(404).send("No user found")
    }
})

app.listen(7001, async()=>{
    try{
        await connection;
        console.log("DB connected successfully")
    }
    catch{
        console.log("Failed to connect to DB")
    }

    console.log("server listening port no. 7001")
})