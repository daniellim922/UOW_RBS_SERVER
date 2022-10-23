const express = require("express");
const router = express.Router();
const catchAsync = require("../../errors/catchAsync");

const room = require("./room.controller");

// middleware that is specific to this router
// router.use((func) => {
//     return (req, res, next) => {
//         func(req, res, next).catch(next);
//     };
// });
router
    .route("/")
    .get(catchAsync(room.allRooms))
    .delete(catchAsync(room.deleteRoom));

router.route("/room/create").post(catchAsync(room.create));
router
    .route("/room/launch")
    .get(catchAsync(room.allRooms))
    .post(catchAsync(room.makeRoomAvail));

module.exports = router;
