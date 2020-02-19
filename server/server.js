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
app.use('/request_details', require('./Routes/ReqDetailsRoute'))
app.use('/users', require('./Routes/UsersRoute'))
app.use('/roles', require('./Routes/RolesRoute'))
app.use('/raw_materials', require('./Routes/RawMaterialsRoute'))
app.use('/vendors', require('./Routes/VendorsRoute'))

app.listen(PORT, () => { console.log('Server running...') })