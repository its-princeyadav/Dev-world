import mongoose from "mongoose";

const TechnologySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    logo: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Technology ||
  mongoose.model("Technology", TechnologySchema);
