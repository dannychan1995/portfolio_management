import React, { createRef, Component } from "react";
import Chart from 'react-google-charts';
import { connect } from "react-redux";

class ValueChart extends Component {

  render() {
    return <Chart
      height={'250px'}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={this.props.chartData}
      options={{
        title: 'Asset Type',
        pieSliceText: 'label',
        pieStartAngle: 100,
        animation: {
          startup: true,
          easing: 'linear',
          duration: 1500,
        },
      }}
      rootProps={{ 'data-testid': '4' }}
           />;

  }
}

const genChartData = (portfolio) => {
  let data = {
    'Asset Type': 'Amount',
    cash: portfolio.cash,
  }
  portfolio.positions.forEach(p => {
    if(p.amount!==0){
      if(data[p.type]){
        data[p.type] += Math.abs(p.amount) * p.lastPrice;
      }else{
        data[p.type] = Math.abs(p.amount) * p.lastPrice;
      }
    }    
  })

  return Object.keys(data).map(function(key) {
    return [key, data[key]];
  });
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    user: state.auth.user,
    portfolio: state.portfolio.portfolio,
    chartData: genChartData(state.portfolio.portfolio)
  };
};

export default connect(mapStateToProps)(ValueChart);
