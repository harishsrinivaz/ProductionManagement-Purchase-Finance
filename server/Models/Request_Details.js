const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    Raw_Material_Id: { type: String, required: true },
    Raw_Material_Code: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Measuring_Unit: { type: String, required: true },
    Vendor: { type: String, required: true },
    Total_Price: { type: Number, required: true },
    Priority: { type: String, required: true },
    Due_Date: { type: Date, required: true },
    Quotation_Document_URL: { type: Array, required: true },
    Status: { type: String, required: true },
    Entry_Date: { type: Date, default: Date.now, required: true },
    Comments: { type: String }
}
);

const reqDetails = mongoose.model('Request_Details', schema);

module.exports = reqDetails;   