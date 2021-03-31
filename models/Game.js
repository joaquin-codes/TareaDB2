const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema({
    name: {
        type: String
    },
    score: {
        type: String
    }
})


module.exports = mongoose.model('Score', GameSchema)