const express = require('express');
const mongoDbConnect = require('./config/database');
require("dotenv").config();

const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");

const app = express();
const PORT = process.env.PORT || 3500;
mongoDbConnect()

app.use("api/v1/user", userRoute);
app.use("api/v1/post", postRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});