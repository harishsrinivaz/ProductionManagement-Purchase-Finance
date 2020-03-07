const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    Purchase_Id: { type: String, required: true },
    Invoice_Quantity: { type: Number, required: true },
    Measuring_Unit: { type: String, required: true },
    Id_Type: { type: String },
    Id: { type: Array },
    Invoice_Amount: { type: Number, required: true },
    Invoice_Date: { type: Date, required: true },
    Invoice_Document: { type: Array, required: true },
    Total_Quantity: { type: Number, required: true },
    Unit: { type: String, required: true }
})

const purchaseStock = mongoose.model('purchase_stock', stockSchema)

module.exports = purchaseStock; 