import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  url: { type: String, required: true, trim: true },
  type: { type: String, enum: ["image", "video", "floorplan", "brochure"], default: "image" },
  title: { type: String, default: "" },
  alt: { type: String, default: "" },
  sortOrder: { type: Number, default: 0 },
}, { _id: false });

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 180 },
  slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
  type: { type: String, enum: ["Apartment", "Villa", "Plot", "Land", "Office", "Shop", "Showroom", "Warehouse", "Industrial", "Other"], default: "Apartment" },
  purpose: { type: String, enum: ["Sale", "Rent", "Resale", "New Project", "Commercial", "Land"], default: "Sale" },
  status: { type: String, enum: ["Draft", "Published", "Sold", "Rented", "Unavailable"], default: "Draft" },
  price: { type: Number, min: 0, default: 0 }, priceLabel: { type: String, trim: true, default: "" },
  location: { type: String, required: true, trim: true }, address: { type: String, trim: true, default: "" }, city: { type: String, trim: true, default: "" },
  bedrooms: { type: Number, min: 0, default: 0 }, bathrooms: { type: Number, min: 0, default: 0 }, area: { type: Number, min: 0, default: 0 }, areaUnit: { type: String, default: "sq.ft" },
  description: { type: String, default: "" },
  images: { type: [String], default: [] },
  media: { type: [MediaSchema], default: [] },
  amenities: { type: [String], default: [] },
  highlights: { type: [String], default: [] },
  nearby: { type: [{ name: String, distance: String, category: String }], default: [] },
  faqs: { type: [{ question: String, answer: String }], default: [] },
  floorPlans: { type: [{ name: String, image: String, area: String }], default: [] },
  developer: { type: String, default: "" }, possession: { type: String, default: "" }, reraNumber: { type: String, default: "" }, mapUrl: { type: String, default: "" },
  featured: { type: Boolean, default: false },
  seoTitle: { type: String, default: "" }, seoDescription: { type: String, default: "" }, seoKeywords: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.models.Property || mongoose.model("Property", PropertySchema);
