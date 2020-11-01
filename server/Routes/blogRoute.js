const blogRoutes = require('express').Router();
const Blog = require('../controller/Blog');
const { verifyToken , getUser } = require('../configure/AuthMid');

blogRoutes.get('/api/posts', Blog.fetchPosts);
blogRoutes.post('/api/posts', verifyToken , getUser , Blog.createPost);
blogRoutes.get('/api/posts/:id', Blog.fetchPost);
blogRoutes.get('/api/allow_edit_or_delete/:id', verifyToken , getUser , Blog.allowUpdateOrDelete);
blogRoutes.put('/api/posts/:id', verifyToken , getUser , Blog.updatePost);
blogRoutes.delete('/api/posts/:id', verifyToken , Blog.deletePost);
blogRoutes.get('/api/my_posts', verifyToken , getUser , Blog.fetchPostsByAuthorId);

module.exports = blogRoutes;