const multer = require('multer')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')
const path = require('path')


const User = require('../models/user')
const Post = require('../models/post')

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
        const userPosts = await Post.find({author:req.params.id})
        
        let upvotesReceived = 0
        let downvotesReceived = 0
        if(userPosts.length>0){
            for(post of userPosts){
                upvotesReceived += post.upvotes.length
                downvotesReceived += post.downvotes.length
            }
        }
        const formattedFeed = []
        for(feedElement of userPosts){
            const author = await User.findById(feedElement.author)
            if(!author){
                return res.status(404).send()
            }
            const hasBeenUpvoted = feedElement.upvotes.find((upvote)=>String(upvote.upvote.user)===String(req.user._id))
           const hasBeenDownvoted = feedElement.downvotes.find((downvote)=>String(downvote.downvote.user)===String(req.user._id)) 
            formattedFeed.push({...feedElement.toJSON(),author,hasVoted: (!!hasBeenUpvoted || !!hasBeenDownvoted)})
        }
        const averageScore = userPosts.length>0?(upvotesReceived-downvotesReceived)/userPosts.length:0
        const bestScorePost = Math.max.apply(Math, userPosts.map((post)=>post.upvotes.length-post.downvotes.length))
        res.send({...user.toJSON(),userPosts:formattedFeed,upvotesReceived,downvotesReceived,averageScore,bestScorePost})
    }catch(e){
        console.log(e)
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