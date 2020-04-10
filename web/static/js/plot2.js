let url = `http://127.0.0.1:5000/apiv1`;
var apiData =  d3.json(url)
///////////////////////
//
//         the following code will be used to plot the charts
//
///////////////////////
function buildPlot(selectedTicker){
    apiData.then(function(data) {
    console.log(data)
 
    // buildPlot()
    /// filter data by ticker
    // let selectedStockData = data.filter(x => x.ticker[1] == `"${selectedTicker}"`);
    let selectedStockData = data.filter(x => x.ticker == selectedTicker);
    
    console.log(selectedStockData)

    // let entriesTicker = data.filter(x => x.ticker)
    let allClosePrice = selectedStockData.map(x => x.close_price)
    let allOpenPrice = selectedStockData.map(x => x.open_price)
    let allHighPrice = selectedStockData.map(x => x.high_price)
    let allLowPrice = selectedStockData.map(x => x.low_price)

    // console.log(allClosePrice)
    let allDates = selectedStockData.map(x => x.date)

    let entriesallClosePrice = Object.entries(allClosePrice);
        // console.log(entriesallClosePrice)
    let entriesallDates = Object.entries(allDates);
    // console.log(entriesallDates)


    var eachClosePrice = entriesallClosePrice.map(x => x[1]);


    var eachDate = entriesallDates.map(x => x[1]);
    //   console.log(eachDate)

    var trace1 = {
      type: "scatter",
    //   mode: "lines",
    //   name: entriesTicker,
      x: eachDate,
      y: eachClosePrice,
      line: {
        color: "#17BECF"
      }
    };

    // var data = [trace1];
    var data = [trace1, trace2];

    var layout = {
    //   title: `${entriesTicker} closing prices`,
      xaxis: {
        // range: ["2020-01-01", "2020-01-31"],
        range: [d3.min(eachDate), d3.max(eachDate)],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };
    var trace2 = {
      type: "candlestick",
      x: eachDate,
      high: highPrices,
      low: lowPrices,
      open: openingPrices,
      close: closingPrices
    };

    Plotly.newPlot("plot", data, layout);
  // load page with first bar graph

  });


    
};

var initialTicker = "AMZN";
buildPlot(initialTicker);
 //dropdown hardcoded for now
 var selectedTicker = d3.select("#selTicker");

  function optionChanged(selectedTicker){
    // console.log(selectedTicker)
    buildPlot(selectedTicker);
  }