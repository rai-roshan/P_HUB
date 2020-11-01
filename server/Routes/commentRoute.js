const commentRoutes = require('express').Router();
const { verifyToken, getUser } = require('../configure/AuthMid');
const Comment = require('../controller/Comment');

commentRoutes.post('/:postId', verifyToken , getUser , Comment.createComment);
commentRoutes.get('/:postId', Comment.fetchCommentsByPostId);

module.exports = commentRoutes;