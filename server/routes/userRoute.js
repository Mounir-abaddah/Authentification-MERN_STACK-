const express = require('express')
const router = express.Router()

const User = require('../models/userModel')
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken')
const autMiddelware = require('../Middlewares/authMiddlware')


router.post('/register', async (req,res)=>{
try{
    const userExists = await User.findOne({email:req.body.email})
    if(userExists){
    return res.status(200).send({message:"votre email existe déjà",success:false})
    }
    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt);
    req.body.password = hashedPassword
    const newuser = new User(req.body)
    await newuser.save();
    return res.status(200).send({message:"Votre Compte a été creer avec success",success:true})
}catch(error){
    res.status(500).send({message:"Quelque chose ne fonctionne pas",success:false,error})
}
})

router.post('/login',async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            return res.status(200).send({message:"L'utilisateur n'existe pas",succes:false})
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(200).send({message:"le mot de passe ne fonctionne pas",succes:false})
        }else{
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
                expiresIn:"1d"
            })
            res.status(200).send({message:"connexion réussie",success:true,data:token})
        }
    }catch(error){
        console.log(error);
        res.status(500).send({message:"erreur de connexion",success:false,error})
    }

}
)


router.post('/get-user-info-by-id',autMiddelware,async(req,res)=>{
    try{
        const user = await User.findOne({_id:req.body.userId})
        if(!user){
            return res.status(200).send({message:"User does not exists",success:false})
        }else{
            res.status(200).send({success:true,data:{
                name:user.name,
                email:user.email
            }})
        }
    }catch(error){
        res.status(500).send({message:"Error getting user info",success:false,error})
    }
})

module.exports = router
