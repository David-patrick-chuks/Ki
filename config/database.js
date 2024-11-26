const mongoose = require('mongoose');

const mongoDbConnect = () => {
    const con = mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Database connected successfully'))
    .catch(err => console.log('Database connection failed', err))
}

module.exports = mongoDbConnect;