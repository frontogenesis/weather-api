const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { 
    title: 'The Wet Microburst API',
    body: 'Some day this will look incredible. Today is not that day.'
  });
});

module.exports = router;