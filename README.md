# Visualize Me - ETL pipeline
## Stocks analysis through an interactive dashboard


### Synopsis

A web hosted interactive dashboard built upon ETL (extract transform and load). The workflow consists of:

1) A Python application to pull stocks data from Alphavantage using their API 
2) Wrangling the data with Panda to and storing it in a MongoDB (no relational database/NoSQL)
3) A Flask App to serve the wrangled data through an API service (json)
4) An interactive dashboard built with D3.js (to apply filters on the go), Plotly.js (to display the charts) and Bootstrap (look & feel + responsiveness of the web dashboard).

The dashboard enable analysis of 10 S&P companies of their opening, closing and  variation between these two metrics throughtout the years.

### Visualizations

1. Candlestick
2. Line chart
3. Slick.js to display the companies within the dashboard

### Deployment

For deployment purposes there are two folders available:

* run-local which contains all features described and unleashes the power of the pipeline (MongoDB installed locally required)
* web which utilizes a static json file and bypass the Flask App API for deployment using GitHub pages

The dashboard can be visualized in this github page: https://bit.ly/3dZOleC

#### About the Data
Stock data is originally pulled from Alphavantage (https://www.alphavantage.co/documentation/#)
The S&P companies were chosen from https://datahub.io/core/s-and-p-500-companies#resource-constituents (S&P data for Tickers)

#### Notes
This project was part of UCF Data Analytics & Visualization boot camp program
