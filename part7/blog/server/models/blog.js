const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: String,
    url: {
        type: String,
        //required: true
    },
    likes: Number,
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isLikedBy : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    
})

blogSchema.set('toJSON',{
    transform: (document, returnedDocument) => {
        returnedDocument.id = returnedDocument._id.toString()
        delete returnedDocument._id
        delete returnedDocument.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)