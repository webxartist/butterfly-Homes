import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin, Phone, Mail, Clock } from "lucide-react";
import connectDB from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

export default async function Footer() {
  let s = {};

  try {
    await connectDB();
    s = (await SiteSettings.findOne({ key: "global" }).lean()) || {};
  } catch {}

  const propertyLinks = [
    ["Buy a home", "/properties"],
    ["New properties", "/new-properties"],
    ["Resale properties", "/resale"],
    ["Rent a property", "/rent"],
    ["Commercial spaces", "/commercial"],
    ["Farm plots & land", "/land"],
  ];

  const companyLinks = [
    ["Our story", "/about"],
    ["Locations", "/locations"],
    ["Property journal", "/blog"],
    ["Contact us", "/contact"],
  ];

  return (
    <footer className="relative overflow-hidden bg-[#10142d] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="container-butterfly relative py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_.8fr_.8fr_1fr]">
          {/* =====================================================
              BRAND
          ====================================================== */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white">
                <Image
                  src="/logo.png"
                  alt="Butterfly Homes"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </span>

              <span>
                <span className="block text-xl font-bold">
                  {s.siteName || "Butterfly Homes"}
                </span>

                <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[.25em] text-teal-200">
                  Find your place to belong
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              {s.footerText ||
                "Thoughtful real estate guidance for buying, investing, renting and finding spaces that fit your next chapter."}
            </p>

            {/* =================================================
                SOCIAL LINKS
            ================================================== */}
            <div className="mt-6 flex flex-wrap gap-3">
              {/* Instagram */}
              {s.instagram && (
                <a
                  aria-label="Instagram"
                  href={s.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sm font-bold text-white/70 transition hover:border-teal-200 hover:text-teal-200"
                >
                  <span className="transition-transform group-hover:scale-110">
                    IG
                  </span>
                </a>
              )}

              {/* Facebook */}
              {s.facebook && (
                <a
                  aria-label="Facebook"
                  href={s.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sm font-bold text-white/70 transition hover:border-teal-200 hover:text-teal-200"
                >
                  <span className="transition-transform group-hover:scale-110">
                    f
                  </span>
                </a>
              )}

              {/* LinkedIn */}
              {s.founderLinkedIn && (
                <a
                  aria-label="LinkedIn"
                  href={s.founderLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xs font-bold text-white/70 transition hover:border-teal-200 hover:text-teal-200"
                >
                  <span className="transition-transform group-hover:scale-110">
                    in
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* =====================================================
              PROPERTY LINKS
          ====================================================== */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[.2em] text-teal-200">
              Explore properties
            </h2>

            <ul className="mt-5 space-y-3">
              {propertyLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
                  >
                    {label}

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* =====================================================
              COMPANY
          ====================================================== */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[.2em] text-teal-200">
              The company
            </h2>

            <ul className="mt-5 space-y-3">
              {companyLinks.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
                  >
                    {label}

                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-7 text-xs leading-6 text-white/45">
              {s.footerNote ||
                "Property information is subject to verification. Availability, pricing and approvals should be confirmed before making a decision."}
            </p>
          </div>

          {/* =====================================================
              CONTACT
          ====================================================== */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[.2em] text-teal-200">
              Let's connect
            </h2>

            <div className="mt-5 space-y-4 text-sm text-white/65">
              {s.address && (
                <p className="flex gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-teal-200" />

                  <span>{s.address}</span>
                </p>
              )}

              {s.phone && (
                <a
                  href={`tel:${s.phone}`}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Phone size={16} className="text-teal-200" />
                  {s.phone}
                </a>
              )}

              {s.email && (
                <a
                  href={`mailto:${s.email}`}
                  className="flex items-center gap-3 transition hover:text-white"
                >
                  <Mail size={16} className="text-teal-200" />
                  {s.email}
                </a>
              )}

              {s.officeHours && (
                <p className="flex gap-3">
                  <Clock size={16} className="mt-0.5 shrink-0 text-teal-200" />

                  <span>{s.officeHours}</span>
                </p>
              )}
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#151a3a] transition hover:bg-teal-100"
            >
              Start a conversation
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* =======================================================
            BOTTOM BAR
        ======================================================== */}
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center">
          <span>
            © {new Date().getFullYear()} {s.siteName || "Butterfly Homes"}. All
            rights reserved.
          </span>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition hover:text-white/80">
              Privacy policy
            </Link>

            <Link href="/terms" className="transition hover:text-white/80">
              Terms of use
            </Link>

            <Link
              href="/admin/login"
              className="transition hover:text-white/80"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
