const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Post = require('../models/post');
const Comment = require('../models/comment');

exports.fetchProfile = (req, res, next) => {
  
    User.findById(req.userId,{ password : 0, __v: 0 }, (err, user) => {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        res.status(200).send(user);
      });
};

exports.updateProfile = (req, res, next) => {

  // Require auth
  //let user = null;
  console.log("user ID : ", req.userId);
  console.log("user : ", req.user);

  const firstName = req.body.firstName ? req.body.firstName : req.user.firstName;
    const lastName = req.body.lastName ? req.body.lastName : req.user.lastName;
    const email = req.body.email ? req.body.email : req.user.email;
    const birthday = req.body.birthday ? req.body.birthday : req.user.birthday;
    const sex = req.body.sex ? req.body.sex : req.user.sex;
    const phone = req.body.phone ? req.body.phone : req.user.phone;
    const address = req.body.address ? req.body.address : req.user.address;
    const occupation = req.body.occupation ? req.body.occupation : req.user.occupation;
    const description = req.body.description ? req.body.description : req.user.description;
  
    
  
    // Update author name for post (updateMany(): MongoDB will update all documents that match criteria)
    Post.updateMany({ authorId: req.user._id }, { $set: { authorName: firstName + ' ' + lastName }}, function(err) {
      if (err) {
        next(err);
      }
    });
  
    // Update author name for comment (updateMany(): MongoDB will update all documents that match criteria)
    Comment.updateMany({ authorId: req.user._id }, { $set: { authorName: firstName + ' ' + lastName }}, function(err) {
      if (err) {
        next(err);
      }
    });
  
    // Update user profile
    User.findByIdAndUpdate(req.user._id, { $set: {
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      sex: sex,
      email: email,
      phone: phone,
      address: address,
      occupation: occupation,
      description: description,
    } }, { new: true }, function(err, updatedUser) {
      if (err) {
        return next(err);
      }
      // Delete unused properties: _id, password, __v
      updatedUser = updatedUser.toObject();
      delete updatedUser['_id'];
      delete updatedUser['password'];
      delete updatedUser['__v'];
      // Return updated user profile
      res.send({ user: updatedUser });
    });
  }
  /*User.findById(req.userId,{ password : 0, __v: 0 }, (err, userDB) => {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");

    user = userDB;
  });  */
  /*
  User.findById(req.userId,{ password : 0, __v: 0 })
  .then(user=>{
    if (!user) return res.status(404).send("No user found.");
    console.log("user : ", user);
    // Get new profile info (user input)
    const firstName = req.body.firstName ? req.body.firstName : user.firstName;
    const lastName = req.body.lastName ? req.body.lastName : user.lastName;
    const birthday = req.body.birthday ? req.body.birthday : user.birthday;
    const sex = req.body.sex ? req.body.sex : user.sex;
    const phone = req.body.phone ? req.body.phone : user.phone;
    const address = req.body.address ? req.body.address : user.address;
    const occupation = req.body.occupation ? req.body.occupation : user.occupation;
    const description = req.body.description ? req.body.description : user.description;
  
    
  
    // Update author name for post (updateMany(): MongoDB will update all documents that match criteria)
    Post.updateMany({ authorId: user._id }, { $set: { authorName: firstName + ' ' + lastName }}, function(err) {
      if (err) {
        next(err);
      }
    });
  
    // Update author name for comment (updateMany(): MongoDB will update all documents that match criteria)
    Comment.updateMany({ authorId: user._id }, { $set: { authorName: firstName + ' ' + lastName }}, function(err) {
      if (err) {
        next(err);
      }
    });
  
    // Update user profile
    User.findByIdAndUpdate(user._id, { $set: {
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      sex: sex,
      phone: phone,
      address: address,
      occupation: occupation,
      description: description,
    } }, { new: true }, function(err, updatedUser) {
      if (err) {
        return next(err);
      }
      // Delete unused properties: _id, password, __v
      updatedUser = updatedUser.toObject();
      delete updatedUser['_id'];
      delete updatedUser['password'];
      delete updatedUser['__v'];
      // Return updated user profile
      res.send({ user: updatedUser });
    });
  })
  .catch(err=>{
    if (err) return res.status(500).send("There was a problem finding the user.");
  });

 */