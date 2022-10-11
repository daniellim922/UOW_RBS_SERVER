const express = require("express");
const router = express.Router();

const login = require("./login.controller");

// middleware that is specific to this router
// router.use((req, res, next) => {
//     console.log("Time: ", Date.now());
//     next();
// });
router.route("/").get(login.home);

module.exports = router;
