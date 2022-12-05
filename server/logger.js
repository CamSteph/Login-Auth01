
const LoggerMiddleware = (req,res, next) => {
  // if (!req.property_that_doesnt_exist) return res.status(401).send({msg: 'Not authenticated, broOOOO.'});
  console.log(`Logged: ${req.url} ${req.method} -- ${new Date()}`);
  next();
};

module.exports = LoggerMiddleware;