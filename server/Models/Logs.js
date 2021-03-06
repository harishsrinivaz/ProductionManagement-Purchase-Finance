const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
    // Employee_Id: { type: String, required: true },
    Request_Id: { type: String, required: true },
    Address: {
        From: { type: String, required: true },
        To: { type: String, required: true }
    },
    Entry_Date: { type: Date, default: Date.now, required: true },
    Comments: { type: String }
})

const Logs = mongoose.model('Logs', logSchema);

module.exports = Logs;