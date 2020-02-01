const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Desc: POST Creates Account with User Data
// Address: /api/users
// Access:   Public

router.post(
  '/',
  //validate user inputs
  [
    check('username').isAlphanumeric(),
    check('email').isEmail(),
    check('password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return console.error(errors.array());
    }

    let { username, email, password } = req.body;

    try {
      const userFound = await User.find({ email });
      //check if the user has already signed up
      if (userFound.length !== 0) {
        return res
          .status(400)
          .json('An account with that email already exists');
      }
      //encrypt password, then create user
      password = await bcrypt.hash(password, 10);

      const user = await User.create({ username, email, password });

      const jwtSecret = process.env.jwtSecret;

      const token = jwt.sign({ user: { id: user.id } }, jwtSecret);

      res.status(200).json({ user, token });
    } catch (error) {
      console.error(error);
      return res.status(400).send('Server error');
    }
  }
);

// Desc: POST Logs in Account with User Data
// Address: /api/users/login
// Access:   Public

router.post(
  '/login',
  [check('username').isAlphanumeric(), check('password').isLength({ min: 5 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return console.error(errors.array());
    }

    const { email, password } = req.body;

    try {
      const userFound = await User.find({ email });

      //check if the user exists
      if (!(userFound.length > 0)) {
        return res
          .status(400)
          .json("Sorry, couldn't find an account with that email");
      }

      const user = userFound.pop();

      const rightAcoount = await bcrypt.compare(password, user.password);

      if (rightAcoount) {
        const jwtSecret = process.env.jwtSecret;
        console.log(user.id);

        console.log(jwtSecret);

        const token = jwt.sign({ user: { id: user.id } }, jwtSecret);

        return res.status(200).json({ token });
      }
    } catch (error) {
      console.error(error);
      res.status(200).json('Server error');
    }
  }
);

// Desc: DELETE Deletes user, given the correct json token
// Address: /api/users
// Access:   Private

router.delete('/', auth, async (req, res) => {
  try {
    console.log('token is ' + req.user.id);

    const user = await User.findById(req.user.id);

    await user.remove();

    res.status(200).json('User deleted');
  } catch (error) {
    console.log(error);

    res.status(400).json(error);
  }
});
//in progress
// Desc: GET Gets all saved poems given profile id
// Address: /api/users/all
// Access:   Private
router.route('/all').get(async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(400).json('Sorry, profile not logged in');
    }

    if (!(savedPoems.length > 0)) {
      return res.status(400).json('No saved poems');
    }

    res.status(200).json(savedPoems);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
