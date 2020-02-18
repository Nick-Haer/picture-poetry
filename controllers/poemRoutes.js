const router = require('express').Router();
const Poem = require('../models/Poem');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Desc: Post Write and post a poem
// Address: /api/poems
// Access:   Private
router.route('/').post(auth, async (req, res) => {
  try {
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

    console.log(savedPoem);

    user.myPoems.unshift(savedPoem);

    await user.save();

    res.status(200).json(savedPoem);
  } catch (error) {
    console.log(error);
    if (error) {
      res.json('Server Error');
    }
  }
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
    // console.log(poems);

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

// Desc: PUT Like or unlike a poem
// Address: /api/poems/:poemId
// Access:   Private
router.route('/:poemId').put(auth, async (req, res) => {
  try {
    const poem = await Poem.findById(req.params.poemId);

    if (!poem) {
      throw 'Poem not found';
    }

    if (poem.likes.find(like => like.user.toString() == req.user.id)) {
      const index = poem.likes.findIndex(
        like => like.user.toString() == req.user.id
      );
      poem.likes.splice(index, 1);
    } else {
      poem.likes.unshift(req.user.id);
    }

    console.log(poem);

    await poem.save();

    res.status(200).json('liked');
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});

router.get('/savedPoems', auth, async (req, res) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return res
      .status(400)
      .json('You need to be logged in to write and post poems');
  }
});

router.get('/myPoems', auth, async (req, res) => {});

// Desc: PUT Unlike a poem
// Address: /api/poems/:poemId
// Access:   Private
// router.route('/:poemId').put(auth, async (req, res) => {
//   try {
//     const poem = await Poem.findById(req.params.poemId);

//     if (!poem) {
//       throw 'Poem not found';
//     }

//     poem.likes.unshift(req.user.id);

//     console.log(poem);

//     await poem.save();

//     res.status(200).json('liked');
//   } catch (error) {
//     console.error(error);
//     res.status(400).json(error);
//   }
// });

router.put('/save/:poemId', auth, async (req, res) => {
  try {
    console.log('hit');
    const user = await User.findById(req.user.id);
    console.log(user.savedPoems);
    user.savedPoems.unshift(req.params.poemId);
    await user.save();
    res.status(200).json('Poem Saved Succesfully');
  } catch (error) {
    console.log(error);
    res.status(400).json('Server Error');
  }
});

module.exports = router;
