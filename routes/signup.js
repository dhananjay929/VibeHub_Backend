const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator')
const User = require("../models/user.js");
const bcrypt = require('bcrypt');

// router.get("/api",(req,res)=>{
//   res.send("Hello Everryone")
// })
router.post("/signup", [
    // Validate and sanitize fields using express-validator
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map(error => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    try {
        
      // const name = req.body.name;
      // const email = req.body.email;
      const password = req.body.password;
      
      // console.log("dj and harshit");
      // if (!name || !email || !password) {
      //     return res.status(400).json({ error: 'Invalid input. Please provide name, email, and password.' });}
    
       const existingUser = await User.findOne({ email:req.body.email });
       if (existingUser) {
         return res.status(400).json({ errors: ['Email already registered'] });
       }
     
   
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   
   // Create the user
   const newUser = new User({
     name:req.body.name,
     email:req.body.email,
     password: hashedPassword
   });
   
   // Save the user to the database
   await newUser.save();
   
   return res.status(201).json({ message: 'Signup successful' });
} catch (error) {
        console.log(error.message);
}
   })

   module.exports = router;