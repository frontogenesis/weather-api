const mongoose = require('mongoose')
const validator = require('validator')

const Post = mongoose.model('Post', { 
    title: {
        type: String,
        required: true,
        trim: true,
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Post