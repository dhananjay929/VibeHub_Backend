const express = require('express');
const router = express.Router();
const Userpost = require('../models/post'); 
const fetchUser = require('../middleware/fetchUser'); 


// delete a post
router.delete('/delete/:postId',fetchUser, async (req, res) => {
  
  try {
      const postId = req.body.postId;

    // Check if the post belongs to the logged-in user
    const post = await Userpost.deleteOne( {_id:postId, author: req.user.name} );
    const deleted = post.deletedCount;
    // console.log(deleted)
     if (!deleted) {
      return res.status(404).json({ error: 'This post does not belong to you' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    // console.error('Error deleting post:', error);
    res.status(500).json({ error: 'An error occurred while deleting the post' });
  }
});

module.exports = router;
