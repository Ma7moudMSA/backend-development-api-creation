const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../../Model/User'); // Adjust the path if necessary

const router = express.Router();

// POST /api/users - Register user with validation, avatar, hashing, and saving
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with six or more characters').isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ errors: [{ message: 'User already exists' }] });
      }

      // Get gravatar for user's email
      const avatar = gravatar.url(email, {
        s: '200',      // Size
        r: 'pg',       // Rating
        d: 'mm'        // Default icon if no gravatar
      });

      // Create new user instance
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password before saving
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user to MongoDB
      await user.save();
      console.log("User saved:", user); 
      // For now, send registration confirmation (JWT next step)
      res.send({ message: 'User registered' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


module.exports = router;
