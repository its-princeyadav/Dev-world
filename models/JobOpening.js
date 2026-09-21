import mongoose from "mongoose";

const JobOpeningSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    department: String,
    location: String,
    type: { type: String, default: "Full-time" },
    description: String,
    requirements: [String],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.JobOpening ||
  mongoose.model("JobOpening", JobOpeningSchema);
