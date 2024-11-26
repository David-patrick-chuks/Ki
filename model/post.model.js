const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    like:[{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }],
    author: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
});

//Export the model
const Post = mongoose.model('Post', userSchema);
module.exports = Post