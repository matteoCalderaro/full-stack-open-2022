const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        minLength:5
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    username : String,
    blog : {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    },
})

commentSchema.set('toJSON',{
    transform: (document, returnedDocument) => {
        returnedDocument.id = returnedDocument._id.toString()
        delete returnedDocument._id
        delete returnedDocument.__v
    }
})

module.exports = mongoose.model('Comment', commentSchema)