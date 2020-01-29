const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.header['x-auth-token'];

  try {
    const userId = await jwt.verify(token, process.env.jwtSecret);
    req.user = { id: userId };
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).send('Could not verify login');
  }
};

module.exports = verifyToken;
