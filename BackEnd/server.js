const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();

const useRouter = require("./Routes/routes");

app.use(express.json());
app.use(cors());
mongoose.connect(
  process.env.ATLAS_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
    console.log("Database is connected");
  }
);

app.use("/", useRouter);

app.listen(5000, () => {
  console.log(`SERVER RUNNING! 5000`);
});
