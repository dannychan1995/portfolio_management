

import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export function getData(symbol) {
	const promiseMSFT = fetch("/api/markets/search", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      symbol: symbol
    })
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      let convData = {};
      if(data.Note) {
        convData.title = data.Note;
      }else {
        convData.title = data["Meta Data"]["2. Symbol"];
        convData.data = Object.keys(data["Time Series (Daily)"]).map(key => {
          return {
            date: parseDate(key),
            open: data["Time Series (Daily)"][key]["1. open"],
            high: data["Time Series (Daily)"][key]["2. high"],
            low: data["Time Series (Daily)"][key]["3. low"],
            close: data["Time Series (Daily)"][key]["4. close"],
            volume: data["Time Series (Daily)"][key]["5. volume"],
          }
        }).reverse();
        return (convData);
      }
  })
	return promiseMSFT;
}
