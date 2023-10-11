const express = require("express");

const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

const cors = require("cors");

const app = express();

const RegisterUser = require("./model");

const middleware = require("./middleware");

app.use(express.json());

app.use(cors({ origin: "*" }));

mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect"))
  .catch((err) => console.log(err));

app.post("/signup", async (req, res) => {
  try {
    const { username, email, password, confirmpassword } = req.body;

    let exist = await RegisterUser.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    if (password !== confirmpassword) {
      return res.status(400).json({ message: "Passwords are not matching" });
    }
    let newUser = new RegisterUser({
      username,
      email,
      password,
      confirmpassword,
    });
    await newUser.save();
    res.status(200).json({ message: "Registered Successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let exist = await RegisterUser.findOne({ email });
    if (!exist) {
      return res.status(400).json({ message: "User Not Found" });
    }
    if (exist.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token, message: "You are login successfully" });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

app.get("/userdetails", middleware, async (req, res) => {
  try {
    let exist = await RegisterUser.findById(req.user.id);
    if (!exist) {
      return res.status(400).json({ message: "User Not Found" });
    }
    res.json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server Error" });
  }
});

app.listen(4000, () => console.log("server is started"));