const { checkRequiredEnvironment } = require("./utils");

checkRequiredEnvironment([
  "MARKET_API_KEY"
]);

module.exports = {
  marketAPIKey: process.env.MARKET_API_KEY
};
