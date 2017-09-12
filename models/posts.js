var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
  userID: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);
