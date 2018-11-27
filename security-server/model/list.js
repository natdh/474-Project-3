//mongoose is a form of communication between node and mongo
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');

const ListSchema = new Schema({
  description: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  parent: { 
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

module.exports = mongoose.model('List', ListSchema);
