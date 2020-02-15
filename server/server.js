const express = require('./node_modules/express');
const PORT = 5000;
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb+srv://harish:mongo123@cluster0-6kohd.mongodb.net/ProductionManagement?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('DB Connected'))

const schema = new Schema({
    Raw_Material_Id: { type: String, required: true },
    Raw_Material_Name: { type: String, required: true },
    Quantity: { type: Number, required: true },
    Measuring_Unit: { type: String, required: true },
    Vendor: { type: String, required: true },
    Total_Price: { type: Number, required: true },
    Priority: { type: String, required: true },
    Due_Date: { type: Date, required: true },
    Quotation_Document_URL: [{ type: String, required: true }],
    Status: { type: String, required: true },
    Invoice_Date: { type: Date, required: true },
    Invoice_Amount: { type: Number, required: true },
    Invoice_Document_URL: [{ type: String, required: true }]
}
);

var reqDetails = mongoose.model('Request_Details', schema);

// reqDetails.create({
//     Raw_Material_Id: '1',
//     Raw_Material_Name: 'Apple',
//     Quantity: '500',
//     Measuring_Unit: 'kg',
//     Vendor: 'XYZ',
//     Total_Price: 100000,
//     Priority: 'High',
//     Due_Date: 2020 - 12 - 27,
//     Quotation_Document_URL: ['C:\\User\\Admin\\Quotation1.pdf', 'C:\\User\\Admin\\Quotation2.pdf'],
//     Status: 'Accept',
//     Invoice_Date: 2021 - 01 - 10,
//     Invoice_Amount: 100000,
//     Invoice_Document_URL: ['C:\\User\\Admin\\Invoice1.pdf', 'C:\\User\\Admin\\Invoice2.pdf']
// }, function (err) { if (err) throw err })

app.use(express.json())

app.get('/home', (req, res) => {
    reqDetails.find({}, function (err, data) {
        if (err) throw err;
        res.send(data);

    })
})
app.post('/home', (req, res) => {
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
app.listen(PORT, () => { console.log('Server running...') })