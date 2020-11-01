const Comment = require('../models/comment');

exports.createComment = function(req, res, next) {

    // Require auth
    const user = req.user;
  
    if (!user) {
      return res.status(422).json({
        message: 'You must sign in before you can post new comment.'
      });
    }
  
    // Get post ID
    const postId = req.params.postId;
  
    // Get content and make sure it is not empty
    const content = req.body.content;
    if (!content) {
      return res.status(422).json({
        message: 'Comment cannot be empty.'
      });
    }
  
    // Create a new comment
    const comment = new Comment({
      content: content,
      authorId: user._id,
      authorName: user.firstName + ' ' + user.lastName,
      postId: postId,
      time: Date.now(),
    });
  
    // Save the comment
    comment.save(function(err, comment) {  // callback function
      if (err) {
        return next(err);
      }
      res.json(comment);  // return the created comment
    });
  };
  
exports.fetchCommentsByPostId = function(req, res, next) {
    Comment
      .find({
        postId: req.params.postId
      })
      .select({})
      .limit(100)
      .sort({
        time: 1
      })
      .exec(function(err, comments) {
        if (err) {
          console.log(err);
          return res.status(422).json({
            message: 'Error! Could not retrieve comments.'
          });
        }
        res.json(comments);
      });
  };