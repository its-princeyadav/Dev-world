import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({ label: String, value: String }, { _id: false });

const CaseStudySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    client: { type: String, required: true },
    category: { type: String, required: true },
    coverImage: String,
    summary: { type: String, required: true },
    challenge: { type: String, required: true },
    solution: { type: String, required: true },
    results: [ResultSchema],
    relatedProject: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.CaseStudy ||
  mongoose.model("CaseStudy", CaseStudySchema);
