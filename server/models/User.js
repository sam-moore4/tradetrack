import mongoose from "mongoose";

const UserSchema = new mongoose.SchemaType(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },

    occupation: { type: String, required: false },
    phoneNumber: String,
    transactions: Array,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
