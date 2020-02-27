const reqDetails = require('../Models/Request_Details');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    reqDetails.find({}, function (err, data) {
        if (err) throw err;
        res.send(data);

    })
})

router.post('/', (req, res) => {
    if (req.body.Edit) {
        var _Id = req.body.Edit._id;
        var vendor = req.body.Edit.Vendor;
        var amount = req.body.Edit.Total_Price;
        var qURL = req.body.Edit.quotationURL;
        var quantity = req.body.Edit.Quotation;
        var munit = req.body.Edit.Measuring_Unit;
        var status = req.body.Edit.Status;
        var comments = req.body.Edit.Comments;
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
                    Quotation_Document_URL: qURL,
                    Status: status,
                    Comments: comments
                }
            }, { useFindAndModify: false }, function (err) {
                if (err) { throw err }
                else {
                    console.log("_id:", _Id, " vendor: ", vendor, " amount: ", amount,
                        "quotationURL: ", qURL, " status: ", status)
                }
            })
    }
})

module.exports = router;