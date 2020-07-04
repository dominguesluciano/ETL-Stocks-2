let url = '../templates/apiv1/apiv1.json';
var apiData =  d3.json(url)

let button = d3.select("#filter-btn");

button.on("click", optionChanged);

function buildPlot(selectedTicker){
    apiData.then(function(data) {
    // console.log(data)

    // let selectedStockData = data.filter(x => x.ticker[1] == `"${selectedTicker}"`);
    let selectedStockData = data.filter(x => x.ticker == selectedTicker);
    let eachPriceDiff = selectedStockData.map(x => x.open_price-x.close_price);
    //console.log(eachPriceDiff)

    // let entriesTicker = data.filter(x => x.ticker)
    let allOpenPrice = selectedStockData.map(x => x.open_price)
    let allClosePrice = selectedStockData.map(x => x.close_price)
    let allHighPrice = selectedStockData.map(x => x.high_price)
    let allLowPrice = selectedStockData.map(x => x.low_price)
    // let allVolume = selectedStockData.map(x => x.volume)
    let allDates = selectedStockData.map(x => x.date)

    let entriesallClosePrice = Object.entries(allClosePrice);
    let entriesallOpenPrice = Object.entries(allOpenPrice);
    let entriesallHighPrice = Object.entries(allHighPrice);
    let entriesallowPrice = Object.entries(allLowPrice);
    // let entriesallVolume = Object.entries(allVolume);
    let entriesallDates = Object.entries(allDates);

    var eachOpenPrice = entriesallOpenPrice.map(x => x[1]);
    var eachClosePrice = entriesallClosePrice.map(x => x[1]);
    var eachDate = entriesallDates.map(x => x[1]);
    var eachHighPrice = entriesallHighPrice.map(x => x[1]);
    var eachLowPrice = entriesallowPrice.map(x => x[1]);
    // var eachVolume= entriesallVolume.map(x => x[1]);
  
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
    var trace2 = {
      type: "candlestick",
      x: eachDate,
      high: eachHighPrice,
      low: eachLowPrice,
      open: eachOpenPrice,
      close: eachClosePrice
    };

    var trace3 = {
      type: "scatter",
    //   mode: "lines",
    //   name: entriesTicker,
      x: eachDate,
      y: eachPriceDiff,
      line: {
        color: "#c3c3c3"
      }
    };
    var trace4 = {
      type: "scatter",
    //   mode: "lines",
    //   name: entriesTicker,
      x: eachDate,
      y: eachOpenPrice,
      line: {
        color: "#orange"
      }
    };

    var data = [trace1, trace2];
    var data2 = [trace3]
    var data3 = [trace4]

    //closing price layout
    var layout = {
        title: `${selectedTicker} closing prices`,
        xaxis: {
          title :"Date",
          // range: ["2020-01-01", "2020-01-31"],
          range: [d3.min(eachDate), d3.max(eachDate)],
          rangeselector: {buttons: [
                {
                  step: 'month', 
                  count: 3, 
                  label: '3 mo', 
                  stepmode: 'backward'
                }, 
                {
                  step: 'month', 
                  count: 6, 
                  label: '6 mo', 
                  stepmode: 'backward'
                }, 
                {
                  step: 'year', 
                  count: 1, 
                  label: '1 yr', 
                  stepmode: 'backward'
                }, 
                {
                  step: 'year', 
                  count: 1, 
                  label: 'YTD', 
                  stepmode: 'todate'
                }, 
                {step: 'all'}
              ]}
        },
        yaxis: {
          title: "Closing Price",
          autorange: true,
          type: "linear"
        }
        
      };
  
   // difference of price layout

   var layout2 = {
    title: `Open to Close price difference ${selectedTicker}`,
    xaxis: {
      title :"Date",
      // range: ["2020-01-01", "2020-01-31"],
      range: [d3.min(eachDate), d3.max(eachDate)],
      rangeselector: {buttons: [
            {
              step: 'month', 
              count: 3, 
              label: '3 mo', 
              stepmode: 'backward'
            }, 
            {
              step: 'month', 
              count: 6, 
              label: '6 mo', 
              stepmode: 'backward'
            }, 
            {
              step: 'year', 
              count: 1, 
              label: '1 yr', 
              stepmode: 'backward'
            }, 
            {
              step: 'year', 
              count: 1, 
              label: 'YTD', 
              stepmode: 'todate'
            }, 
            {step: 'all'}
          ]}
    },
    yaxis: {
      title: "Difference",
      autorange: true,
      type: "linear"
    }
    
  };

  var layout3 = {
    title: `${selectedTicker} opening prices`,
    xaxis: {
      title :"Date",
      // range: ["2020-01-01", "2020-01-31"],
      range: [d3.min(eachDate), d3.max(eachDate)],
      rangeselector: {buttons: [
            {
              step: 'month', 
              count: 3, 
              label: '3 mo', 
              stepmode: 'backward'
            }, 
            {
              step: 'month', 
              count: 6, 
              label: '6 mo', 
              stepmode: 'backward'
            }, 
            {
              step: 'year', 
              count: 1, 
              label: '1 yr', 
              stepmode: 'backward'
            }, 
            {
              step: 'year', 
              count: 1, 
              label: 'YTD', 
              stepmode: 'todate'
            }, 
            {step: 'all'}
          ]}
    },
    yaxis: {
      title: "Opening price",
      autorange: true,
      type: "linear"  
    }
    
  };
  var config = {responsive: true}

      Plotly.newPlot("plot", data, layout, config);
      Plotly.newPlot("plot2", data2, layout2, config);
      Plotly.newPlot("plot3", data3, layout3), config;

      // load page with first bar graph

  });


    
};

var initialTicker = "AMZN";
buildPlot(initialTicker);
 //dropdown hardcoded for now

  // function getData(selectedTicker){
  //   // console.log(selectedTicker)
  //   buildPlot(selectedTicker);
  // }

  // function getData(){
  //   let selectedTicker = d3.select("#selTicker").property("value");
  //   console.log(selectedTicker) 
  //   buildPlot(selectedTicker);
   
  //   // var selectedPrice = d3.select("#selPrice").property("value");
  
  // }
let selectedTicker = d3.select("#selTicker").select("a").text();

  function optionChanged(selectedTicker){
    console.log(selectedTicker);
      
      buildPlot(selectedTicker);

  }

  //
//
//
//////////////////////////////
//
//
//