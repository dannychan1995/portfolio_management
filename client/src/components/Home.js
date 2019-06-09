import React from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import { object, func } from "prop-types";

class Home extends React.Component {
  static propTypes = {
    history: object.isRequired,
    messages: object.isRequired,
    onUnmount: func
  };
  constructor(props) {
    super(props);
    this.feature = React.createRef();
    this.start = React.createRef();
    this.market = React.createRef();
    this.order = React.createRef();
    this.report = React.createRef();
  }

  componentWillUnmount() {
    this.props.onUnmount(this.props.history);
  }

  handleScrollToElement(element) {
    element.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  render() {
    return (
      <div className="container-fluid">
        <Messages messages={this.props.messages} />
        <div className="jumbotron" style={JumbotronStyle}>
          <h1>Portfolio Management System</h1>
          <p style={{color:"#eee"}}>This is a React practising project which aims at creating a portfolio management system. The system can support mulitple portfolio and transaction. To start with, you may need to <a style={{color: "#9be8ea"}} href="/signup">signup</a> and create a portfolio first.</p>
          <p><a className="btn btn-primary btn-lg" onClick={this.handleScrollToElement.bind(this,this.feature)} role="button">Learn more</a></p>
        </div>
        <div ref={this.feature} >
          <div className="panel">
            <div className="panel-body">
              <legend><h2>Features</h2></legend>
              <div style={{display:"flex",justifyContent: "space-between"}}>
                <div onClick={this.handleScrollToElement.bind(this,this.start)} style={{...featureCard,background:"linear-gradient(rgba(174, 226, 228, 0.38) 0%, rgba(76, 175, 80, 0.19) 100%)"}}>
                  <div><i className="glyphicon glyphicon-folder-open"></i></div>
                  <div style={{fontSize: 20}}>Manage mulitple portfolio</div>
                </div>
                <div onClick={this.handleScrollToElement.bind(this,this.market)} style={{...featureCard,background:"linear-gradient(rgba(182, 228, 174, 0.38) 0%, rgba(0, 150, 136, 0.19) 100%)"}}>
                  <div><i className="glyphicon glyphicon-globe"></i></div>
                  <div style={{fontSize: 20}}>Exploring Market</div>

                </div>
                <div onClick={this.handleScrollToElement.bind(this,this.order)} style={{...featureCard,background:"linear-gradient(rgba(174, 226, 228, 0.38) 0%, rgba(59, 255, 183, 0.19) 100%)"}}>
                  <div><i className="glyphicon glyphicon-transfer"></i></div>
                  <div style={{fontSize: 20}}>Order Management</div>

                </div>
                <div onClick={this.handleScrollToElement.bind(this,this.report)} style={{...featureCard,background:"linear-gradient(rgba(174, 226, 228, 0.38) 0%, rgba(6, 78, 169, 0.19) 100%)"}}>
                  <div><i className="glyphicon glyphicon-stats"></i></div>
                  <div style={{fontSize: 20}}>Portfolio Reporting</div>

                </div>
              </div>
            </div>
          </div>
          <div ref={this.start} className="panel">
            <div className="panel-body">
              <legend><h2>Getting Started</h2></legend>
              <div>
                <div style={{fontSize: 15, padding: "20px 0"}}>
                  <div role="tabpanel" id="Portfolio">
                    <h3>Portfolio</h3>
                    <ol>
                      <li>To start with, please <a href="/signup">signup</a> first.</li>
                      <li>You can create portfolio at <a href={this.props.token? "/portfolio" : "/login"}>portfolio page</a>.</li>
                      <li>Please input Name, Description, and initial cash amount.</li>
                      <li>You can create multiple portfolio if you like.</li>
                    </ol>
                    <img src="img/portfolio.png" width="70%" alt=""></img>
                  </div>
                  <div ref={this.market} role="tabpanel" style={{marginTop:20}} id="Market">
                    <h3>Market</h3>
                    <ul>
                      <li>You may explore the market in <a href="/market">market page</a></li>
                      <li>You can search any instrument by the symbol. The data is provided by <a target="brank" href="https://www.alphavantage.co/">Alpha Vantage</a>. </li>
                      <li>If you would like to use your own API KEY, please modify MARKET_API_KEY in env file</li>
                    </ul>
                    <img src="img/market.png" width="70%" alt=""></img>
                  </div>
                  <div ref={this.order} role="tabpanel"  style={{marginTop:20}} id="Order">
                    <h3>Order</h3>
                    <ul>
                      <li>If you want to make a new order, you can just click order button in Market/ Portfolio Detail Page</li>
                      <li>Fill in all information below and click confirm.</li>
                    </ul>
                    <img src="img/order.png" width="30%" alt=""></img>
                  </div>
                  <div ref={this.report} role="tabpanel" style={{marginTop:20}} id="Report">
                    <h3>Report</h3>
                    <ul>
                      <li>In Portfolio Detail Page, you may find Valuation, Remaining Position and Transaction Record.</li>
                      <li>If you want to deposit or withdraw cash from portfolio, you may click Cash Injection button.</li>
                      <li>You can also add dividend for the specific instrument. The system will calculate the valuation for you.</li>
                    </ul>
                    <img src="img/report.png" width="70%" alt=""></img>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//-----custom style-------
const JumbotronStyle = {
  background:"linear-gradient(to bottom, rgba(255,255,255,0.8) 0%,rgba(29, 54, 90, 0.8) 100%) , url(https://ak7.picdn.net/shutterstock/videos/2586527/thumb/1.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100%"
}
const featureCard = {
  maxWidth:"23%",
  flex: 1,
  fontSize: 80,
  textAlign: "center",
  padding: "30px 10px",
  color: "rgb(59, 73, 115)",
  cursor: "pointer"
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    token: state.auth.token
  };
};

export default connect(mapStateToProps)(Home);
