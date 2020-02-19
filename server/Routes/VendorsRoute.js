const express = require('express');
const router = express.Router();
const Vendors = require('../Models/Vendors');

router.get('/', (req, res, next) => {
    Vendors.find({}).then(Vendors => {
        res.send({ Vendors });
    });
});

router.post('/', (req, res) => {
    Vendors.find({ _id: req.body._id })
        .then(Vendor => {
            res.send({ Vendor });
        })
        .catch(err => {
            res.send('Problem Loading vendor');
        });
});

module.exports = router;