const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const UserSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
});

UserSchema.methods.generateAuthToken = () => {
  const token = jwt.sign({_id: this._id}, process.env.JWT_PRIVATE_KEY, {expiresIn: '7d'});
  return token;
};

const User = mongoose.model('user', UserSchema);

const validateData = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    firstName: Joi.string().required().label('Last Name'),
    firstName: Joi.string().email().required().label('Email'),
    firstName: passwordComplexity().required().label('Password'),
  });
  return schema.validate(data);
};

module.exports = {User, validateData};