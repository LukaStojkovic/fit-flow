import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, maxLength: 25 },
    email: {
      type: String,
      unique: true,
    },
    hashedPassword: {
      type: String,
    },
    image: {
      type: String,
    },
    workouts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout",
      },
    ],
    weight: {
      type: Number,
      max: 650,
    },
    height: {
      type: Number,
      max: 300,
    },
    gender: {
      type: String,
      enum: ["female", "male"],
    },
    age: {
      type: Number,
      max: 99,
    },
    weightHistory: {
      type: [
        {
          date: { type: Date },
          weight: { type: Number },
        },
      ],
      default: [],
      _id: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
