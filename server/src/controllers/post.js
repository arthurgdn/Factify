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

module.exports = {
    newPost
}