const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const commentSchema = new Schema({
  content: {
    type: String ,
    required: [true, 'content cant be empty']
    },  // html
  authorId: {
    type: String,
    required: [true, 'author is not linked']
  },
  authorName: {
    type: String,
    required : [true, 'author not found']
  },
  postId: {
    type: String,
    required: [true, 'post id not found']
  },
  time: Date,
});

// Create the model class
const ModelClass = mongoose.model('comment', commentSchema);

// Export the model
module.exports = ModelClass;