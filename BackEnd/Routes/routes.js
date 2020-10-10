const express = require("express")
const { login, registration, getUsers } = require("../Controllers/server")
const router = express.Router()

router.get("/users", getUsers)

router.post("/user/login", login)

router.post("/user/register", registration)

module.exports = router