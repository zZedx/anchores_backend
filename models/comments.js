const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require('./user')

const commentSchema = new Schema({
    comment : {
        type : String,
    },
    // user : {
    //     type:Schema.Types.ObjectId,
    //     ref : User,
    // }
})

const Comment = mongoose.model("Comment" , commentSchema)

module.exports = Comment