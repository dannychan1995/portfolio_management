import React from "react";
import { connect } from "react-redux";
import Messages from "../Messages";
import PortfolioModal from "./PortfolioModal";
import CashInjectionModal from "./CashInjectionModal";
import ValueChart from "./ValueChart";
import { string, object, func } from "prop-types";
import { getPortfolio,addPortfolio } from "../../actions/portfolio";
import OrderModal from '../Market/OrderModal';
import InterestModal from './InterestModal';

class PortfolioDetail extends React.Component {
  static propTypes = {
    messages: object.isRequired,
    token: string.isRequired,
    portfolio: object.isRequired,
  };

  componentDidMount () {
    this.props.dispatch(
      getPortfolio({
        id: this.props.match.params.id,
        token: this.props.token,
      })
    );
  }

  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount(this.props.history);
    }
  }

  handleAddPortfolio(event) {
    event.preventDefault();
    this.props.dispatch(
      addPortfolio({
        name: "test",
        description: "testdesc",
        token: this.props.token
      })
    );
  }

  formatCurrency(amount){
    return new Intl.NumberFormat(Intl.getCanonicalLocales(), {
      style: 'currency',
      currency: 'HKD'
    }).format(amount)
  }

  render() {
    return (
      <div className="container-fluid">

        <Messages messages={this.props.messages} />
        <div className="panel">
          <div className="panel-body">

            <h1>{this.props.portfolio.name}</h1>
            <div className="well"><p>{this.props.portfolio.description}</p></div>
            <legend>Valuation</legend>
            <form className="form-horizontal col-sm-8">

              <div className="form-group">
                <label className="col-sm-3">
                  Cash
                </label>
                <div className="col-sm-7">
                  <input
                    style={{textAlign:"right"}}
                    type="text"
                    name="cash"
                    id="cash"
                    className="form-control"
                    value={this.formatCurrency(this.props.portfolio.cash)}
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="name" className="col-sm-3">
                  Market Value
                </label>
                <div className="col-sm-7">
                  <input
                    style={{textAlign:"right"}}
                    type="text"
                    name="value"
                    id="value"
                    className="form-control"
                    value={this.formatCurrency(this.props.portfolio.value)}
                    disabled
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-sm-offset-3 col-sm-4" style={{display: "flex"}}>
                  <CashInjectionModal/>  <OrderModal portfolioId={this.props.portfolio._id} />

                </div>
              </div>
            </form>
            <div className="col-sm-4" style={{position: "relative", top: -20, borderLeft: "solid 1px #ddd"}}>
              <ValueChart/>
            </div>
            <legend>Positions</legend>
            <table className="table table-striped">
              <thead>
                <tr align="right" style={{fontWeight: 700}}>
                  <td >Type</td>
                  <td >Symbol</td>
                  <td >Last Price</td>
                  <td >Quantity</td>
                  <td >Market Value</td>
                  <td align="center">Operation</td>
                </tr>
              </thead>
              <tbody>
                {this.props.portfolio.positions.filter(p => p.amount!==0).map((p,index) => (
                  <tr align="right" key={p._id} >
                    <td >{p.type}</td>
                    <td >{p.symbol}</td>
                    <td >{this.formatCurrency(p.lastPrice)}</td>
                    <td >{p.amount}</td>
                    <td >{this.formatCurrency(p.amount * p.lastPrice)}</td>
                    <td align="center"><InterestModal position={p} /></td>
                  </tr>
                ))}
                <tr align="right" >
                  <td ></td>
                  <td ></td>
                  <td ></td>
                  <td ><b>Sum: </b></td>
                  <td ><b>{this.formatCurrency(this.props.portfolio.positions.reduce((pre,cur) => pre + cur.amount*cur.lastPrice,0))}</b></td>
                  <td align="center"></td>
                </tr>
              </tbody>


            </table>
            <legend>Transactions</legend>
            <table class="table table-striped">
              <thead>

                <tr align="right" style={{fontWeight: 700}}>
                  <td >Type</td>
                  <td >Action</td>
                  <td >Symbol</td>
                  <td >Price</td>
                  <td >Quantity</td>
                  <td >Market Value</td>
                  <td >Transaction time</td>
                </tr>
              </thead>
              <tbody>
                {this.props.portfolio.transactions.map((p,index) => (
                  <tr align="right" key={p._id}>
                    <td >{p.type}</td>
                    <td >{p.type === "Dividend"? "Dividend" : (p.amount > 0 ? "Long" : "Short")}</td>
                    <td >{p.symbol}</td>
                    <td >{this.formatCurrency(p.price)}</td>
                    <td >{p.amount}</td>
                    <td >{this.formatCurrency(p.amount * p.price)}</td>
                    <td >{ new Date(p.createDate).toLocaleString("en-us", {
                      weekday: "long", year: "numeric", month: "short",
                      day: "numeric", hour: "2-digit", minute: "2-digit"
                    })}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    portfolio: state.portfolio.portfolio,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(PortfolioDetail);
