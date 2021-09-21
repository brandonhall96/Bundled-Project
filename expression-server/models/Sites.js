require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const siteSchema = new Schema({
    title: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    date: { 
        type: String,
    },
    siteNumber: { 
        type: Number,
    },
    nights: {
        type: Number
    }

});

const Site = mongoose.model('Site', siteSchema);
module.exports = Site;