const faculty = require('../models/faculty');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router();

const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.secret,{expiresIn:'1h'});
}

const FacVerfiyToken = require('../middleware/facultyMiddlware')

router.get('/faculties',FacVerfiyToken, async(req, res)=>{
    try {
        const faculties = await faculty.find();
        res.json({massage: 'user fetch successfuly', allFac: faculties})
    } catch (error) {
        res.json({error})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body

        const faculties=await faculty.findOne({email})
        if(!faculties){
            return res.json({message:"user not found"})
        }
        const isPasswordValid=await bcrypt.compare(password,faculties.password)
        if(!isPasswordValid)
    {
    return res.json({message:"invaid credentials"})
    }
    const token=await generateToken(faculties.id)
    res.json({message:"user login successfully",token:token})
}
catch(err){
    res.json({err})
}
})


router.post('/register',async (req, res)=>{
    try {
        const{name,email,password,phone} = req.body;
        const hashPassword=await bcrypt.hash(password,10);
        const faculties = await faculty.create({name, email, password:hashPassword, phone})//ahi variable nu name and obj nu name same chhe tethi sidhu name,email aem lakhi nakhyu
        res.json({massage: 'user fetch successfuly', allFac: faculties})
    } catch (error) {
        res.json({error})
    }
})

router.patch('/update/:id',async(req,res)=>{
  try{
    const faculties = await faculty.findByIdAndUpdate(req.params.id,
      {$set:req.body},
      {new:true}
    )
  if(!faculties)
  {
    return res.json({message:'faculty not found'})
  }
  else{
    res.json({message:'updated successfully',updatedfaculty:faculties})
  }
  }
  catch(err)
  {
    res.json({err})
  }
})

router.get('/faculty/:id',async(req,res)=>{
  try{
    const faculties = await faculty.findById(req.params.id)
    if(!faculties)
    {
      return res.json({message:'faculty not found'})
    }
    res.json({message:'successfully get',user:faculties})
  }
  catch(err)
  {
    res.json({err})
  }
})

router.delete('/delete/:id',async(req,res)=>{
  try{
    const faculties = await faculty.findByIdAndDelete(req.params.id)
    if(!faculties)
    {
      return res.json({message:'faculty not found'})
    }
    res.json({message:'deleted successfully',deletedfaculty:faculties})
  }
  catch(err)
  {
    res.json({err})
  }
})
module.exports = router;