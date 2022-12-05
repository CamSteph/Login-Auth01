const router = require('express').Router();
const { User } = require('../models/user');
const Joi = require('joi');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    
    // check if email and password are valid
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({message: error.details[0].message})
    }

    // check if user exists in db
    const user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(401).send({message: 'Invalid email or password'});
    }

    // check if entered password matches the one stored in db for this user
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send({message: 'Incorrect password'});
    }

    // generates auth token using schema method assigned in /models/user.js
    const token = user.generateAuthToken();
    res.status(200).send({data: token, message: 'Logged in successfully'});

  } catch (error) {
    return res.status(500).send({
      message: 'Internal Server Error',
      details: error
    });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().label('Email'),
    password: Joi.string().required().label('Password'),
  });
  return schema.validate(data);
};

module.exports = router;