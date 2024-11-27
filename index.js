const express = require('express');
const mongoDbConnect = require('./config/database');
require("dotenv").config();

const userRoute = require("./routes/user.route");
const postRoute = require("./routes/post.route");

const app = express();
const PORT = process.env.PORT || 3500;
app.use(express.json());
mongoDbConnect()

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);

app.use((err, req, res, next) => {
    res.status(500).json({
        error: err.message
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});