const multer = require('multer')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')
const path = require('path')


const User = require('../models/user')

const signup = async (req, res) => {
    
    const user = new User({...req.body})
    try{
        const anonymousPath = path.join(__dirname,'../../avatars/anonymous.png')
    
        const buffer =await  sharp(anonymousPath).toBuffer()
        user.profilePicture = buffer
        const token = await user.generateAuthToken()
        await user.save()
        
        res.status(201).send({user:user.toJSON(),token})
    }catch(e){
        
        res.status(400).send(e)
    }
    
}

const getUser = async (req,res)=>{
    try{
        res.send(req.user.toJSON())
    }catch(e){
        res.status(400).send(e)
    }
    
}

const getSpecificUser = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch(e){
        res.status(400).send(e)
    }
}
const login = async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user:user.toJSON(),token})
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
}

//Deal with avatar image upload
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

const uploadImage = async (req,res)=>{
    
    const buffer = await sharp(req.file.buffer).resize({width : 250,height : 250}).png().toBuffer() //client side can resize the image instead of doing it when upload on server side
    req.user.profilePicture = buffer
    await req.user.save()
    res.send()
}

const getUserImage = async (req,res)=>{
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
}

const logout = async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>token.token !== req.token)
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
}

const deleteUser = async (req,res)=>{
     
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
}

module.exports = {
    signup,
    getUser,
    getSpecificUser,
    login,
    upload,
    uploadImage,
    getUserImage,
    logout,
    deleteUser

}