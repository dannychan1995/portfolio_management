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

async function makeOrder(req, res) {
  const id = req.body.portfolioId;
  const order = req.body.order;
  var portfolio = await Portfolio.findById(id).populate('positions').populate('transactions');

  //new Transactions
  var transaction = new Transaction({
    symbol : order.symbol,
    type : order.type,
    amount : order.amount,
    price : order.price,
  });

  transaction = await transaction.save();
  portfolio.transactions.push(transaction);

  //new position
  var position = portfolio.positions.find(e => e.symbol === order.symbol);
  if(position){ //found position, modify new position
    position = await Position.findOneAndUpdate({ _id: position._id }, {$inc:{amount: order.amount}, $set:{lastPrice: order.price}}, {new: true});
    portfolio.cash = portfolio.cash - (order.amount * order.price);
    portfolio.value = portfolio.positions.reduce((pre,cur) => {
      let amount = cur.amount;
      if(cur.symbol === order.symbol){

        return pre + position.amount * position.lastPrice;
      }else{
        return pre + cur.amount * cur.lastPrice;
      }
    },0) + portfolio.cash;
    portfolio = await portfolio.save().then(p => p.populate('positions').populate('transactions').execPopulate());

  }else{ //not found position, new one and add to portfolio
    position = await new Position({
      symbol : order.symbol,
      type : order.type,
      amount : order.amount,
      lastPrice : order.price,
    }).save();
    portfolio.positions.push(position);

    //adjust cashInjection
    portfolio.cash = portfolio.cash - (order.amount * order.price);
    portfolio = await portfolio.save().then(p => p.populate('positions').populate('transactions').execPopulate());



  }

  return res.status(200).json({ portfolio: portfolio.toJSON() });
}

async function createDividend(req, res) {
  const {symbol,dividend,amount,newPrice,portfolioId} = req.body;
  var portfolio = await Portfolio.findById(portfolioId).populate('positions').populate('transactions');
  console.log(symbol,dividend,amount,newPrice,portfolioId);
  //new Transactions
  var transaction = new Transaction({
    symbol : symbol,
    type : "Dividend",
    amount : amount,
    price : dividend,
  });

  transaction = await transaction.save();
  portfolio.transactions.push(transaction);

  //new position
  var position = portfolio.positions.find(e => e.symbol === symbol);
  if(position){ //found position, modify new position
    position = await Position.findOneAndUpdate({ _id: position._id }, {$set:{lastPrice: newPrice}}, {new: true});
    portfolio.cash = portfolio.cash + (amount * dividend);
    portfolio.value = portfolio.positions.reduce((pre,cur) => {
      let amount = cur.amount;
      if(cur.symbol === symbol){

        return pre + position.amount * position.lastPrice;
      }else{
        return pre + cur.amount * cur.lastPrice;
      }
    },0) + portfolio.cash;
    portfolio = await portfolio.save().then(p => p.populate('positions').populate('transactions').execPopulate());

  }
  return res.status(200).json({ portfolio: portfolio.toJSON() });
}


module.exports = {
  addPortfolio,getPortfolio,cashInjection,makeOrder,createDividend
};
