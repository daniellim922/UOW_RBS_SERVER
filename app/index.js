const express = require("express");
const app = express();
const cors = require("cors");
const ExpressError = require("./errors/ExpressError");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());

app.use(require("./site/router"));
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
