import React from "react";
import { connect } from "react-redux";
import Messages from "../Messages";
import { object, string } from "prop-types";
import OrderModal from './OrderModal';
import { getData } from "./utils"


class Order extends React.Component {
  static propTypes = {
    messages: object.isRequired,
    symbol: string
  };

  constructor(props) {
    super(props);
    this.state = { action: "Long" , type: "Stock", amount: null, price: this.props.price, portfolio: this.props.user.portfolios.length > 0?this.props.user.portfolios[0]:{_id:"empty",name:"no"}};
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  searchSymbol() {
    getData(this.state.symbol).then(data => {
			this.setState({ data })
		})
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.price !== this.props.price)
      this.setState({price:this.props.price});
	}

  render() {
    return (

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Order Panel</h3>
          </div>
          <div className="panel-body" style={{padding:"10px 25px"}}>
            <Messages messages={this.props.messages} />
            <div style={{display:"flex",alignItems: "center", justifyContent: "space-around"}}>
              <div style={{width:200}}>
                <div className="input-group ">
                  <span className="input-group-addon">Symbol : </span>
                  <input disabled type="text"
                    name="amount"
                    className="form-control"
                    value={this.props.symbol}
                    onChange={this.handleChange.bind(this)}
                    aria-label="..."
                  />
                </div>
              </div>
              <div style={{flex:0}}>
                <div className="input-group ">
                  <span className="input-group-addon">Portfolio : </span>
                  <div className="input-group-btn dropup">
                    <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.portfolio.name} <span className="caret"></span></button>
                    <ul className="dropdown-menu">
                      {this.props.user.portfolios.map((p,index) => (
                        <li key={p._id}><a href="" name="portfolioId" onClick={() => this.setState({portfolio: p})}>{p.name}</a></li>
                      ))}
                      {this.props.user.portfolios.length === 0 && (
                        <li ><a href="/portfolio" name="portfolioId" >New Portfolio</a></li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div style={{width:200}}>
                <div className="input-group ">
                  <span className="input-group-addon">Price : HK$</span>
                  <input type="number"
                    name="price"
                    className="form-control"
                    value={this.state.price}
                    onChange={this.handleChange.bind(this)}
                    aria-label="..."
                    pattern="[0-9]*"
                  />
                </div>
              </div>
              <div style={{flex:0}}>
                <div className="input-group ">
                  <OrderModal portfolioId={this.state.portfolio._id} symbol={this.props.symbol} price={this.state.price}/>
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
    messages: state.messages,
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(Order);
