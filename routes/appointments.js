const express = require("express")
const router = express.Router()
const { getAllappointments } = require("../controllers/appointments")
const { authorize } = require("../middlewares/authorization")

router.get("/", authorize, getAllappointments)

module.exports = router