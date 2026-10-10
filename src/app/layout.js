import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import SmoothScroll from "@/Components/SmoothScroll";
import SiteStructuredData from "@/Components/SiteStructuredData";

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Butterfly Homes | Premium Real Estate",
    template: "%s | Butterfly Homes",
  },
  description:
    "Discover homes, new projects, resale properties, rentals, commercial spaces, plots and land with Butterfly Homes.",
  openGraph: {
    type: "website",
    siteName: "Butterfly Homes",
    title: "Butterfly Homes | Real Estate & Property Advisory",
    description:
      "Explore new properties, resale homes, rentals, commercial real estate, farm plots and land.",
  },
  twitter: { card: "summary_large_image" },
  applicationName: "Butterfly Homes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <SiteStructuredData />
        <SmoothScroll />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
