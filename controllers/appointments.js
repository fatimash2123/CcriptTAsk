const asyncHandler = require("express-async-handler");

const appointments = [
    {
        reason: "Lorem Ipsum",
        day: "monday",
        start: "8 AM",
        end: "10 AM"
    },
    {
        reason: "Lorem Ipsum",
        day: "wednesday",
        start: "11 AM",
        end: "12 PM"
    }
];
const getAllappointments = asyncHandler((req, res) => {
    res.status(200).json({ user: req.user.username, appointments })
})

module.exports = { getAllappointments };