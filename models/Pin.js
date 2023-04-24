const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
      max: 60,
    },
    descr: {
      type: String,
      required: false,
      min: 3,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    long: {
      type: Number,
      required: true,
    },
    lat: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);