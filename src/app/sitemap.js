import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import BlogPost from "@/models/BlogPost";
import SiteSettings from "@/models/SiteSettings";
export const dynamic = "force-dynamic";
export default async function sitemap() {
  let base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  const fixed = ["", "/properties", "/new-properties", "/resale", "/rent", "/commercial", "/land", "/about", "/locations", "/blog", "/contact", "/sell", "/privacy", "/terms"];
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({ key: "global" }).lean();
    if (settings?.canonicalBaseUrl) base = settings.canonicalBaseUrl.replace(/\/$/, "");
    const [properties, posts] = await Promise.all([
      Property.find({ status: "Published" }).select("slug updatedAt").lean(),
      BlogPost.find({ status: "Published" }).select("slug updatedAt publishedAt").lean(),
    ]);
    return [
      ...fixed.map(path => ({ url: `${base}${path}`, lastModified: new Date(), changeFrequency: path === "" ? "daily" : "weekly", priority: path === "" ? 1 : 0.7 })),
      ...properties.map(p => ({ url: `${base}/properties/${p.slug}`, lastModified: p.updatedAt || new Date(), changeFrequency: "weekly", priority: 0.8 })),
      ...posts.map(p => ({ url: `${base}/blog/${p.slug}`, lastModified: p.updatedAt || p.publishedAt || new Date(), changeFrequency: "monthly", priority: 0.65 })),
    ];
  } catch {
    return fixed.map(path => ({ url: `${base}${path}`, lastModified: new Date() }));
  }
}
