const express = require("express");
const router = express.Router();
const Userpost = require("../models/post.js");
const fetchUser = require("../middleware/fetchUser.js");
const { check, validationResult } = require("express-validator");

router.post('/write',[
  // Validate and sanitize fields using express-validator
  check('title').notEmpty().withMessage('Title is required'),
  check('description').notEmpty().withMessage('Description is required')
],fetchUser,
async (req, res) => {
  
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }
  try {
    const { title, description,tag } = req.body;
    // console.log(req.cookies.authtoken)
    const author = req.user.name; 
    const newPost = new Userpost({title,description,tag,author});
    
    const savedPost = await newPost.save();
    
    // console.log("sab sahi hai")
    return res.status(201).json(savedPost);
    
  } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'An error occurred while creating the post' });
    }
  });
module.exports = router;