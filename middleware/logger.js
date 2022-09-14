const logger = (req, res, next) => {
  console.log("my first middleware!");
  next();
};

module.exports = logger;
