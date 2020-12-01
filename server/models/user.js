const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  email: { 
    type: String, 
    unique: true, 
    lowercase: true,
    required: [true, 'email is required'] ,
    validate: {
      validator : (v) => {
          return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v));
      },
      message: props => `${props.value} is not a valid email format!`
    }
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minlength: [4, 'minimum password length is 4'] 
  },
  firstName: {
    type: String,
    required: [true, 'first name required']
  },
  lastName: {
    type: String,
    required: [true, 'last name required']
  },
  birthday: { type: String, default: '' },
  sex: { type: String, default: '' },  // secrecy/male/female
  phone: { 
    type: String, 
    default: '' 
  },
  address: { type: String, default: '' },
  occupation: { type: String, default: '' },
  description: { type: String, default: '' },
});

module.exports = mongoose.model('user' , userSchema);