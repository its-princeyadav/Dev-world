import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema(
  { title: String, description: String },
  { _id: false }
);

const ProcessStepSchema = new mongoose.Schema(
  { title: String, description: String },
  { _id: false }
);

const FaqSchema = new mongoose.Schema({ q: String, a: String }, { _id: false });

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    short: { type: String, required: true },
    icon: { type: String, default: "HiSparkles" },
    overview: { type: String, required: true },
    keyFeatures: [FeatureSchema],
    processSteps: [ProcessStepSchema],
    technologies: [String],
    faqs: [FaqSchema],
    seoTitle: String,
    seoDescription: String,
    ogImage: String,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
