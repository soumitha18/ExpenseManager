const express = require("express")
const { login, registration, postTransaction, logout } = require("../Controllers/server")
const router = express.Router()

router.post("/user/login", login)

router.post("/user/logout", logout)

router.post("/user/register", registration)

router.post("/user/transaction", postTransaction)

module.exports = router
