import React from "react";
import { connect } from "react-redux";
import Messages from "../Messages";
import PortfolioModal from "./PortfolioModal";
import { string, object } from "prop-types";
import { addPortfolio } from "../../actions/portfolio";
import { getUser } from "../../actions/auth";

class Portfolio extends React.Component {
  static propTypes = {
    messages: object.isRequired,
    token: string.isRequired,
  };

  componentDidMount () {
    this.props.dispatch(
      getUser({
        token: this.props.token,
      })
    );
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

  renderPortfolioCard(portfolio,index){
    return(
      <div key={portfolio._id} style={{width: "100%", display: "inline-block"}}>
        <div className="panel">
          <div className="panel-body">
            <h3>{portfolio.name}</h3>
            <p>
              {portfolio.description}
            </p>

            <div style={{display: "flex",justifyContent:"space-between"}}>
              <dl className="dl-horizontal" style={{margin: 0}}>
                <dt style={{textAlign:"left"}}><span aria-hidden="true"  className="glyphicon glyphicon-usd"> Cash : </span></dt><dd style={{textAlign:"right"}}>{this.formatCurrency(portfolio.cash)}</dd>
                <dt style={{textAlign:"left"}}><span aria-hidden="true"  className="glyphicon glyphicon-stats"> Market Value : </span></dt><dd style={{textAlign:"right"}}>{this.formatCurrency(portfolio.value)}</dd>
              </dl>

              <a href={`/portfolio/${portfolio._id}`} role="button" className="btn btn-default" >
                View details
              </a>
            </div>

          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="container-fluid">

        <Messages messages={this.props.messages} />
        <div style={{columnCount: 1,columnGap: "1%"}}>
          {this.props.user.portfolios.map((p,index) => this.renderPortfolioCard(p,index))}

        </div>
        <PortfolioModal />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Portfolio);
