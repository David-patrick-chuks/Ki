require("dotenv").config();
const mongoose = require("mongoose");

const deleteDatabase = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.DATA_CONNECTION_STRING);
        console.log("Connected to the database.");

        // Drop the database
        const db = mongoose.connection.db;
        await db.dropDatabase();
        console.log("Database deleted successfully.");
    } catch (err) {
        console.error("Error deleting the database:", err);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
};

deleteDatabase();

///==> "npm run delete"

/// Script to delete the database:
/// This is necessary because I currently don't have access to the database, 
/// and I need to delete the existing data before we can insert new documents.

/// Issue Explanation:
/// The error we're encountering occurs because we're trying to create a new document 
/// with a `null` value for the `phone` field (i.e., `phone: null`), which already exists 
/// in the database. The issue stems from the schema itself: 
/// - You’ve set the `phone` field to be unique, 
/// - But you're attempting to insert a new document with `null` as the `phone` value, 
///   which already exists in the database, causing a **duplicate** error.
/// 
/// MongoDB enforces uniqueness for indexed fields, so when a duplicate value (like `null`) 
/// for a unique field is inserted, it throws an error because the index already exists. 
/// Essentially, Mongoose is alerting you that you’re trying to create a duplicate document, 
/// and the unique index constraint is causing the error.

/// Solution:
/// - Always validate all fields before inserting new documents to ensure there are no 
///   conflicting or duplicate values.
/// - You can also use a validation library like **Joi** to automatically validate input 
///   before inserting it into the database.


/// Read the documentation
// https://www.mongodb.com/docs/manual/core/index-unique/