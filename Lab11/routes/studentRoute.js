const student = require('../models/student');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router();

const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.secret,{expiresIn:'1h'});
}

const StuVerfiyToken = require('../middleware/studentMiddlware')

router.get('/students',StuVerfiyToken, async(req, res)=>{
    try {
        const students = await student.find();
        res.json({massage: 'user fetch successfuly', allStu: students})
    } catch (error) {
        res.json({error})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body

        const students=await student.findOne({email})
        if(!students){
            return res.json({message:"user not found"})
        }
        const isPasswordValid=await bcrypt.compare(password,students.password)
        if(!isPasswordValid)
    {
    return res.json({message:"invaid credentials"})
    }
    const token=await generateToken(students.id)
    res.json({message:"student login successfully",token:token})
}
catch(err){
    res.json({err})
}
})


router.post('/register',async (req, res)=>{
    try {
        const{name,email,password,phone} = req.body;
        const hashPassword=await bcrypt.hash(password,10);
        const students = await student.create({name, email, password:hashPassword, phone})//ahi variable nu name and obj nu name same chhe tethi sidhu name,email aem lakhi nakhyu
        res.json({massage: 'user fetch successfuly', allStu: students})
    } catch (error) {
        res.json({error})
    }
})

router.patch('/update/:id',async(req,res)=>{
  try{
    const students = await student.findByIdAndUpdate(req.params.id,
      {$set:req.body},
      {new:true}
    )
  if(!students)
  {
    return res.json({message:'student not found'})
  }
  else{
    res.json({message:'updated successfully',updatedstudent:students})
  }
  }
  catch(err)
  {
    res.json({err})
  }
})

router.get('/student/:id',async(req,res)=>{
  try{
    const students = await student.findById(req.params.id)
    if(!students)
    {
      return res.json({message:'student not found'})
    }
    res.json({message:'successfully get',user:students})
  }
  catch(err)
  {
    res.json({err})
  }
})

router.delete('/delete/:id',async(req,res)=>{
  try{
    const students = await student.findByIdAndDelete(req.params.id)
    if(!students)
    {
      return res.json({message:'student not found'})
    }
    res.json({message:'deleted successfully',deletedstudent:students})
  }
  catch(err)
  {
    res.json({err})
  }
})
module.exports = router;