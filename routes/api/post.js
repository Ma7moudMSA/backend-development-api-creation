const express = require('express');
const router = express.Router();

// @route       GET /api/posts
// @description Test route for posts (forum posts, comments)
// @access      Public
router.get('/', (req, res) => {
  res.send('post route');
});

module.exports = router;
