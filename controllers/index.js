const router = require('express').Router();
const poemRoutes = require('./poemRoutes');
const userRoutes = require('./userRoutes');

//all routes intended for writing, saving, posting, and deleting poetry
router.use('/api/poems', poemRoutes);
//all routes intended for account creation and login
router.use('/api/users', userRoutes);

module.exports = router;