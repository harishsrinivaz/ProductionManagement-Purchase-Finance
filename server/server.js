const express = require('./node_modules/express');
const PORT = 5000;
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
require('./Config/Passport')(passport);

mongoose.connect('mongodb+srv://harish:mongo123@cluster0-6kohd.mongodb.net/ProductionManagement?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('DB Connected'))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use('/request-details', require('./Routes/request_details'))
app.use('/users', require('./Routes/UsersRoute'))
app.use('/roles', require('./Routes/RolesRoute'))
app.use('/raw-material', require('./Routes/raw_material'))
app.use('/vendors', require('./Routes/VendorsRoute'))
app.use('/logs', require('./Routes/LogsRoute'))
app.use('/measuring-unit', require('./Routes/measuringUnit'))
app.use('/files', require('./Routes/FilesRoute'))
app.use('/purchase-stocks', require('./Routes/PurchaseStocksRoute'))
app.use('/purchase-wastages', require('./Routes/PurchaseWastagesRoute'))
app.use('/production', require('./Routes/production_raw_material_stock'))

app.listen(PORT, () => { console.log('Server running...') }) 