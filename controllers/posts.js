const router = require('express').Router();

router.route('/').get((req, res) => {
  res.json('route working!');
});
