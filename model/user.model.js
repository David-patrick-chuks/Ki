const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            //==> "*trim: true*" // Removes leading and trailing spaces from the string before saving.
            // (e.g., "  David Chuks  " becomes "David Chuks").
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true, // Ensures the email value is unique in the database (no duplicates allowed).
        },
        phone: {
            type: Number,
            required: [true, "Phone number is required"],
            unique: true, // Ensures the phone value is unique in the database (no duplicates allowed).

        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    {
        timestamps: true, // Automatically add `createdAt` and `updatedAt` timestamps 
    }
);

//This is a pre-save hook to log saving events 
userSchema.pre("save", function (next) {
    console.log("A new user is being saved:", this);
    next();
});

// Export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
