const Post = require('../models/post')

const newPost = async (req,res)=>{
    try{
        const post = new Post({...req.body,author: req.user._id,upvotes: [],downvotes: []})
        await post.save()
        res.status(201).send(post.toJSON())
    }catch(e){
        res.status(400).send(e)
    }
}

const upvote = async (req,res)=>{
    try{
        
        const post = await Post.findById(req.params.id)
        if(!post){
           return  res.status(404).send()
        }
        //A user cannot upvote twice a post
        if(post.upvotes.find((upvote)=>String(upvote.user)===String(req.user._id))){
            return res.status(400).send({e:"Vous avez déjà voté pour ce fun fact"})
        }
        //If a user has downvoted a post than upvoting it should remove the downvote
        else if(post.downvotes.find((downvote)=>String(downvote.user)===String(req.user._id))){
            post.upvotes.push({upvote : {user:req.user._id}})
            post.downvotes.filter((downvote)=>String(downvote.user)!==String(req.user._id))
        }else{
            post.upvotes.push({upvote : {user:req.user._id}})
        }

        await post.save()
        res.status(200).send(post.toJSON())
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
}


const downvote = async (req,res)=>{
    try{
        const post = await Post.findById(req.params.id)
        if(!post){
           return  res.status(404).send()
        }
        //A user cannot downvote twice a post
        if(post.downvotes.find((downvote)=>String(downvote.user)===String(req.user._id))){
            return res.status(400).send({e:"Vous avez déjà voté pour ce fun fact"})
        }
        //If a user has upvoted a post than downvoting it should remove the upvote
        else if(post.upvotes.find((upvote)=>String(upvote.user)===String(req.user._id))){
            post.downvotes.push({downvote : {user:req.user._id}})
            post.upvotes.filter((upvote)=>String(upvote.user)!==String(req.user._id))
        }else{
            post.downvotes.push({downvote : {user:req.user._id}})
        }

        await post.save()
        res.status(200).send(post.toJSON())
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
}

module.exports = {
    newPost,
    upvote,
    downvote
}