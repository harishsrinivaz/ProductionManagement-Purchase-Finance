const express = require("express");
const router = express.Router();
const purchaseWastages = require("../Models/Purchase_Wastages");

router.get("/", (req, res) => {
  Production_Wastages.find({}, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});
router.post("/", (req, res) => {
  Production_Wastages.find({ _id: req.body._id }, function (err, data) {
    if (err) throw err;
    res.send(data);
  });
});
router.post("/add", (req, res) => {
  console.log("wastage list");
  const {
    Raw_Material_Id,
    Quantity,
    Id_Type,
    Id,
    Measuring_Unit,
    Wastage_Date,
    Description
  } = req.body;
  console.log(req.body);
  let error = [req.body.error];

  const new_Production_Wastages = new Production_Wastages({
    Wastage_Type,
    Product_Name,
    Raw_Material_Id,
    Quantity,
    Id_Type,
    Id,
    Measuring_Unit,
    Wastage_Date,
    Description
  });
  new_Production_Wastages.save().then(Wastage => {
    return res.send(Wastage);
  });
});

router.post("/delete", (req, res, next) => {
  Production_Wastages.findOneAndDelete({ _id: req.body._id }).then(Wastage => {
    res.send(Wastage);
  });
});
router.post("/edit", (req, res) => {
  const {
    _id,
    Raw_Material_Name,
    Raw_Material_Id,
    Quantity,
    Id_Type,
    Id,
    Measuring_Unit,
    Wastage_Date,
    Description
  } = req.body;

  Production_Wastages.findOneAndUpdate(
    { _id },
    {
      Raw_Material_Name,
      Raw_Material_Id,
      Quantity,
      Id_Type,
      Id,
      Measuring_Unit,
      Wastage_Date,
      Description
    }
  ).then(Wastage => {
    res.send(Wastage);
    console.log("updated");
  });
});

module.exports = router;
