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
                        let new_stock = stock[i].Total_Quantity + details[0].Quantity
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
                                Invoice_Quantity,
                                Measuring_Unit,
                                Id_Type,
                                Id,
                                Invoice_Amount,
                                Invoice_Date,
                                Invoice_Document,
                                Total_Quantity,
                                Unit
                            } = req.body;

                            const new_stocks = new stocks({
                                Purchase_Id,
                                Invoice_Quantity,
                                Measuring_Unit,
                                Id_Type,
                                Id,
                                Invoice_Amount,
                                Invoice_Date,
                                Invoice_Document,
                                Total_Quantity,
                                Unit
                            });
                            new_stocks.save().then(stocks => {
                                console.log("added");
                                return res.send(stocks);
                            });
                        }
                    }
                }).catch(err => {
                    res.send('not matched')
                })
            }
        }).catch(err => {
            res.send('stocks not found')
        }).catch(err => {
            res.send('Not Purchased')
        })
    })
});

module.exports = router