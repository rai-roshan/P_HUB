const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const postSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title is required']
  },
  categories: [String],
  content: {
    type: String,
    required: [true, "content can't be empty"],
  },  // html
  authorId: {
    type: String,
    required: [true, 'no author attached']
  },
  authorName: {
    type: String,
    required: [true, 'author name is required']
  },
  time: {
    type : Date,
    default : Date.now()
  }
});

// Create the model class
const ModelClass = mongoose.model('post', postSchema);

// Export the model
module.exports = ModelClass;