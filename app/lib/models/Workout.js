import mongoose from "mongoose";

const WorkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      maxLength: 25,
    },
    workoutType: {
      type: String,
      required: true,
    },
    notes: { type: String, maxLength: 500 },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
        weight: { type: Number },
      },
    ],
    date: { type: Date, required: true },
    duration: Number,
    caloriesBurnt: Number,
    avgHeartRate: Number,
  },
  { timestamps: true }
);

export default mongoose.models.Workout ||
  mongoose.model("Workout", WorkoutSchema);
