import React from "react";
import { connect } from "react-redux";
import { string, object } from "prop-types";
import { cashInjection } from "../../actions/portfolio";

class CashInjectionModal extends React.Component {
  static propTypes = {
    portfolio: object.isRequired,
    token: string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { amount: 0, type: "1"};
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleCashInjection(event) {
    event.preventDefault();
    this.props.dispatch(
      cashInjection({
        amount: this.state.amount * this.state.type,
        portfolioId: this.props.portfolio._id,
        token: this.props.token
      })
    );
  }

  render() {
    return (
      <div style={{marginRight: 15,display: "flex"}}>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#CashInjectionModal">
          Cash Injection
        </button>

        <div className="modal fade" id="CashInjectionModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Cash Injection / Withdrawal</h4>
              </div>
              <div className="modal-body">
                <div className="form-horizontal">

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
                  <div className="form-group">
                    <label  className="col-sm-3">
                      Operation
                    </label>
                    <div className="col-sm-7">
                      <div onChange={this.handleChange.bind(this)}>
                        <input type="radio" value="1" name="type" defaultChecked/> Injection
                        <input type="radio" value="-1" name="type" style={{marginLeft:10}}/> Withdrawal
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="col-sm-3">
                      Amount
                    </label>
                    <div className="input-group col-sm-7">
                      <span className="input-group-addon">HK$ </span>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        className="form-control"
                        value={this.state.amount}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" data-dismiss="modal" onClick={this.handleCashInjection.bind(this)} className="btn btn-primary">Confirm</button>
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

export default connect(mapStateToProps)(CashInjectionModal);
