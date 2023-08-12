const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const cookie = require('cookie');
const { JWT_SECRET } = require("../config.js");

router.post(
  "/login",
  [
    // Validate and sanitize fields using express-validator
    check("email").isEmail().withMessage("Invalid email address"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // const email = req.body.email;
      const password = req.body.password;

      // if (!email || !password) {
      // return res.status(400).json({ error: 'Invalid input. Please provide email and password.' });}

      const userExists = await User.findOne({ email: req.body.email });
      if (!userExists) {
        return res
          .status(400)
          .json({ error: "Email is not registered, please register first." });
      }
      const passwordCompare = await bcrypt.compare(
        password,
        userExists.password
      );
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials " });
      }

      const data = {
        user: {
          id: userExists.id,
          name: userExists.name
        }
      };
      const authtoken = jwt.sign(data, JWT_SECRET);

      // res.setCookie('Set-Cookie', cookie.serialize('authtoken', authtoken, {
      //   httpOnly: true,
      //   maxAge: 3600, // 1 hour in seconds
      //   path: '/', // Set the cookie path
      // }));
      
      return res.cookie('authtoken', authtoken, { secure: false,httpOnly: false }).status(200).json({ message: 'Login successful' });
      // console.log(res.cookie)      

    } catch (error) {
      console.log(error.message);
    }
  }
);

module.exports = router;
