const express = require("express")
const { login, registration, postTransaction } = require("../Controllers/server")
const router = express.Router()

router.post("/user/login", login)

router.post("/user/register", registration)

router.post("/user/transaction", postTransaction)

module.exports = router
