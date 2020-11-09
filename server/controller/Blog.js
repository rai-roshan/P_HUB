const Post = require('../models/post');
const Comment = require('../models/comment');
let _ = require('lodash');
 
exports.fetchPosts = function(req, res, next) {
    Post
      .find({})
      .select({})
      .limit(12)
      .sort({
        time: -1
      })
      .exec(function(err, posts) {
        if (err) {
          console.log(err);
          return res.status(422).json({
            message: 'Error! Could not retrieve posts.'
          });
        }
        res.json(posts);
      });
  };

  exports.createPost = function(req, res, next) {

    // Require auth
    const user = req.user;
  
    const title = req.body.title;
    const categories = req.body.categories;
    const content = req.body.content;
    const authorId = user._id;
    const authorName = user.firstName + ' ' + user.lastName;
    const time = Date.now();
  
    // Make sure title, categories and content are not empty
    if (!title || !categories || !content) {
      return res.status(422).json({
        message: 'Title, categories and content are all required.'
      });
    }
  
    // Create a new post
    const post = new Post({
      title: title,
      categories: _.uniq(categories.split(',').map((item) => item.trim())),  // remove leading and trailing spaces, remove duplicate categories
      content: content,
      authorId: authorId,
      authorName: authorName,
      time: time,
    });
  
    // Save the post
    post.save(function(err, post) {  // callback function
      if (err) {
        return next(err);
      }
      res.json(post);  // return the created post
    });
  };

  exports.fetchPost = function(req, res, next) {
    Post.findById({
      _id: req.params.id
    }, function(err, post) {
      if (err) {
        console.log(err);
        return res.status(422).json({
          message: 'Error! Could not retrieve the post with the given post ID.'
        });
      }
      if (!post) {
        return res.status(404).json({
          message: 'Error! The post with the given ID is not exist.'
        });
      }
      res.json(post);  // return the single blog post
    });
  };

  exports.allowUpdateOrDelete = function(req, res, next) {

    // Require auth
    const user = req.user;
  
    // Find the post by post ID
    Post.findById({
      _id: req.params.id
    }, function(err, post) {
  
      if (err) {
        console.log(err);
        return res.status(422).json({
          message: 'Error! Could not retrieve the post with the given post ID.'
        });
      }
  
      // Check if the post exist
      if (!post) {
        return res.status(404).json({
          message: 'Error! The post with the given ID is not exist.'
        });
      }
  
      console.log(user._id);
      console.log(post.authorId);
  
      // Check if the user ID is equal to the author ID
      if (!user._id.equals(post.authorId)) {
        return res.send({allowChange: false});
      }
      res.send({allowChange: true});
    });
  };

exports.updatePost = function(req, res, next) {

    // Require auth
    const user = req.user;
  
    // Find the post by post ID
    Post.findById({
      _id: req.params.id
    }, function(err, post) {
  
      if (err) {
        console.log(err);
        return res.status(422).json({
          message: 'Error! Could not retrieve the post with the given post ID.'
        });
      }
  
      // Check if the post exist
      if (!post) {
        return res.status(404).json({
          message: 'Error! The post with the given ID is not exist.'
        });
      }
  
      // Make sure the user ID is equal to the author ID (Cause only the author can edit the post)
      // console.log(user._id);
      // console.log(post.authorId);
      if (!user._id.equals(post.authorId)) {
        return res.status(422).json({
          message: 'Error! You have no authority to modify this post.'
        });
      }
  
      // Make sure title, categories and content are not empty
      const title = req.body.title;
      const categories = req.body.categories;
      const content = req.body.content;
  
      if (!title || !categories || !content) {
        return res.status(422).json({
          message: 'Title, categories and content are all required.'
        });
      }
  
      // Update user
      post.title = title;
      post.categories = _.uniq(categories.split(',').map((item) => item.trim())),  // remove leading and trailing spaces, remove duplicate categories;
      post.content = content;
  
      // Save user
      post.save(function(err, post) {  // callback function
        if (err) {
          return next(err);
        }
        res.json(post);  // return the updated post
      });
    });
  };
  
  exports.deletePost = function(req, res, next) {

    // Require auth
  
    // Delete the post
    Post.findByIdAndRemove(req.params.id, function(err, post) {
      if (err) {
        return next(err);
      }
      if (!post) {
        return res.status(422).json({
          message: 'Error! The post with the given ID is not exist.'
        });
      }
  
      // Delete comments correspond to this post
      Comment.remove({ postId: post._id }, function(err) {
        if (err) {
          return next(err);
        }
      });
  
      // Return a success message
      res.json({
        message: 'The post has been deleted successfully!'
      });
    });
  };

  exports.fetchPostsByAuthorId = function(req, res, next) {

    // Require auth
    const user = req.user;
    //console.log("=================user : ", user);
    // Fetch posts by author ID
    Post
      .find({
        authorId: user._id
      })
      .select({})
      .limit(12)
      .sort({
        time: -1
      })
      .exec(function(err, posts) {
        if (err) {
          console.log(err);
          return res.status(422).json({
            message: 'Error! Could not retrieve posts. rai'
          });
        }
        res.json(posts);
      });
  };
  