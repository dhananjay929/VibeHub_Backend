const express = require("express");
const Userpost = require("../models/post");
// const User = require("../models/user");
const router = express.Router();

router.get('/feed', async (req, res) => {
  
  
  try {
    const allPosts = await Userpost.find();
    res.send(allPosts);
    
  } catch (error) {
      console.error('Error loading feed:', error);
      res.status(500).json({ error: 'An error occurred while loading feed' });
    }
  });
module.exports = router;