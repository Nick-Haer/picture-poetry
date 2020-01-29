const router = require('express').Router();
const poemRoutes = require('./poemRoutes');
const userRoutes = require('./userRoutes');

router.use('/api/poems', poemRoutes);
router.use('/api/users', userRoutes);

module.exports = router;

// Routes needed

// signup

// login

//delete account

//like a poem

//unlike a poem

//save a poem to saved

//remove a poem from saved

// post a written poem

// get all poems

//get a poem by id

//retrieve all saved poems
