const mongoose = require('mongoose')

const BooksSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, minLength: 1, maxLength: 50},
        author: {type: String, required: true, minLength: 1, maxLength: 50},
        year_published: {type: Number, required: true, min: 1900},
        created_at: {type: Date, default: Date.now}, 
        //created at is usually a default value in all databases for audit prposes
    },
    {collection: "books"}
)

//keyNames are usually underscored, common practice for 

module.exports = mongoose.model("Books", BooksSchema)