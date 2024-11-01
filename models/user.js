const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const coordinatesSchema = new mongoose.Schema(
  {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name field is required"],
      minlength: 2,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "The email field is required"],
      unique: true,
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },
        message: "You must enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "The password field is required"],
      select: false,
    },
    city: {
      type: String,
      required: [true, "The city field is required"],
    },
    coordinates: {
      type: coordinatesSchema,
      required: [true, "The coordinates field is required"],
    },
    userType: {
      type: String,
      required: [true, "The 'user type' field is required"],
      enum: ["shelter", "petParent"],
    },
  },
  { timestamps: true },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
