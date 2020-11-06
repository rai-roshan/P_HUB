const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if (!email || !password) {
        return res.status(422).send({ message: 'You must provide both email and password.' });  // 422 refers to unprocessable entity
    }

    User.findOne({ email: email }, function(err, existingUser) {

        if (err) {
          return next(err);
        }
    
        // If a user with email does exist, return an error
        if (existingUser) {
          return res.status(422).send({ message: 'This email is in use.' });  // 422 refers to unprocessable entity
        }
    
        // If a user with email does NOT exist, create and save user record
        const hashedPass = bcrypt.hashSync(password, 8);
        const user = new User({
          email: email,
          password: hashedPass,
          firstName: firstName,
          lastName: lastName,
        });
    
        user.save(function(err) {  // callback function
          if (err) {
            return next(err);
          }
    
          // Respond user request indicating the user was created
          res.json({ message: 'You have successfully signed up. You can sign in now.' });
        });
      });
};

exports.signin = (req, res, next) => {

    console.log("email : ",req.body.email);
    console.log("pass : ",req.body.password);
    //find user
    User.findOne({ email : req.body.email })
    .then(user=>{
        if(!user)
        return res.status(404).send("User not found");
        

        //check password
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
        
        //create json token
        const token = jwt.sign({ id: user._id} , process.env.SECRET_KEY, {
            expiresIn: 86400 // expires in 24 hours
          });
        res.status(200).send({ auth: true, token: token, username: user.firstName + ' ' + user.lastName});
    })
    .catch(err=>{
        if(err)
        return res.status(500).send(`Error on server ${err}`);
    });
};

exports.verifyJwt = (req, res, next) => {
  const user = req.user;
  const userName = user.firstName + ' ' + user.lastName;

  console.log(`reAuth user ${userName}`)
  res.status(200).send({
    auth : true,
    userName : userName
  });
};