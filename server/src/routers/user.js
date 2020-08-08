const express = require('express')
const multer = require('multer')
const path = require('path')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')

const User = require('../models/user')


const router = new express.Router()



//API to signup on the platform
router.post('/users', async (req, res) => {
    
    const user = new User({...req.body})
    try{
        const token = await user.generateAuthToken()
        await user.save()
        
        res.status(201).send({user:user.toJSON(),token})
    }catch(e){
        
        res.status(400).send(e)
    }
    
})

router.get('/users/me',auth,async (req,res)=>{
    try{
        res.send(req.user.toJSON())
    }catch(e){
        res.status(400).send(e)
    }
    
})

//API to login
router.post('/users/login',async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user:user.toJSON(),token})
    }catch(e){
        
        res.status(400).send(e)
    }
})
 //API to deal with avatar

 const upload =multer({
    limits:{
        fileSize:5000000,
        
    },
    fileFilter(req,file,callback){
        if (!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|gif|GIF)$/)){
            return callback(new Error('Please upload an image'))
        }
        
        callback(undefined,true)

    }
})

router.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res)=>{
    
    const buffer = await sharp(req.file.buffer).resize({width : 250,height : 250}).png().toBuffer() //client side can resize the image instead of doing it when upload on server side
    req.user.profilePicture = buffer
    await req.user.save()
    res.send()
},(error,req,res,next)=>{
    
    res.status(400).send({error: error.message})
})
//Recuperer la photo d'un utilisateur
router.get('/users/:id/avatar',async (req,res)=>{
    try{
        
        const user = await User.findById(req.params.id)
        
        if(!user || !user.profilePicture){
            
            return res.status(404).send()
        }
        res.set('Content-Type','image/jpg')
        
        res.send(user.profilePicture)


    }catch(e){
        res.status(404).send()
    }
})
//API to logout

router.post('/users/logout',auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>token.token !== req.token)
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

//API to logout of all sessions 
router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

//API to delete account
router.post('/users/me/delete',auth, async (req,res)=>{
     
    try {
        
        const passwordValidate = await bcrypt.compare(req.body.password,req.user.password)
        
        if(!passwordValidate){
            return res.status(400).send({error:'Unable to delete account '})
        }
        const email = req.user.email
        const name = req.user.firstName
        await req.user.remove()
        res.send(req.user)
    }
    catch(e){
        
        res.status(400).send(e)
    }
})

module.exports = router


