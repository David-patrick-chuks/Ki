const mongoose = require("mongoose");
const User = require("../model/user.model");
const mongoDbConnect = require("../config/database");


mongoDbConnect()
async function findDuplicates() {
    try {
        // Find duplicate emails in the database
        const emailDuplicates = await User.aggregate([
            { $group: { _id: "$email", count: { $sum: 1 } } },
            { $match: { count: { $gt: 1 } } }
        ]);

        console.log("Duplicate Emails:", emailDuplicates);
        // Find duplicate phone numbers in the database
        const phoneDuplicates = await User.aggregate([
            { $group: { _id: "$phone", count: { $sum: 1 } } },
            { $match: { count: { $gt: 1 } } }
        ]);

        console.log("Duplicate Phones:", phoneDuplicates);
    } catch (err) {
        console.error("Error finding duplicates:", err);
    } finally {
        mongoose.connection.close();
    }
}

findDuplicates();

///==> "npm run find" which will log the results of the search query