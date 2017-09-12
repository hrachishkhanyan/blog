var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
  },
  birthDate: {
    type: String,
    required: true
  },
  address: {
    city:  {
      type: String,
      required: true
    },
    street:   {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('User', userSchema);
