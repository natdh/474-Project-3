//mongoose is a form of communication between node and mongo
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt-nodejs');

const ListSchema = new Schema(
  {
    list: {
      
    }
  },
  {
    timestamps: true,
  });

module.exports = mongoose.model('List', ListSchema);
