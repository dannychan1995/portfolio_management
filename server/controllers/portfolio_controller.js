const User = require("../models/User");
const Portfolio = require("../models/Portfolio");
const Position = require("../models/Position");
const Transaction = require("../models/Transaction");

async function addPortfolio(req, res) {
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

async function getPortfolio(req, res) {
  const id = req.params.id;
  const portfolio = await Portfolio.findById(id).populate('positions').populate('transactions');
  return res.status(200).json({ portfolio: portfolio.toJSON() });
}

async function cashInjection(req, res) {
  const id = req.body.portfolioId;
  const amount = req.body.amount;
  const portfolio = await Portfolio.findOneAndUpdate({ _id: id }, {$inc:{cash: amount, value: amount}}, {new: true}).populate('positions').populate('transactions');
  console.log(portfolio);
  return res.status(200).json({ portfolio: portfolio.toJSON() });
}


module.exports = {
  addPortfolio,getPortfolio,cashInjection
};
