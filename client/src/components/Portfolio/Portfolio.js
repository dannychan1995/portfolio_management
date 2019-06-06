import React from "react";
import { connect } from "react-redux";
import Messages from "../Messages";
import PortfolioModal from "./PortfolioModal";
import { string, object, func } from "prop-types";
import { addPortfolio } from "../../actions/portfolio";

class Portfolio extends React.Component {
  static propTypes = {
    messages: object.isRequired,
    token: string.isRequired,
  };

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
  handleViewDetail(id) {
    console.log(id);
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
                <span aria-hidden="true"  className="glyphicon glyphicon-usd"> Cash : {new Intl.NumberFormat(Intl.getCanonicalLocales(), {
                  style: 'currency',
                  currency: 'HKD'
                }).format(portfolio.cash)} </span>
                <span aria-hidden="true"  className="glyphicon glyphicon-stats"> Value : {new Intl.NumberFormat(Intl.getCanonicalLocales(), {
                  style: 'currency',
                  currency: 'HKD'
                }).format(portfolio.value)}</span>

              </div>
              <a href="#" role="button" className="btn btn-default" onClick={this.handleViewDetail(portfolio._id)}>
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
