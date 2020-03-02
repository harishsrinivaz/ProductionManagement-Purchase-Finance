const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    Purchase_Id: { type: String, required: true },
    Vendor: { type: String, required: true },
    Invoice_Amount: { type: Number, required: true },
    Invoice_Date: { type: Date, required: true },
    Invoice_Document: { type: Array, required: true }
})

const purchaseStock = mongoose.model('purchase_stock', stockSchema)

module.exports = purchaseStock;