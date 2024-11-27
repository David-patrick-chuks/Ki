require("dotenv").config();
const mongoose = require('mongoose');

const mongoDbConnect = () => {
    const con = mongoose.connect(process.env.DATA_CONNECTION_STRING)
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log('Database connection failed', err))
}

module.exports = mongoDbConnect;