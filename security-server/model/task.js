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
    dueDate: {
        type: Date,
        required: false 
    }
},
  {
    timestamps: true,
  })

module.exports = mongoose.model('Task', TaskSchema);