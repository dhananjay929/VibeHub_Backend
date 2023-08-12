const express = require('express');
const router = express.Router();
const Userpost = require('../models/post'); 
const fetchUser = require('../middleware/fetchUser'); 


// Edit a post
router.put('/edit/:postId',fetchUser, async (req, res) => {
 

  try {
    // console.log(req.body)
    const { postId,title, description, tag } = req.body;
    const name = req.user.name;
    // console.log(req.user)
    
    // console.log({_id:postId, author:name})

    // Check if the post belongs to the logged-in user
    const post = await Userpost.findOne( {_id:postId, author:name} );
    // console.log(post)
    
    if (!post) {
      return res.status(404).json({ error: 'This post does not belong to you' });
    }

    post.title = title;
    post.description = description;
    post.tag = tag || 'vibes';

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error editing post:', error);
    res.status(500).json({ error: 'An error occurred while editing the post' });
  }
});

module.exports = router;
