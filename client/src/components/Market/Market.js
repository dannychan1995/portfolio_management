import React from "react";
import { connect } from "react-redux";
import Messages from "../Messages";
import { object, func, string } from "prop-types";
import { TypeChooser } from "react-stockcharts/lib/helper";
import MarketChart from './MarketChart';
import Order from './Order';
import { getData } from "./utils"


class Market extends React.Component {
  static propTypes = {
    messages: object.isRequired,
    token: string
  };

  constructor(props) {
    super(props);
    this.state = { symbol: "0001.HK" , data: null};
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
		getData().then(data => {
			this.setState({ data })
		})
	}

  render() {
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <div className="row">
          <div className="col-sm-12">
            <div className="input-group">
              <span class="input-group-addon">Symbol : </span>
              <input type="text"
                name="symbol"
                id="symbol"
                placeholder="Symbol : 0001.HK"
                autoFocus
                className="form-control"
                value={this.state.symbol}
                onChange={this.handleChange.bind(this)}
              />
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this.searchSymbol.bind(this)}>Search!</button>
              </span>
            </div>
          </div>
          <div className="col-sm-12">
            {this.state.data && (
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">{this.state.data.title}</h3>
                </div>
                <div className="panel-body">
                  <MarketChart type={"hybrid"} data={this.state.data.data} />
                </div>
              </div>
            )}

          </div>
          <div className="col-sm-12">
            {this.props.token && (
              <Order symbol={this.state.symbol}/>
            )}

          </div>


        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    token: state.auth.token,

  };
};

export default connect(mapStateToProps)(Market);
