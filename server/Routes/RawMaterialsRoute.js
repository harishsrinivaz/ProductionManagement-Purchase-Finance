const express = require('express');
const router = express.Router();
const RawMaterials = require('../Models/Raw_Materials');

router.get('/', (req, res, next) => {
    RawMaterials.find({}).then(RawMaterials => {
        res.send(RawMaterials);
    });
});

router.post('/', (req, res, next) => {
    RawMaterials.find({ _id: req.body._id }).then(RawMaterials => {
        res.send(RawMaterials);
    });
});

router.post('/name', (req, res) => {
    RawMaterials.find({ _id: req.body._id }).then(RawMaterial => {
        res.send(RawMaterial[0].raw_material_name)
    })
})

module.exports = router;