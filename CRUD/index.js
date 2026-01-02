const express = require('express')
const mongoose = require('mongoose')
const app = express()

require('dotenv').config()

mongoose.connect(process.env.mongoUrl).then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err);
})

const user = require('./models/user')


app.use(express.json())

app.get('/users', async(req, res)=>{
    try {
        const users = await user.find();
        res.json({massage: 'user fetch successfuly', allUsers: users})
    } catch (error) {
        res.json({error})
    }
})

app.post('/register',async (req, res)=>{
    try {//key nu name match thavu joi sequence matter nathi karto
        const{name,email,password,phone} = req.body;
        const users = await user.create({name, email, password, phone})//ahi variable nu name and obj nu name same chhe tethi sidhu name,email aem lakhi nakhyu
        res.json({massage: 'user fetch successfuly', allUsers: users})
    } catch (error) {
        res.json({error})
    }
})

app.patch('/update/:id',async(req,res)=>{
  try{
    const users = await user.findByIdAndUpdate(req.params.id,
      {$set:req.body},
      {new:true}
    )
  if(!users)
  {
    return res.json({message:'user not found'})
  }
  else{
    res.json({message:'updated successfully',updateduser:users})
  }
  }
  catch(err)
  {
    res.json({err})
  }
})

app.get('/user/:id',async(req,res)=>{
  try{
    const users = await user.findById(req.params.id)
    if(!users)
    {
      return res.json({message:'user not found'})
    }
    res.json({message:'successfully get',user:users})
  }
  catch(err)
  {
    res.json({err})
  }
})

app.delete('/delete/:id',async(req,res)=>{
  try{
    const users = await user.findByIdAndDelete(req.params.id)
    if(!users)
    {
      return res.json({message:'user not found'})
    }
    res.json({message:'deleted successfully',deleteduser:users})
  }
  catch(err)
  {
    res.json({err})
  }
})

app.listen(3000, ()=>{
    console.log("server running")
})
