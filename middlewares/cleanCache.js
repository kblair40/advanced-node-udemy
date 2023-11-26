const { clearHash } = require("../services/cache");

module.exports = async (req, res, next) => {
  // allow route handler to run first.
  await next();

  // When handler finishes, clear cache
  clearHash(req.user.id);
  console.log("\nCache cleared!");
};
