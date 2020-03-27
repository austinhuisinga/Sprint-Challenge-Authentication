const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./auth-model');
const { jwtSecret } = require('../config/secrets');

router.post('/register', (req, res) => {
  // implement registration
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Users.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ message: 'User registration failed' })
    })
});

router.post('/login', (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({  username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    })
    .catch(({ name, code, message, stack }) => {
      res.status(500).json({ name, code, message, stack })
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
