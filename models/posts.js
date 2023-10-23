const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require('./user')
const Comment = require('./comments')

const postSchema = new Schema({
    content : {
        type : String,
    },
    user : {
        type:Schema.Types.ObjectId,
        ref : User,
    },
    comments : [{
        type:Schema.Types.ObjectId,
        ref : Comment,
    }]
})

const Post = mongoose.model("Post", postSchema)

module.exports = Post