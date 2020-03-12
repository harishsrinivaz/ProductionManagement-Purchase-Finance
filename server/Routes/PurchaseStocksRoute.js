const express = require("express");
const router = express.Router();
const Production_Raw_Material_Stock = require("../Models/Production_Raw_Material_Stock");
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
                        console.log('_id: ', stockDetails[0]._id)
                        stocks.findOneAndUpdate({
                            Purchase_Id: stockDetails[0]._id
                            //_id: "5e662febe00b5284b8180123"
                        },
                            {
                                $set: {
                                    Total_Quantity: new_stock,
                                    Purchase_Id: req.body.Purchase_Id
                                },
                                $push: {
                                    Purchase_List: req.body.Purchase_Id
                                }
                            },
                        ).then(Response => {
                            flag = true;
                            console.log('Stock added Successful', Response)
                            return res.send('Updated Successful')
                        }).catch(err => {
                            res.send(err)
                        })
                    }
                    else {
                        if (i === stock.length - 1 && flag !== true) {
                            const {
                                Purchase_List,
                                Purchase_Id,
                                Total_Quantity,
                                Measuring_Unit
                            } = req.body;
                            console.log('stock added')
                            const new_stocks = new stocks({
                                Purchase_List,
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
                    Purchase_List,
                    Purchase_Id,
                    Total_Quantity,
                    Measuring_Unit
                } = req.body;

                const new_stocks = new stocks({
                    Purchase_List,
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

router.post("/add-production", (req, res) => {
    const {
        _id,
        Raw_Material_Id,
        Raw_Material_Code,
        Quantity,
        Measuring_Unit,
        Id
    } = req.body;

    let flag = false;
    stocks.find({ Purchase_Id: Id }).then(data => {
        console.log('stock:', req.body)
        let stockReduce = data[0].Total_Quantity -= req.body.Quantity;
        if (stockReduce < 0) {
            stockReduce = 0;
        }
        stocks.findOneAndUpdate(
            { Purchase_Id: req.body._id },
            {
                $set: {
                    Total_Quantity: stockReduce
                }
            }
        ).then(reduced => {
            Production_Raw_Material_Stock.find({}).then(stock_entry => {
                for (let i = 0; i < stock_entry.length; i++) {
                    if (stock_entry[i].Raw_Material_Code === req.body.Raw_Material_Code) {
                        flag = true;
                        console.log("rmstoc:", Raw_Material_Code);
                        let new_stock = stock_entry[i].Quantity + req.body.Quantity;
                        Production_Raw_Material_Stock.findOneAndUpdate(
                            { Raw_Material_Code: req.body.Raw_Material_Code },
                            {
                                $set: {
                                    Quantity: new_stock
                                }
                            },
                            {
                                $push: {
                                    Id: _id
                                }
                            }
                        )
                            .then(stock_Quantity => {
                                console.log("Quantity added", stock_Quantity);
                                return res.send("Added successfully");
                            })
                            .catch(err => {
                                console.log('product not added in stock', err);

                            });
                    } else {
                        if (i === stock_entry.length - 1 && flag !== true) {
                            const new_Production_Raw_Material_Stock = new Production_Raw_Material_Stock(
                                {
                                    Raw_Material_Id,
                                    Raw_Material_Code,
                                    Quantity,
                                    Measuring_Unit,
                                    Id
                                }
                            );
                            new_Production_Raw_Material_Stock
                                .save()
                                .then(Production_Raw_Material_Stock => {
                                    return res.send('Stock added')
                                    console.log("stock added");
                                });
                        }
                    }
                }

                if (stock_entry.length === 0) {
                    console.log("add");
                    const new_Production_Raw_Material_Stock = new Production_Raw_Material_Stock(
                        {
                            Raw_Material_Id,
                            Raw_Material_Code,
                            Quantity,
                            Measuring_Unit
                            // Id_Type,
                            // Id: []
                        }
                    );
                    new_Production_Raw_Material_Stock
                        .save()
                        .then(Production_Raw_Material_Stock => {
                            console.log("stock added");
                        });
                }
            });
        })

    }).catch(err => {
        console.log('stock not reduce', err)
    })
})

module.exports = router