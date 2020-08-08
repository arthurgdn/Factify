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
        score : {
            type:Number,
            required: true
        }
    },{
        timestamps:true
})

const Post = mongoose.model('Post',postSchema)

module.exports = Post