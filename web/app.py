from flask import Flask, render_template, redirect,jsonify
# from flask_pymongo import PyMongo
import pymongo
from pymongo import MongoClient
from bson import ObjectId
import json
# import scrape_costa

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
conn = 'mongodb://localhost:27017/'
client = pymongo.MongoClient(conn)

db = client["stocktests2"]

collection = db["stock_collection3"]

# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    stock_data = list(collection.find())
    # print(stock_data[0]['ticker'])

    ticker_list =[]
    open_price =[]

    for elements in stock_data:
        print(elements['ticker'])

        ticker_list.append(elements['ticker'])
        open_price.append(elements['open_price'])

    return render_template("index.html", stock_test=ticker_list,open_test=open_price)



# api to serve data
@app.route("/apiv1")
def stock_api():
    
    # Find one record of data from the mongo database
    stock_data2 = list(collection.find({},{"_id":0}))

    return jsonify(stock_data2)

# @app.route("/apiv1/timeseries<time_series>")
# def stock_api():
    
#     # Find one record of data from the mongo database
#     stock_data2 = list(collection.find({},{"_id":0}))

#     return jsonify(stock_data2)


if __name__ == "__main__":
    app.run(debug=True)
