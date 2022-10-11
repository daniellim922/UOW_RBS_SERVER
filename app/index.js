const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ExpressError = require("./errors/ExpressError");

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect("mongodb://localhost:27017/UOW_RBS");

    // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use(require("./site/router"));
app.use("/api/login", require("./api/login/login.router"));
app.use("/api/user", require("./api/user/user.router"));

// Error Handling
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message =
            "Something went wrong, inform media team on the bug you experienced";
    }
    res.status(statusCode).render("error", { err });
});
// app.use(require("./errors/*"));

module.exports = app;
