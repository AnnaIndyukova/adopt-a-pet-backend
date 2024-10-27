const mongoose = require("mongoose");
const validator = require("validator");

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

const petSchema = new mongoose.Schema(
  {
    petNameID: {
      type: String,
      required: [true, "The 'pet ID' field is required"],
      maxlength: 30,
    },
    animalType: {
      type: String,
      required: [true, "The 'animal type' field is required"],
      enum: ["dog", "cat", "bird", "other"],
    },
    petAge: {
      type: String,
      required: [true, "The 'pet age' field is required"],
      enum: ["junior", "adult", "senior"],
    },
    petDescription: {
      type: String,
      required: [true, "The 'pet description' field is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "The 'image Url' field is required"],
      validate: {
        validator(value) {
          return validator.isURL(value);
        },
        message: "You must enter a valid URL",
      },
    },
    petStatus: {
      type: String,
      required: [true, "The 'pet status' field is required"],
      enum: ["available", "notAvailable"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "The owner field is required"],
    },
    shelter: {
      type: String,
      required: [true, "The shelter field is required"],
    },
    city: {
      type: String,
      required: [true, "The city field is required"],
    },
    coordinates: {
      type: coordinatesSchema,
      required: [true, "The coordinates field is required"],
    },
    shelterEmail: {
      type: String,
      required: [true, "The 'shelter Email' field is required"],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("pet", petSchema);
