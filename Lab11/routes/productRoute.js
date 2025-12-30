const product = require('../models/product');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = require('express').Router();

const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.secret,{expiresIn:'1h'});
}

const ProdVerfiyToken = require('../middleware/facultyMiddlware')

router.get('/products',ProdVerfiyToken, async(req, res)=>{
    try {
        const products = await product.find();
        res.json({massage: 'user fetch successfuly', allProducts: products})
    } catch (error) {
        res.json({error})
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body

        const products=await product.findOne({email})
        if(!products){
            return res.json({message:"user not found"})
        }
        const isPasswordValid=await bcrypt.compare(password,products.password)
        if(!isPasswordValid)
    {
    return res.json({message:"invaid credentials"})
    }
    const token=await generateToken(products.id)
    res.json({message:"user login successfully",token:token})
}
catch(err){
    res.json({err})
}
})


router.post('/add',async (req, res)=>{
    try {
        const{name,email,password,phone} = req.body;
        const hashPassword=await bcrypt.hash(password,10);
        const products = await product.create({name, email, password:hashPassword, phone})//ahi variable nu name and obj nu name same chhe tethi sidhu name,email aem lakhi nakhyu
        res.json({massage: 'user fetch successfuly', allProducts: products})
    } catch (error) {
        res.json({error})
    }
})

router.patch('/update/:id',async(req,res)=>{
  try{
    const products = await product.findByIdAndUpdate(req.params.id,
      {$set:req.body},
      {new:true}
    )
  if(!products)
  {
    return res.json({message:'product not found'})
  }
  else{
    res.json({message:'updated successfully',updatedproduct:products})
  }
  }
  catch(err)
  {
    res.json({err})
  }
})

router.get('/product/:id',async(req,res)=>{
  try{
    const products = await product.findById(req.params.id)
    if(!products)
    {
      return res.json({message:'product not found'})
    }
    res.json({message:'successfully get',user:products})
  }
  catch(err)
  {
    res.json({err})
  }
})

router.delete('/delete/:id',async(req,res)=>{
  try{
    const products = await product.findByIdAndDelete(req.params.id)
    if(!products)
    {
      return res.json({message:'product not found'})
    }
    res.json({message:'deleted successfully',deletedproduct:products})
  }
  catch(err)
  {
    res.json({err})
  }
})
module.exports = router;