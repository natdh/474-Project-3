const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const TaskSchema = new Schema({
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
  
    
TaskSchema.methods.toJson = function () {
  return {
    _id: this._id,
    details: this.details,
    name: this.name,
    dueDate: this.dueDate
  }
}

module.exports = mongoose.model('Task', TaskSchema);