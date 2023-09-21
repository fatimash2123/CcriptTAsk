const express = require("express")
const router = express.Router()
const { loginUser, refreshToken } = require("../controllers/authentication")
const { authorize } = require("../middlewares/authorization")

router.post("/login", loginUser)
router.get("/refresh-token", authorize, refreshToken)

module.exports = router