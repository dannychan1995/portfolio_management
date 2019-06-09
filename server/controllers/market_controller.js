const { marketAPIKey } = require("../config");
const fetch = require("node-fetch");

async function searchSymbol(req, res) {

  if(!req.body.symbol){
    req.body.symbol = "0001.HK";
    res.json({"Meta Data":{"1. Information":"Daily Prices (open, high, low, close) and Volumes","2. Symbol":"0001.HK","3. Last Refreshed":"2019-06-06","4. Output Size":"Compact","5. Time Zone":"US/Eastern"},"Time Series (Daily)":{"2019-06-06":{"1. open":"75.4000","2. high":"75.7500","3. low":"75.0000","4. close":"75.7500","5. volume":"1571075"},"2019-06-05":{"1. open":"76.0000","2. high":"76.0000","3. low":"75.1000","4. close":"75.4000","5. volume":"5187897"},"2019-06-04":{"1. open":"75.2000","2. high":"75.5000","3. low":"74.7500","4. close":"75.2000","5. volume":"5862709"},"2019-06-03":{"1. open":"74.4000","2. high":"75.2000","3. low":"74.0000","4. close":"75.0000","5. volume":"7133379"},"2019-05-31":{"1. open":"73.0500","2. high":"74.3500","3. low":"73.0500","4. close":"74.0500","5. volume":"9414108"},"2019-05-30":{"1. open":"74.0000","2. high":"74.8500","3. low":"73.0000","4. close":"73.0000","5. volume":"5880761"},"2019-05-29":{"1. open":"74.2500","2. high":"75.0000","3. low":"73.8500","4. close":"74.3000","5. volume":"5317107"},"2019-05-28":{"1. open":"73.8000","2. high":"74.9000","3. low":"73.6000","4. close":"74.9000","5. volume":"13063303"},"2019-05-27":{"1. open":"74.0500","2. high":"74.4500","3. low":"73.7000","4. close":"74.0500","5. volume":"4975167"},"2019-05-24":{"1. open":"75.1000","2. high":"75.4000","3. low":"74.5000","4. close":"74.7000","5. volume":"6511320"},"2019-05-23":{"1. open":"75.0000","2. high":"75.3500","3. low":"74.5000","4. close":"74.8500","5. volume":"5549012"},"2019-05-22":{"1. open":"75.7000","2. high":"76.3000","3. low":"75.0500","4. close":"75.3000","5. volume":"5949651"},"2019-05-21":{"1. open":"76.7000","2. high":"77.0000","3. low":"75.5500","4. close":"75.7000","5. volume":"5926774"},"2019-05-20":{"1. open":"78.4500","2. high":"78.7500","3. low":"78.1500","4. close":"78.4000","5. volume":"4425746"},"2019-05-17":{"1. open":"78.8000","2. high":"79.4000","3. low":"78.2500","4. close":"78.2500","5. volume":"4220834"},"2019-05-16":{"1. open":"78.1000","2. high":"78.9500","3. low":"78.0000","4. close":"78.5000","5. volume":"6204263"},"2019-05-15":{"1. open":"79.0000","2. high":"79.4000","3. low":"78.2000","4. close":"78.4500","5. volume":"8798034"},"2019-05-14":{"1. open":"78.0000","2. high":"79.3000","3. low":"78.0000","4. close":"78.8000","5. volume":"5993280"},"2019-05-10":{"1. open":"79.4000","2. high":"80.5000","3. low":"79.3000","4. close":"79.7500","5. volume":"5688165"},"2019-05-09":{"1. open":"80.0000","2. high":"80.3500","3. low":"79.0500","4. close":"79.5500","5. volume":"6836265"},"2019-05-08":{"1. open":"81.2000","2. high":"81.6000","3. low":"80.2000","4. close":"80.6000","5. volume":"7132062"},"2019-05-07":{"1. open":"82.0000","2. high":"82.0500","3. low":"81.0500","4. close":"81.6000","5. volume":"4955036"},"2019-05-06":{"1. open":"81.0000","2. high":"81.8000","3. low":"80.5000","4. close":"81.2000","5. volume":"7996424"},"2019-04-30":{"1. open":"83.2000","2. high":"83.2000","3. low":"82.2000","4. close":"82.4000","5. volume":"4634966"},"2019-04-29":{"1. open":"82.9500","2. high":"83.6000","3. low":"82.2000","4. close":"83.0500","5. volume":"5111726"},"2019-04-26":{"1. open":"82.5000","2. high":"82.6000","3. low":"81.7500","4. close":"82.0000","5. volume":"5046620"},"2019-04-25":{"1. open":"82.1000","2. high":"82.9000","3. low":"82.0000","4. close":"82.3000","5. volume":"3822332"},"2019-04-24":{"1. open":"82.9500","2. high":"82.9500","3. low":"81.9000","4. close":"82.1000","5. volume":"4168571"},"2019-04-23":{"1. open":"81.8000","2. high":"82.6000","3. low":"81.8000","4. close":"82.4000","5. volume":"3744176"},"2019-04-18":{"1. open":"83.2000","2. high":"83.4500","3. low":"82.5000","4. close":"82.8000","5. volume":"3468784"},"2019-04-17":{"1. open":"83.9500","2. high":"83.9500","3. low":"83.0000","4. close":"83.2000","5. volume":"4313768"},"2019-04-16":{"1. open":"83.1500","2. high":"83.9500","3. low":"83.1500","4. close":"83.6000","5. volume":"5400102"},"2019-04-15":{"1. open":"85.0500","2. high":"85.4000","3. low":"83.7000","4. close":"83.7500","5. volume":"6207898"},"2019-04-12":{"1. open":"84.7500","2. high":"84.7500","3. low":"83.6000","4. close":"84.2500","5. volume":"3690541"},"2019-04-11":{"1. open":"84.6500","2. high":"85.4000","3. low":"83.6000","4. close":"84.3000","5. volume":"5766180"},"2019-04-10":{"1. open":"85.1000","2. high":"85.8000","3. low":"84.5000","4. close":"85.3500","5. volume":"5840791"},"2019-04-09":{"1. open":"85.6000","2. high":"86.4500","3. low":"85.5000","4. close":"86.2000","5. volume":"5913309"},"2019-04-08":{"1. open":"85.9000","2. high":"86.3000","3. low":"85.6000","4. close":"86.0000","5. volume":"6741262"},"2019-04-04":{"1. open":"85.8500","2. high":"85.9000","3. low":"85.0500","4. close":"85.6000","5. volume":"5064829"},"2019-04-03":{"1. open":"85.0000","2. high":"86.3000","3. low":"84.8500","4. close":"85.9500","5. volume":"7568400"},"2019-04-02":{"1. open":"84.0500","2. high":"85.3000","3. low":"83.5500","4. close":"85.0000","5. volume":"6339089"},"2019-04-01":{"1. open":"83.0500","2. high":"84.1500","3. low":"82.6000","4. close":"84.1000","5. volume":"7299974"},"2019-03-29":{"1. open":"82.5000","2. high":"83.1500","3. low":"82.1500","4. close":"82.4500","5. volume":"6946831"},"2019-03-28":{"1. open":"81.2000","2. high":"82.5000","3. low":"81.2000","4. close":"82.5000","5. volume":"7635489"},"2019-03-27":{"1. open":"82.2000","2. high":"82.7000","3. low":"82.0500","4. close":"82.1000","5. volume":"7567758"},"2019-03-26":{"1. open":"83.0000","2. high":"84.0500","3. low":"82.2000","4. close":"83.0000","5. volume":"4977482"},"2019-03-25":{"1. open":"82.4500","2. high":"83.7500","3. low":"82.4000","4. close":"82.9500","5. volume":"7995177"},"2019-03-22":{"1. open":"83.0500","2. high":"84.6500","3. low":"82.8500","4. close":"83.8000","5. volume":"13477978"},"2019-03-21":{"1. open":"83.3500","2. high":"83.5000","3. low":"81.6000","4. close":"81.6000","5. volume":"12223826"},"2019-03-20":{"1. open":"80.3500","2. high":"83.3000","3. low":"80.3000","4. close":"82.5000","5. volume":"12419701"},"2019-03-19":{"1. open":"80.9000","2. high":"81.1500","3. low":"80.2000","4. close":"80.4500","5. volume":"7374338"},"2019-03-18":{"1. open":"80.5500","2. high":"81.1000","3. low":"80.1000","4. close":"80.9500","5. volume":"8473309"},"2019-03-15":{"1. open":"80.5000","2. high":"81.7500","3. low":"80.0500","4. close":"80.9000","5. volume":"6655025"},"2019-03-14":{"1. open":"80.5000","2. high":"80.6500","3. low":"79.8000","4. close":"80.3000","5. volume":"4008292"},"2019-03-13":{"1. open":"80.2000","2. high":"80.5500","3. low":"79.6000","4. close":"80.0000","5. volume":"4552371"},"2019-03-12":{"1. open":"80.5000","2. high":"80.9500","3. low":"80.0000","4. close":"80.4000","5. volume":"5218460"},"2019-03-11":{"1. open":"79.8000","2. high":"80.1000","3. low":"79.0000","4. close":"79.7500","5. volume":"6346336"},"2019-03-08":{"1. open":"80.4500","2. high":"80.6000","3. low":"79.8000","4. close":"79.9000","5. volume":"7392590"},"2019-03-07":{"1. open":"81.6500","2. high":"82.2500","3. low":"81.2000","4. close":"81.4000","5. volume":"5387368"},"2019-03-06":{"1. open":"82.0000","2. high":"82.1500","3. low":"81.6000","4. close":"81.8500","5. volume":"4285839"},"2019-03-05":{"1. open":"83.0000","2. high":"83.1500","3. low":"82.0000","4. close":"82.0000","5. volume":"6162493"},"2019-03-04":{"1. open":"83.9500","2. high":"84.4000","3. low":"83.2500","4. close":"83.7000","5. volume":"5493297"},"2019-03-01":{"1. open":"83.0500","2. high":"84.0000","3. low":"83.0500","4. close":"83.5000","5. volume":"4605070"},"2019-02-28":{"1. open":"83.1500","2. high":"84.3000","3. low":"83.1500","4. close":"83.5500","5. volume":"5996870"},"2019-02-27":{"1. open":"83.6000","2. high":"84.8500","3. low":"83.3000","4. close":"84.7000","5. volume":"8486894"},"2019-02-26":{"1. open":"82.5500","2. high":"83.7000","3. low":"82.1500","4. close":"83.3500","5. volume":"7219809"},"2019-02-25":{"1. open":"82.7000","2. high":"83.4000","3. low":"81.7000","4. close":"82.2500","5. volume":"6425440"},"2019-02-22":{"1. open":"81.0000","2. high":"82.8000","3. low":"80.6500","4. close":"82.7000","5. volume":"6979145"},"2019-02-21":{"1. open":"81.4000","2. high":"82.2000","3. low":"81.0000","4. close":"81.8000","5. volume":"5398804"},"2019-02-20":{"1. open":"81.1500","2. high":"82.4000","3. low":"81.1500","4. close":"82.2000","5. volume":"8117594"},"2019-02-19":{"1. open":"81.6000","2. high":"81.9000","3. low":"80.3000","4. close":"81.4000","5. volume":"4940492"},"2019-02-18":{"1. open":"79.9000","2. high":"81.6000","3. low":"79.9000","4. close":"81.1500","5. volume":"6220737"},"2019-02-15":{"1. open":"80.4000","2. high":"80.5000","3. low":"79.2000","4. close":"79.7000","5. volume":"4677013"},"2019-02-14":{"1. open":"80.5000","2. high":"81.5000","3. low":"80.3500","4. close":"81.0000","5. volume":"5849384"},"2019-02-13":{"1. open":"78.8000","2. high":"80.3000","3. low":"78.5000","4. close":"80.2500","5. volume":"6566280"},"2019-02-12":{"1. open":"79.5000","2. high":"79.8000","3. low":"78.8000","4. close":"79.3500","5. volume":"7567807"},"2019-02-11":{"1. open":"78.4000","2. high":"80.6500","3. low":"78.3500","4. close":"80.6500","5. volume":"6655773"},"2019-02-08":{"1. open":"79.5000","2. high":"79.5000","3. low":"78.4500","4. close":"78.9000","5. volume":"4989090"},"2019-02-04":{"1. open":"78.6000","2. high":"79.4500","3. low":"78.3000","4. close":"79.0000","5. volume":"3060455"},"2019-02-01":{"1. open":"79.1000","2. high":"79.9000","3. low":"78.8500","4. close":"79.2000","5. volume":"5534921"},"2019-01-31":{"1. open":"79.5500","2. high":"79.8000","3. low":"78.6000","4. close":"78.9500","5. volume":"7222793"},"2019-01-30":{"1. open":"78.7000","2. high":"79.4500","3. low":"78.4000","4. close":"79.1000","5. volume":"5630394"},"2019-01-29":{"1. open":"78.7500","2. high":"79.8500","3. low":"78.5500","4. close":"78.9000","5. volume":"6204034"},"2019-01-28":{"1. open":"80.5000","2. high":"80.5500","3. low":"79.2000","4. close":"79.4000","5. volume":"4715496"},"2019-01-25":{"1. open":"80.1000","2. high":"81.0000","3. low":"80.0000","4. close":"81.0000","5. volume":"4494369"},"2019-01-24":{"1. open":"79.2500","2. high":"80.0000","3. low":"79.0500","4. close":"80.0000","5. volume":"3841030"},"2019-01-23":{"1. open":"78.2000","2. high":"79.9000","3. low":"78.1500","4. close":"79.0000","5. volume":"4075893"},"2019-01-22":{"1. open":"78.9000","2. high":"79.4000","3. low":"77.8000","4. close":"78.2000","5. volume":"2930075"},"2019-01-21":{"1. open":"79.3000","2. high":"80.0500","3. low":"78.9500","4. close":"79.5000","5. volume":"2851388"},"2019-01-18":{"1. open":"79.6000","2. high":"79.6000","3. low":"78.6500","4. close":"79.2000","5. volume":"3788799"},"2019-01-17":{"1. open":"79.5000","2. high":"79.6000","3. low":"78.0500","4. close":"78.2500","5. volume":"2785555"},"2019-01-16":{"1. open":"78.2000","2. high":"79.6500","3. low":"77.7500","4. close":"78.5500","5. volume":"4603116"},"2019-01-15":{"1. open":"77.6000","2. high":"78.3000","3. low":"77.2500","4. close":"78.2500","5. volume":"5287358"},"2019-01-14":{"1. open":"78.0000","2. high":"78.2000","3. low":"76.0000","4. close":"76.4500","5. volume":"4166632"},"2019-01-11":{"1. open":"78.0000","2. high":"78.0000","3. low":"77.2500","4. close":"77.8500","5. volume":"3502188"},"2019-01-10":{"1. open":"77.8000","2. high":"77.8000","3. low":"76.3000","4. close":"77.1000","5. volume":"4418674"},"2019-01-09":{"1. open":"78.0000","2. high":"78.0000","3. low":"77.2500","4. close":"77.5000","5. volume":"7793080"},"2019-01-08":{"1. open":"76.5000","2. high":"77.8000","3. low":"75.9500","4. close":"77.3500","5. volume":"7733797"},"2019-01-07":{"1. open":"76.8000","2. high":"76.9500","3. low":"75.4000","4. close":"75.8000","5. volume":"4371572"},"2019-01-04":{"1. open":"72.8000","2. high":"75.2500","3. low":"72.8000","4. close":"75.2500","5. volume":"6218655"}}});
  }

  await fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol="+req.body.symbol+"&apikey="+marketAPIKey)
  .then(response => response.json())
  .then(data => res.json(data))

  // return res.json({ token: marketAPIKey });
}


module.exports = {
  searchSymbol
};
