const blogRoutes = require('express').Router();
const Blog = require('../controller/Blog');
const { verifyToken , getUser } = require('../configure/AuthMid');

blogRoutes.get('/', Blog.fetchPosts);
blogRoutes.post('/', verifyToken , getUser , Blog.createPost);
blogRoutes.get('/full/:id', Blog.fetchPost);
blogRoutes.get('/api/allow_edit_or_delete/:id', verifyToken , getUser , Blog.allowUpdateOrDelete);
blogRoutes.put('/:id', verifyToken , getUser , Blog.updatePost);
blogRoutes.delete('/:id', verifyToken , Blog.deletePost);
blogRoutes.get('/my_posts', verifyToken , getUser , Blog.fetchPostsByAuthorId);

module.exports = blogRoutes;