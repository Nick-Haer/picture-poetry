const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.header('x-auth-token');

  try {
    const decodedToken = await jwt.verify(token, process.env.jwtSecret);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json('Could not verify login');
  }
};

module.exports = verifyToken;
