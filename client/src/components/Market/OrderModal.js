import React from "react";
import { connect } from "react-redux";
import Messages from "../Messages";
import { string, object, func } from "prop-types";
import { getPortfolio, makeOrder } from "../../actions/portfolio";

class OrderModal extends React.Component {
  static propTypes = {
    portfolio: object.isRequired,
    token: string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      price: this.props.price ? this.props.price : 1,
      symbol: this.props.symbol ? this.props.symbol : "",
      amount: "",
      type: "Stock",
      action: "1"
    };
    this.types = ["Stock", "Bond", "Fund"];
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.price !== this.props.price)
      this.setState({price:this.props.price});
    if(prevProps.symbol !== this.props.symbol)
      this.setState({symbol:this.props.symbol});
  }

  handleOrder(event) {
    event.preventDefault();
    this.props.dispatch(
      makeOrder({
        order: {
          symbol: this.state.symbol,
          type: this.state.type,
          amount: this.state.amount * this.state.action,
          price: this.state.price,
        },
        portfolioId: this.props.portfolio._id,
        token: this.props.token
      })
    );
  }
  getPortfolio(event){
    event.preventDefault();
    this.props.dispatch(
      getPortfolio({
        id: this.props.portfolioId,
        token: this.props.token,
      })
    );
  }



  render() {
    return (
      <div>
        <button type="button" onClick={this.getPortfolio.bind(this)} className="btn btn-primary btn-lg" data-toggle="modal" data-target="#OrderModal" className="btn btn-primary">
          Order
        </button>

        <div className="modal fade" id="OrderModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Order</h4>
              </div>
              <div className="modal-body">
                <div className="form-horizontal">

                  <div className="form-group">
                    <label className="col-sm-3">
                      Portfolio
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="cash"
                        id="cash"
                        disabled
                        className="form-control"
                        value={this.props.portfolio.name}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3">
                      Remaining Cash
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="cash"
                        id="cash"
                        disabled
                        className="form-control"
                        value={new Intl.NumberFormat(Intl.getCanonicalLocales(), {
                          style: 'currency',
                          currency: 'HKD'
                        }).format(this.props.portfolio.cash)}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                  <hr/>
                  <div className="form-group">
                    <label className="col-sm-3">
                      Symbol
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="symbol"
                        id="symbol"
                        disabled={this.props.symbol? "disabled" : ""}
                        className="form-control"
                        value={this.state.symbol}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-3">
                      Instrument Type
                    </label>
                    <div className="col-sm-7">
                      <div className="input-group-btn">
                        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.type} <span className="caret"></span></button>
                        <ul className="dropdown-menu">
                          {this.types.map((i,index) => (
                            <li key={i}><a href="#" name="type" onClick={() => this.setState({type: i})}>{i}</a></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label  className="col-sm-3">
                      Action
                    </label>
                    <div className="col-sm-7">
                      <div onChange={this.handleChange.bind(this)}>
                        <input type="radio" value="1" name="action" defaultChecked/> Long
                        <input type="radio" value="-1" name="action" style={{marginLeft:10}}/> Short
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="col-sm-3">
                      Amount
                    </label>
                    <div className="input-group col-sm-7">
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        className="form-control"
                        value={this.state.amount}
                        onChange={this.handleChange.bind(this)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="col-sm-3">
                      Price
                    </label>
                    <div className="input-group col-sm-7">
                      <span className="input-group-addon">HK$ </span>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="form-control"
                        value={this.state.price}
                        onChange={this.handleChange.bind(this)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="col-sm-3">
                      Total
                    </label>
                    <div className="input-group col-sm-7">
                      <span className="input-group-addon">HK$ </span>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        className="form-control"
                        value={this.state.price * this.state.amount}
                        disabled
                        placeholder="0"
                      />
                    </div>
                  </div>

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" data-dismiss="modal" onClick={this.handleOrder.bind(this)} className="btn btn-primary">Confirm</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    portfolio: state.portfolio.portfolio,
  };
};

export default connect(mapStateToProps)(OrderModal);
