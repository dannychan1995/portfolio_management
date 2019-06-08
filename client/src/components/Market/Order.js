import React from "react";
import { connect } from "react-redux";
import Messages from "../Messages";
import { object, func, string } from "prop-types";
import { TypeChooser } from "react-stockcharts/lib/helper";
import MarketChart from './MarketChart';
import { getData } from "./utils"


class Order extends React.Component {
  static propTypes = {
    messages: object.isRequired,
    symbol: string
  };

  constructor(props) {
    super(props);
    this.state = { action: "Long" , type: "Stock", amount: 0};
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  searchSymbol() {
    getData(this.state.symbol).then(data => {
			this.setState({ data })
		})
  }

  componentDidMount() {

	}

  render() {
    return (

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Order Panel</h3>
          </div>
          <div className="panel-body" style={{padding:"10px 25px"}}>
            <Messages messages={this.props.messages} />
            <div className="row">
              <div className="col-sm-3">
                <div className="input-group ">
                  <span class="input-group-addon">Symbol : </span>
                  <input disabled type="text"
                    name="amount"
                    className="form-control"
                    value={this.props.symbol}
                    onChange={this.handleChange.bind(this)}
                    aria-label="..."
                  />
                </div>
              </div>
              <div className="col-sm-2">
                <div className="input-group ">
                  <span class="input-group-addon">Action : </span>
                  <div className="input-group-btn dropup">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.action} <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                      <li><a href="#" name="action" onClick={() => this.setState({action: "Long"})}>Long</a></li>
                      <li><a href="#" name="action" onClick={() => this.setState({action: "Short"})}>Short</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="input-group ">
                  <span class="input-group-addon">Instrument Type :  </span>
                  <div className="input-group-btn dropup">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.type} <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                      <li><a href="#" name="type" onClick={() => this.setState({type: "Stock"})}>Stock</a></li>
                      <li><a href="#" name="type" onClick={() => this.setState({type: "Bond"})}>Bond</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-sm-3">
                <div className="input-group ">
                  <span class="input-group-addon">Amount :  </span>
                  <input type="number"
                    name="amount"
                    className="form-control"
                    value={this.state.amount}
                    onChange={this.handleChange.bind(this)}
                    aria-label="..."
                    pattern="[0-9]*"
                  />
                </div>
              </div>
              <div className="col-sm-1">
                <div className="input-group ">
                  <button type="button" className="btn btn-primary">
                    Confirm
                  </button>
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
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Order);
