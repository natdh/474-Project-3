//mongoose is a form of communication between node and mongo
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');

const ListSchema = new Schema({
  desc: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  paren: { 
    type: String,
    required: false
  },
  tasks: {
    type: Array,
    required: false
  }
},
  {
    timestamps: true,
  });
  
ListSchema.methods.toJson = function () {
  return {
    _id: this._id,
    description: this.desc,
    name: this.name,
    tasks: this.tasks
  }
}

module.exports = mongoose.model('List', ListSchema);
