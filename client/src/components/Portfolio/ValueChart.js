import React, { createRef, Component } from "react";
import Chart from 'react-google-charts';

class ValueChart extends Component {

  render() {
    return <Chart
      height={'250px'}
      chartType="PieChart"
      loader={<div>Loading Chart</div>}
      data={[
        ['Language', 'Speakers (in millions)'],
        ['German', 5.85],
        ['French', 1.66],
        ['Italian', 0.316],
        ['Romansh', 0.0791],
      ]}
      options={{
        legend: 'none',
        pieSliceText: 'label',
        pieStartAngle: 100,
      }}
      rootProps={{ 'data-testid': '4' }}
           />;

  }
}

export default ValueChart;
