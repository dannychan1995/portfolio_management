import React from "react";
import { connect } from "react-redux";
import { string, object } from "prop-types";
import { addPortfolio } from "../../actions/portfolio";

class PortfolioModal extends React.Component {
  static propTypes = {
    messages: object.isRequired,
    token: string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { name: "" , description: "", cash: 0};
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleAddPortfolio(event) {
    event.preventDefault();
    this.props.dispatch(
      addPortfolio({
        portfolio: {
          name: this.state.name,
          description: this.state.description,
          cash: this.state.cash
        },
        token: this.props.token
      })
    );
  }

  renderPofolioCard(portfolio){
    return(
      <div className="col-sm-4" key="portfolio._id">
        <div className="panel">
          <div className="panel-body">
            <h3>{portfolio.name}</h3>
            <p>
              {portfolio.description}
            </p>
            <a href="" role="button" className="btn btn-default" onClick={this.handleAddPortfolio.bind(this)}>
              View details
            </a>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div style={{"marginBottom": 15,display: "flex"}}>
        <button style={{flex: 1}} type="button" className="btn btn-primary" data-toggle="modal" data-target="#portfolioModal">
          Create Portfolio
        </button>

        <div className="modal fade" id="portfolioModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Create Portfolio</h4>
              </div>
              <div className="modal-body">
                <form className="form-horizontal">

                  <div className="form-group">
                    <label htmlFor="name" className="col-sm-3">
                      Name
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="form-control"
                        value={this.state.name}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="col-sm-3">
                      Description
                    </label>
                    <div className="col-sm-7">
                      <textarea
                        type="text"
                        name="description"
                        id="description"
                        className="form-control"
                        value={this.state.description}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="col-sm-3">
                      Cash
                    </label>
                    <div className="col-sm-7">
                      <input
                        type="number"
                        name="cash"
                        id="cash"
                        className="form-control"
                        value={this.state.cash}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>


                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" data-dismiss="modal" onClick={this.handleAddPortfolio.bind(this)} className="btn btn-primary">Save</button>
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
    user: state.auth.user,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(PortfolioModal);
