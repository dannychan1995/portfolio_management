import React from "react";
import { connect } from "react-redux";
import { string, object, func } from "prop-types";
import { createDividend } from "../../actions/portfolio";

class InterestModal extends React.Component {
  static propTypes = {
    portfolio: object.isRequired,
    token: string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { amount: 0, type: "1", newPrice: this.props.position.lastPrice};
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    if(event.target.name === "amount"){
      this.setState({ newPrice: this.props.position.lastPrice - event.target.value });
    }
  }

  handleCreateDividend(event) {
    event.preventDefault();
    this.props.dispatch(
      createDividend({
        dividend: this.state.amount,
        amount: this.props.position.amount,
        newPrice: this.state.newPrice,
        symbol: this.props.position.symbol,
        portfolioId: this.props.portfolio._id,
        token: this.props.token
      })
    );
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#InterestModal${this.props.position._id}`}>
          Dividend
        </button>

        <div style={{textAlign:"left"}} className="modal fade" id={`InterestModal${this.props.position._id}`} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Devidend / Interest</h4>
              </div>
              <div className="modal-body">
                <div className="form-horizontal">

                  <div className="form-group">
                    <label className="col-sm-4">
                      Symbol
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="symbol"
                        id="symbol"
                        disabled
                        className="form-control"
                        value={this.props.position.symbol}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="col-sm-4">
                      Dividend per share
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
                  <div className="form-group">
                    <label htmlFor="email" className="col-sm-4">
                      Adjusted Last Price
                    </label>
                    <div style={{width:"58%",display: "flex",justifyContent: "start", alignItems: "center"}} >
                      <div className="input-group">
                        <span className="input-group-addon">HK$ </span>
                        <input
                          type="number"
                          name="lastPrice"
                          id="lastPrice"
                          className="form-control"
                          disabled
                          value={this.props.position.lastPrice}
                        />
                      </div>
                      <i style={{margin:15}} className="glyphicon glyphicon-arrow-right"></i>
                      <div className="input-group">
                        <span className="input-group-addon">HK$ </span>
                        <input
                          type="number"
                          name="newPrice"
                          id="newPrice"
                          className="form-control"
                          value={this.state.newPrice}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                    </div>

                  </div>

                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" data-dismiss="modal" onClick={this.handleCreateDividend.bind(this)} className="btn btn-primary">Confirm</button>
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

export default connect(mapStateToProps)(InterestModal);
