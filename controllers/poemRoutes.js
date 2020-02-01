const router = require('express').Router();
const Poem = require('../models/Poem');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Desc: Post Write and post a poem
// Address: /api/poems
// Access:   Private
router.route('/').post(auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res
      .status(400)
      .json('You need to be logged in to write and post poems');
  }

  const { title, text, picture } = req.body;

  console.log(req.body);

  const poem = {};

  if (title) {
    poem.title = title;
  }
  if (text) {
    poem.text = text;
  }
  if (picture) {
    poem.picture = picture;
  }

  poem.author = req.user.id;

  console.log(poem);

  const savedPoem = await Poem.create(poem);

  user.poems.unshift(savedPoem);

  await user.save();

  res.status(200).json(savedPoem);
});

// Desc: GET Gets all poems
// Address: /api/poems
// Access:   Public
router.route('/').get(async (req, res) => {
  try {
    const poems = await Poem.find({});

    if (!(poems.length > 0)) {
      throw 'No poems found!';
    }
    console.log(poems);

    res.status(200).json(poems);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

// Desc: GET Gets one poem by id
// Address: /api/poems/:poemId
// Access:   Public
router.route('/:poemId').get(async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.poemId);

    if (!poem) {
      throw 'Poem not found';
    }

    console.log(poem);

    // res.status(200).json(poem);
  } catch (error) {
    console.error(error);
    res.status(400).json('Server error');
  }
});

// Desc: PUT Like a poem
// Address: /api/poems/:poemId
// Access:   Private
router.route('/:poemId').put(auth, async (req, res) => {
  try {
    const user = await findById(req.user.id);

    if (!user) {
      throw 'User not found';
    }
    const poem = await Poem.findById(req.params.poemId);

    if (!poem) {
      throw 'Poem not found';
    }

    console.log(poem);

    // res.status(200).json(poem);
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

module.exports = router;
