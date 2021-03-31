const mongoose = require('mongoose');

var SkateboardSchema = new mongoose.Schema({

    Style: {
        type: String,
        required: 'This field is required!'
    },
    Brand: {
        type: String
    },
    Length: {
        type: String
    },
    Material: {
        type: String
    },
    Picture: {
        type: String
    },
});

var Crud = mongoose.model('Crud', SkateboardSchema);
module.exports = { Crud };