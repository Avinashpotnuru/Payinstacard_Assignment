const mongoose = require("mongoose");

const RegisterUser = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value.length >= 3;
      },
      message: "Name must be at least 3 characters long",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,

    validate: {
      validator: function (value) {
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        return emailRegex.test(value);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmpassword: {
    type: String,
    required: true,
    minLength: 8,
  },
});

module.exports = mongoose.model("RegisterUser", RegisterUser);
