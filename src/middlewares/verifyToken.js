const jwt = require('jsonwebtoken');
const env = require('../config/envioroment');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};
