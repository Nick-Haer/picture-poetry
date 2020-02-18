const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const token = req.header('x-auth-token');
  console.log('headers');
  console.log(req.header);
  console.log(token);

  try {
    const decodedToken = await jwt.verify(token, process.env.jwtSecret);
    console.log('hit');
    console.log('token is ' + decodedToken);
    req.user = decodedToken.user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json('Could not verify login');
  }
};

module.exports = verifyToken;
