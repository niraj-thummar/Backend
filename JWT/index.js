const express = require('express')
const bcrypt= require('bcrypt')
const User= require('./models/user')
const jwt=require('jsonwebtoken')
const app=express()
app.use(express.json())
const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

mongoose.connect(process.env.mongourl).then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log(err);
    
})
const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.secret,{expiresIn:'1h'});
}
    
const verfiyToken=(req,res,next)=>{
const authheader = req.headers.authorization;
if(!authheader){
    return res.json({messsage:"token mmissing"})
}

const token = authheader.split(' ')[1];

try{
   const decoded=jwt.verify(token,process.env.secret);
   req.id=decoded.id;
   next() 
}
catch(err){
    res.json({err})
}
} 

app.use(express.static('models'))
app.post('/register',async(req,res)=>{
    try{
        const {name,email,password,phone}=req.body
        const hashPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,
            email,
            password:hashPassword,
            phone
        })
        res.json({message:"user registered successfully",newUser:user})
    }
    catch(err){
        res.json({err})
    }
})


app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body

        const user=await User.findOne({email})
        if(!user){
            return res.json({message:"user not found"})
        }
        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid)
    {
    return res.json({message:"invaid credentials"})
    }
    const token=await generateToken(User.id)
    res.json({message:"user login successfully",token:token})
}
catch(err){
    res.json({err})
}
})

app.get('/user',verfiyToken,async(req,res)=>{
    try{
        const user=await User.find()
        res.json({messsage:"user fetcched",alluser:user})
    }
    catch(err){
        res.json({err})
    }
})
app.listen(3000)