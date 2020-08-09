const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
        author : {
            type : mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        title : {
            type : String,
            trim: true,
            required: true
        },
        content : {
            type: String,
            required : true
        },
        upvotes : [{
          upvote : {
              user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                required : true
              } 
          }  
        }],
        downvotes : [{
            downvote : {
                user : {
                  type : mongoose.Schema.Types.ObjectId,
                  ref : 'User',
                  required : true
                } 
            }  
          }],
    },{
        timestamps:true
})
//Ajoute le score d'un post lors du renvoi au client
postSchema.methods.toJSON = function (){
    const post = this
    const postObject = post.toObject()
    postObject.score = postObject.upvotes.length - postObject.downvotes.length
    return postObject
}

const Post = mongoose.model('Post',postSchema)

module.exports = Post