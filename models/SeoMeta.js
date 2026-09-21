import mongoose from "mongoose";

const SeoMetaSchema = new mongoose.Schema(
  {
    pageKey: { type: String, required: true, unique: true },
    title: String,
    description: String,
    ogImage: String,
  },
  { timestamps: true }
);

export default mongoose.models.SeoMeta || mongoose.model("SeoMeta", SeoMetaSchema);
