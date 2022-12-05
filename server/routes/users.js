const router = require('express').Router();
const { User, validateData }= require('../models/user');
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  try {
    const { error } = validateData(req.body);
    if (error) {
      return res.status(400).send({message: error.details[0].message});
    }

    // If email is already in use, then it can't be used again
    const user = await User.findOne({email: req.body.email});
    if (user) {
      return res.status(409).send({message: 'Email already in use.'});
    }

    // hash the inputted password
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({...req.body, password: hashPassword});

    res.status(201).send({message: 'User created successfully'});

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Internal Server Error',
      details: error,
    });

  }
});

module.exports = router;