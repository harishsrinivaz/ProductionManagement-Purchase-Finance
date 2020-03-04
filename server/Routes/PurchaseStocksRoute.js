const express = require("express");
const router = express.Router();
const stocks = require("../Models/Purchase_Stocks");

router.get("/", (req, res) => {
    stocks.find({}).then(stock => {
        res.send({ stock });
    });
});

router.post("/add", (req, res) => {
    const {
        Purchase_Id,
        Vendor,
        Invoice_Quantity,
        Measuring_Unit,
        Invoice_Amount,
        Invoice_Date,
        Status
    } = req.body;

    const new_stocks = new stocks({
        Purchase_Id,
        Vendor,
        Invoice_Quantity,
        Measuring_Unit,
        Invoice_Amount,
        Invoice_Date,
        Status
    });
    new_stocks.save().then(stocks => {
        console.log("added");
        return res.send(stocks);
    });
    // res.send("added successfully");
});

module.exports = router