const User = require("../models/User");
const Portfolio = require("../models/Portfolio");

async function addPofolio(req, res) {
  var portfolio = new Portfolio();
  portfolio.name = req.body.name;
  portfolio.description = req.body.description;
  portfolio.cash = req.body.cash;
  portfolio.value = req.body.cash;
  await portfolio.save();

  const userId = req.jwt.userid;
  const user = await User.findById(userId).populate("portfolios");
  user.portfolios.push(portfolio);
  await user.save();

  return res.json(user);

}


module.exports = {
  addPofolio
};
