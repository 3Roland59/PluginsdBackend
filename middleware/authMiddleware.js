const jwt = require('jsonwebtoken');
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization
  // console.log('header',authHeader)
  let token;
  if (!authHeader) {
    res.status(401)
    throw new Error('Access denied. No token provided!')
  }
  if (authHeader.startsWith("Bearer")) {
  token = authHeader.split(' ')[1];
  }
  if (!token) {
    res.status(401)
    throw new Error('Access denied. Invalid token format!')
  }
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded.user;
    console.log('req.user ',req.user)
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = verifyToken;
