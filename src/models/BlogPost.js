import mongoose from "mongoose";
const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  excerpt: { type: String, default: "", maxlength: 500 },
  content: { type: String, required: true, default: "" },
  coverImage: { type: String, default: "/project1.jpg" },
  category: { type: String, default: "Property Guide" },
  author: { type: String, default: "Butterfly Homes Editorial Team" },
  status: { type: String, enum: ["Draft", "Published"], default: "Draft" },
  publishedAt: { type: Date, default: null },
  seoTitle: { type: String, default: "" },
  seoDescription: { type: String, default: "" },
  focusKeyword: { type: String, default: "" },
  faq: { type: [{ question: String, answer: String }], default: [] },
}, { timestamps: true });
export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
