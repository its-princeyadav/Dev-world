import mongoose from "mongoose";

const HeroBannerSchema = new mongoose.Schema(
  {
    pageKey: { type: String, required: true, unique: true },
    eyebrow: String,
    heading: { type: String, required: true },
    subheading: String,
    mediaUrl: String,
    ctaLabel: String,
    ctaHref: String,
  },
  { timestamps: true }
);

export default mongoose.models.HeroBanner ||
  mongoose.model("HeroBanner", HeroBannerSchema);
