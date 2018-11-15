const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../model/user');//needed?

const TaskSchema = new Schema({
    //ID???
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: false
    },
    dateCreated: {
        type: Date,
        required: true 
    },
    dateExpire: {
        type: Date,
        required: false
    }
    
})

module.exports = mongoose.model('Task', TaskSchema);