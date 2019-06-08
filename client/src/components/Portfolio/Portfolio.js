import React from "react";
import { connect } from "react-redux";
import Messages from "../Messages";
import PortfolioModal from "./PortfolioModal";
import { string, object, func } from "prop-types";
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

  renderPofolioCard(portfolio,index){
    return(
      <div className="col-sm-4" key={portfolio._id}>
        <div className="panel">
          <div className="panel-body">
            <h3>{portfolio.name}</h3>
            <p>
              {portfolio.description}
            </p>

            <div style={{display: "flex"}}>
              <div>
                <span aria-hidden="true"  className="glyphicon glyphicon-usd"> Cash : {this.formatCurrency(portfolio.cash)} </span>
                <span aria-hidden="true"  className="glyphicon glyphicon-stats"> Value : {this.formatCurrency(portfolio.value)}</span>

              </div>
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
        <div className="row">
          {this.props.user.portfolios.map((p,index) => this.renderPofolioCard(p,index))}

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
