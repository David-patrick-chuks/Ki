const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        unique: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    password: {
        type: String,
        required: true,
    },
});

//Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;