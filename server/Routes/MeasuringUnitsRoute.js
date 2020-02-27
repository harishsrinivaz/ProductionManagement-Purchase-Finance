const express = require('express');
const router = express.Router();
const MeasuringUnits = require('../Models/MeasuringUnits');

router.get('/', (req, res) => {
   MeasuringUnits.find({}).then(MeasuringUnits => {
      res.send({ MeasuringUnits });
   });
});

router.post('/', (req, res) => {
   MeasuringUnits.find({ _id: req.body._id }).then(MeasuringUnit => {
      res.send({ MeasuringUnit });
   });
});

router.post('/name', (req, res) => {
   MeasuringUnits.find({ _id: req.body._id }).then(munit => {
      res.send(munit[0].measuring_unit_name)
   })
})

module.exports = router;