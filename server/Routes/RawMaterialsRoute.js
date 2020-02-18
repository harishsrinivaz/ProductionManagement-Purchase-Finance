const express = require('express');
const router = express.Router();
const RawMaterials = require('../Models/Raw_Materials');

router.get('/', (req, res, next) => {
    RawMaterials.find({}).then(RawMaterials => {
        res.send({ RawMaterials });
    });
});

module.exports = router;