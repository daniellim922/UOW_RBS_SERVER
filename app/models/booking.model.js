const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Room",
    },
    date: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    start: {
        type: String,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    booked_by: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student",
    },
    promo: {
        type: String,
    },
    day: {
        type: String,
        required: true,
    },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
