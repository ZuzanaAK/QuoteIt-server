const mongoose = require('mongoose');

let QuoteSchema = new mongoose.Schema({
    quote: {
        type: String
    },
    author: {
        type: String
    },
    category: {
        type: String,
        // enum: ['article', 'book', 'movie', 'person', 'other'],
    },
    // // image: {
    // //     type: String,
    // // },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

let QuoteModel = mongoose.model('quote', QuoteSchema)

module.exports = QuoteModel;