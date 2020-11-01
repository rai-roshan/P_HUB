const profileRoutes = require('express').Router();
const Profile = require('../controller/Profile');

const { verifyToken , getUser } = require('../configure/AuthMid');

profileRoutes.get('/', verifyToken , Profile.fetchProfile);
profileRoutes.post('/', verifyToken , getUser , Profile.updateProfile);

module.exports = profileRoutes;