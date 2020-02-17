const reqDetails = require('../Models/Request_Details');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
router.get('/', (req, res) => {
    reqDetails.find({}, function (err, data) {
        if (err) throw err;
        res.send(data);

    })
})

router.post('/', (req, res) => {
    if (req.body.deleteID) {
        var deleteID = req.body.deleteID;
        reqDetails.findByIdAndUpdate({ _id: deleteID },
            {
                $set: {
                    Status: "Rejected"
                }
            }, { useFindAndModify: false },
            function (err) {
                if (err) { throw err }
                else { console.log("Document " + deleteID + " is rejected") }
            })
    }
    if (req.body.Edit) {
        var _Id = req.body.Edit._id;
        var vendor = req.body.Edit.vendor;
        var amount = req.body.Edit.amount;
        var qURL = req.body.Edit.quotationURL;
        var quantity = req.body.Edit.quantity;
        var munit = req.body.Edit.munit;
        reqDetails.findByIdAndUpdate(
            {
                _id: _Id
            },
            {
                $set: {
                    Quantity: quantity,
                    Measuring_Unit: munit,
                    Vendor: vendor,
                    Total_Price: amount,
                    Quotation_Document_URL: qURL
                }
            }, { useFindAndModify: false }, function (err) {
                if (err) { throw err }
                else {
                    console.log("_id:", _Id, " vendor: ", vendor, " amount: ", amount,
                        "quotationURL: ", qURL)
                }
            })
    }

    if (req.body.Status) {
        var _Id = req.body.Status._id;
        var status = req.body.Status.status;
        console.log("Status: ", status)
        reqDetails.findByIdAndUpdate({ _id: _Id },
            {
                $set: {
                    Status: status
                }

            }, { useFindAndModify: false }, function (err) {
                if (err) { throw err }
                else { console.log(status) }
            })
    }

})

module.exports = router;