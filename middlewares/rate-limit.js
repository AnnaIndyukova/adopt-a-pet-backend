const { rateLimit } = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 min
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

module.exports = limiter;
