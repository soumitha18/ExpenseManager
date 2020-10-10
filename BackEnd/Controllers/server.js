const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation, transactionValidation } = require("../Validation/validation");
const User = require("../models/user")
const UserTransaction = require("../models/transaction");
const transaction = require("../models/transaction");
const e = require("express");

const registration = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        res.status(400).json(error.details[0].message);
        return
    }

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json("Account already exists");
    }

    const hashedPassword = await bcrypt.hash(
        req.body.password,
        await bcrypt.genSalt(10)
    );
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        res.json("registration is successful");
    } catch (err) {
        res.status(400).json(err);
    }
}

const login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json("Invalid Email");
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json("Invalid password");
    res.json({ res: "logged in", user });
}

const postTransaction = async (req, res) => {
    const { error } = transactionValidation(req.body);
    if (error !== undefined) {
        return res.status(400).json(error.details[0].message)
    }

    const newTransaction = new UserTransaction({
        user_id: req.body.user_id,
        title: req.body.title,
        type: req.body.type,
        amount: req.body.amount,
    })

    try {
        const saveTransaction = await newTransaction.save()
        res.send(saveTransaction)
    } catch (err) {
        res.status(400).send(err)
    }

}

const getTransactions = (req, res) => {
    let result = {}
    try {
        UserTransaction.find()
            .then(transactions => {
                temp = transactions
                if (transactions.length > 5)
                    result.transaction = temp.slice(transactions.length - 5, transactions.length)
                else
                    result.transaction = temp
                res.json(result)
            })
    } catch (err) {
        res.status(400).send(err)
    }
}

module.exports = { registration, login, postTransaction, getTransactions }