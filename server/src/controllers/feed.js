const Post = require('../models/post')
const User = require('../models/user')

// GET /feed/main?limit=10
const mainFeed = async (req,res) =>{
    try{
        const limit = req.query.limit?req.query.limit:20
        const fetchedFeed = await Post.find().sort({ createdAt: -1 }).limit(limit)
        const mainFeed = fetchedFeed.filter((post)=>{
            const hasBeenUpvoted = post.upvotes.find((upvote)=>String(upvote.upvote.user)===String(req.user._id))
            const hasBeenDownvoted = post.downvotes.find((downvote)=>String(downvote.downvote.user)===String(req.user._id))
            return !hasBeenUpvoted && !hasBeenDownvoted && String(post.author!==req.user._id)
        })
        const formattedFeed = []
        for(feedElement of mainFeed){
            const author = await User.findById(feedElement.author)
            if(!author){
                return res.status(404).send()
            }
            formattedFeed.push({...feedElement.toJSON(),author})
        }
        res.send(formattedFeed)
    }catch(e){
        res.status(400).send(e)
    }
}

const popularFeed = async (req,res)=>{
    try{
        const sevenDays = (3600*24*1000)*7
        const limit = req.query.limit?req.query.limit:20
        const fetchedFeed = await Post
            .find({ "createdAt": { "$gte": (new Date()).getTime() - sevenDays}})
            .limit(limit)
        
         fetchedFeed.sort((a,b)=>(a.upvotes.length-a.downvotes.length) - (b.upvotes.length-b.downvotes.length)< 0 ? 1:-1)
         const formattedFeed = []
         for(feedElement of fetchedFeed){
             const author = await User.findById(feedElement.author)
             if(!author){
                 return res.status(404).send()
             } 
             const hasBeenUpvoted = feedElement.upvotes.find((upvote)=>String(upvote.upvote.user)===String(req.user._id))
            const hasBeenDownvoted = feedElement.downvotes.find((downvote)=>String(downvote.downvote.user)===String(req.user._id)) 
             formattedFeed.push({...feedElement.toJSON(),author,hasVoted: (!!hasBeenUpvoted || !!hasBeenDownvoted)})
         }
         console.log('formatted',formattedFeed)
         
         res.send(formattedFeed)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
}

module.exports = {
    mainFeed,
    popularFeed
}