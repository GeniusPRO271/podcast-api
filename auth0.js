const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const validateJwt = (req, res, next) => {
  const client = jwksClient({
    jwksUri: process.env.JWT_JWKS_URI,
  });

  const { header } = req;
  const { kid } = header;

  client.getSigningKey(kid, (err, key) => {
    if (err) {
      console.error(err);
      res.status(401).send('Unauthorized');
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey;
      jwt.verify(
        req.token,
        signingKey,
        { algorithms: ['RS256'] },
        (err, decoded) => {
          if (err) {
            console.error(err);
            res.status(401).send('Unauthorized');
          } else {
            req.user = decoded;
            next();
          }
        }
      );
    }
  });
};

module.exports = validateJwt;
