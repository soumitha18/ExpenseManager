const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
  transactionValidation,
} = require("../Validation/validation");
const User = require("../models/user");
const UserTransaction = require("../models/transaction");

const registration = async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).json(error.details[0].message);
    return;
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
    res.json({ res: "registration is successful" });
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json("Invalid Email");
  }

  user.active = true;
  user.save();

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json("Invalid password");
  res.json({ res: "logged in", user });
};

const logout = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  user.active = false;
  user.save();

  res.json({ res: "logged Out", user });
};

const postTransaction = async (req, res) => {
  const { error } = transactionValidation(req.body);
  if (error !== undefined) {
    return res.status(400).json(error.details[0].message);
  }

  const newTransaction = new UserTransaction({
    user_id: req.body.user_id,
    title: req.body.title,
    type: req.body.type,
    amount: req.body.amount,
  });

  try {
    const saveTransaction = await newTransaction.save();
    res.send(saveTransaction);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getTransactions = async (req, res) => {
  let result = {};

  try {
    await UserTransaction.find({ user_id: req.query.user }).then(
      (transactions) => {
        temp = transactions;

        if (transactions.length > 5)
          result.transaction = temp.slice(
            transactions.length - 5,
            transactions.length
          );
        else result.transaction = temp;
        result.total_income = transactions
          .filter((item) => item.type === "Credit")
          .reduce((a, c) => a + c.amount, 0);
        result.total_expense = transactions
          .filter((item) => item.type === "Debit")
          .reduce((a, c) => a + c.amount, 0);
        result.balance = result.total_income - result.total_expense;
        res.json(result);
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};

const getPagination = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const type = req.query.type || "All";
  const user_id = req.query.user;
  const limit = 20;
  let result = {};

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  // const totalCount = await UserTransaction.find({ user_id }).countDocuments().exec()
  // result.totalCount = totalCount

  try {
    await UserTransaction.find({ user_id }).then((transactions) => {
      temp = transactions;

      switch (type) {
        case "Debit":
          temp = temp.filter((item) => item.type === "Debit");
          length = temp.length
          result.total_count = length;
          if (endIndex < length) {
            result.next = {
              page: page + 1,
            };
          }

          if (startIndex > 0) {
            result.prev = {
              page: page - 1,
            };
          }
          result.current = temp.slice(startIndex, endIndex);
          break;
        case "Credit":
          temp = temp.filter((item) => item.type === "Credit");
          length = temp.length;
          result.total_count = length;
          if (endIndex < length) {
            result.next = {
              page: page + 1,
            };
          }

          if (startIndex > 0) {
            result.prev = {
              page: page - 1,
            };
          }
          result.current = temp.slice(startIndex, endIndex);
          break;
        default:
          length = temp.length;
          result.total_count = length;
          if (endIndex < length) {
            result.next = {
              page: page + 1,
            };
          }

          if (startIndex > 0) {
            result.prev = {
              page: page - 1,
            };
          }
          result.current = temp.slice(startIndex, endIndex);
      }
      res.json(result);
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  registration,
  login,
  logout,
  postTransaction,
  getTransactions,
  getPagination,
};
