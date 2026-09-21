import mongoose from "mongoose";

const CareerApplicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true },
    linkedin: String,
    coverNote: { type: String, required: true },
    resumeUrl: String,
    status: {
      type: String,
      enum: ["new", "reviewing", "interviewing", "rejected", "hired"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.models.CareerApplication ||
  mongoose.model("CareerApplication", CareerApplicationSchema);
