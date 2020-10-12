const express = require("express")
const { login, registration, postTransaction, logout, getTransactions, getPagination } = require("../Controllers/server")
const router = express.Router()

router.post("/user/login", login)

router.post("/user/logout", logout)

router.post("/user/register", registration)

router.post("/user/transaction", postTransaction)

router.get("/user/transactions", getTransactions)

router.get("/user/transactions/pagination", getPagination)

module.exports = router
