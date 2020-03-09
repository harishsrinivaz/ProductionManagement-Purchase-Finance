const express = require("express");
const router = express.Router();
const stocks = require("../Models/Purchase_Stocks");
const reqDetails = require("../Models/Request_Details");

router.get("/", (req, res) => {
    stocks.find({}).then(stock => {
        res.send({ stock });
    });
});

router.post("/add", (req, res) => {
    reqDetails.find({ _id: req.body.Purchase_Id }).then(details => {
        let flag = false;
        stocks.find({}).then(stock => {
            for (let i = 0; i < stock.length; i++) {
                reqDetails.find({ _id: stock[i].Purchase_Id }).then(stockDetails => {
                    if (details[0].Raw_Material_Code === stockDetails[0].Raw_Material_Code) {
                        let new_stock = stock[i].Total_Quantity + details[0].Invoice_Quantity
                        console.log(stockDetails[0]._id)
                        stocks.findOneAndUpdate(
                            {
                                Purchase_Id: stockDetails[0]._id
                            },
                            {
                                $set: {
                                    Total_Quantity: new_stock

                                }
                            }
                        ).then(res => {
                            flag = true;
                            console.log('Stock added Successful')
                            return res.send('Updated Successful')
                        }).catch(err => {
                            res.send(err)
                        })
                    }
                    else {
                        if (i === stock.length - 1 && flag !== true) {
                            const {
                                Purchase_Id,
                                Total_Quantity,
                                Measuring_Unit
                            } = req.body;
                            console.log('stock added')
                            const new_stocks = new stocks({
                                Purchase_Id,
                                Total_Quantity,
                                Measuring_Unit
                            });
                            new_stocks.save().then(stocks => {
                                console.log("added");
                                return res.send(stocks);
                            });
                        }
                    }
                }).catch(err => {
                    res.send('stock not matched')
                    console.log("stock not added", err)
                })
            }
            if (stock.length === 0) {
                const {
                    Purchase_Id,
                    Total_Quantity,
                    Measuring_Unit
                } = req.body;

                const new_stocks = new stocks({
                    Purchase_Id,
                    Total_Quantity,
                    Measuring_Unit
                });
                new_stocks.save().then(stocks => {
                    console.log("added");
                    return res.send(stocks);
                });
            }

        }).catch(err => {
            res.send('stocks not found')
            console.log('Stock not found', err)
        }).catch(err => {
            console.log('Not Purchased', err)
            res.send('Not Purchased')
        })
    })
});

module.exports = router