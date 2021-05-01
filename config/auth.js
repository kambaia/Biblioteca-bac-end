const jwt = require('jsonwebtoken');
const authConfig = require("../config/auth.json");
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Não existe nenhum token' });
  }

  const parts = authHeader.split(' ');

  if (!parts.length === 2) {
    return res.status(401).json({ error: 'Token no seu token' });
  }

  const [scheme, token] = parts;

  if (scheme !== 'Bearer') {
    return res.status(401).json({ error: 'Token mal formatado' });
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token token invádo' });
  }
};