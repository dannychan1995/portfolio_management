import React from "react";
import { connect } from "react-redux";
import Messages from "../Messages";
import PortfolioModal from "./PortfolioModal";
import CashInjectionModal from "./CashInjectionModal";
import ValueChart from "./ValueChart";
import { string, object, func } from "prop-types";
import { getPortfolio,addPortfolio } from "../../actions/portfolio";

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
              <a href={`/reset/${portfolio._id}`} role="button" className="btn btn-default" >
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
        <div className="panel">
          <div className="panel-body">
            <Messages messages={this.props.messages} />

            <h1>{this.props.portfolio.name}</h1>
            <div className="well"><p>{this.props.portfolio.description}</p></div>
            <legend>Valuation</legend>
            <form className="form-horizontal col-sm-6">

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
                  Value
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
                <div className="col-sm-offset-3 col-sm-4">
                  <CashInjectionModal portfolio={this.props.portfolio}/>
                </div>
              </div>
            </form>
            <div className="col-sm-6">
              <ValueChart/>
            </div>
            <legend>Positions</legend>
            <table class="table table-striped">

              <tr >
                <th >Type</th>
                <th >Symbol</th>
                <th >Last Price</th>
                <th >Amount</th>
                <th >Value</th>
              </tr>
              <tr >
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
              </tr>
              <tr >
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
              </tr>
              <tr >
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
              </tr>
              <tr >
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
              </tr>

            </table>
            <legend>Transactions</legend>
            <table class="table table-striped">

              <tr >
                <th >Type</th>
                <th >Action</th>
                <th >Symbol</th>
                <th >Price</th>
                <th >Amount</th>
                <th >Value</th>
                <th >Transaction time</th>
              </tr>
              <tr >
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
              </tr>
              <tr >
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
              </tr>
              <tr >
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
              </tr>
              <tr >
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
                <td >123</td>
              </tr>

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
