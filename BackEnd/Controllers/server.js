const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../Validation/validation");
const User = require("../models/user")

const registration = async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        res.status(400).json({ res: error.details[0].message });
        return
    }

    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).json({ res: "Account already exists" });
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
        res.json({ res: "registration is successful", savedUser });
    } catch (err) {
        res.status(400).json({ res: err });
    }
}

const login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json({ res: error.details[0].message });
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ res: "Invalid Email" });
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ res: "Invalid password" });
    res.json({ res: "logged in", user });
}

const getUsers = async (req, res) => {
    console.log("yes")
}

module.exports = { registration, login, getUsers }