const jwt = require('jsonwebtoken');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: `Failed to authenticate token ${err}` });
    
    req.userId = decoded.id;
    next();
    });
};

const getUser = (req, res, next) => {
    User.findById(req.userId)
    .then(user=>{
        if (!user) return res.status(404).send("No user found.");
        req.user = user;
        next();
    })
    .catch(err=>{
        if (err) return res.status(500).send("There was a problem finding the user.");
    });
};

module.exports = {
    verifyToken,
    getUser 
};