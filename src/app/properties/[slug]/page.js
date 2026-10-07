import { notFound } from "next/navigation";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import EnquiryForm from "@/Components/EnquiryForm";
import PropertyMediaGallery from "@/Components/PropertyMediaGallery";
import PropertyAssistant from "@/Components/PropertyAssistant";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  ArrowLeft,
  Check,
  Navigation,
  Building2,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

async function getProperty(slug) {
  await connectDB();
  return Property.findOne({
    slug,
    status: "Published",
  }).lean();
}

export async function generateMetadata({ params }) {
  try {
    const p = await getProperty((await params).slug);

    if (p) {
      return {
        title: p.seoTitle || `${p.title} in ${p.location} | Butterfly Homes`,
        description:
          p.seoDescription ||
          p.description?.slice(0, 155) ||
          `Explore ${p.title} in ${p.location}.`,
        alternates: {
          canonical: `/properties/${p.slug}`,
        },
      };
    }
  } catch {}

  return {
    title: "Property details | Butterfly Homes",
  };
}

export default async function PropertyDetails({ params }) {
  const p0 = await getProperty((await params).slug);

  if (!p0) {
    notFound();
  }

  const p = JSON.parse(JSON.stringify(p0));

  const media = p.media?.length
    ? p.media
    : p.images?.map((url) => ({
        url,
        type: "image",
      })) || [];

  let similar = [];

  try {
    await connectDB();

    const similarQuery = {
      status: "Published",
      _id: { $ne: p._id },
    };

    if (p.type) {
      similarQuery.type = p.type;
    }

    if (p.city) {
      similarQuery.city = p.city;
    }

    similar = JSON.parse(
      JSON.stringify(
        await Property.find(similarQuery)
          .sort({
            featured: -1,
            updatedAt: -1,
          })
          .limit(3)
          .lean(),
      ),
    );
  } catch {}

  const facts = [
    p.bedrooms > 0 && [BedDouble, `${p.bedrooms} Bedrooms`],
    p.bathrooms > 0 && [Bath, `${p.bathrooms} Bathrooms`],
    p.area > 0 && [Maximize2, `${p.area} ${p.areaUnit || "sq.ft"}`],
    p.possession && [CalendarDays, p.possession],
  ].filter(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: p.title,
    description: p.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || ""}/properties/${p.slug}`,
    image: media.filter((m) => m.type === "image").map((m) => m.url),
    datePosted: p.createdAt,
    offers: p.price
      ? {
          "@type": "Offer",
          price: p.price,
          priceCurrency: "INR",
        }
      : undefined,
    about: {
      "@type": "Place",
      name: p.location,
      address: p.address || p.location,
    },
    mainEntity: p.faqs?.length
      ? {
          "@type": "FAQPage",
          mainEntity: p.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : undefined,
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-24 pt-24 md:pt-28">
      <div className="container-butterfly">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-700"
          >
            <ArrowLeft size={16} />
            All properties
          </Link>

          <div className="flex gap-2 text-xs">
            <span className="rounded-full bg-indigo-50 px-3 py-1.5 font-semibold text-indigo-700">
              {p.purpose}
            </span>

            <span className="rounded-full bg-white px-3 py-1.5 text-slate-600 ring-1 ring-slate-200">
              {p.type}
            </span>
          </div>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.5fr)_380px]">
          <div className="min-w-0">
            <PropertyMediaGallery property={p} />

            <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight text-[#151a3a] md:text-5xl">
                    {p.title}
                  </h1>

                  <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                    <MapPin size={17} />
                    {p.address || p.location}
                    {p.city ? `, ${p.city}` : ""}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs font-semibold uppercase tracking-[.16em] text-slate-400">
                    Price
                  </p>

                  <p className="mt-1 text-2xl font-bold text-indigo-800">
                    {p.priceLabel ||
                      (p.price
                        ? `₹${Number(p.price).toLocaleString("en-IN")}`
                        : "Price on request")}
                  </p>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 border-y border-slate-100 py-5 md:grid-cols-4">
                {facts.map(([Icon, text]) => (
                  <div key={text} className="rounded-2xl bg-slate-50 p-4">
                    <Icon size={18} className="text-indigo-700" />
                    <p className="mt-2 text-sm font-semibold text-slate-800">
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              {p.highlights?.length > 0 && (
                <>
                  <h2 className="mt-8 text-2xl font-semibold">
                    Property highlights
                  </h2>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {p.highlights.map((x) => (
                      <div
                        key={x}
                        className="flex gap-3 rounded-2xl bg-indigo-50/60 p-4 text-sm text-slate-700"
                      >
                        <Check
                          size={18}
                          className="mt-0.5 shrink-0 text-indigo-700"
                        />
                        {x}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <h2 className="mt-9 text-2xl font-semibold">
                About this property
              </h2>

              <div className="mt-4 whitespace-pre-line text-[15px] leading-8 text-slate-600">
                {p.description ||
                  "Contact Butterfly Homes for complete property information."}
              </div>

              {p.amenities?.length > 0 && (
                <>
                  <h2 className="mt-9 text-2xl font-semibold">
                    Amenities & features
                  </h2>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    {p.amenities.map((a) => (
                      <div
                        key={a}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 text-sm text-slate-700"
                      >
                        <Check size={16} className="text-emerald-600" />
                        {a}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {p.floorPlans?.length > 0 && (
                <>
                  <h2 className="mt-9 text-2xl font-semibold">Floor plans</h2>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {p.floorPlans.map((f, i) => (
                      <div
                        key={i}
                        className="overflow-hidden rounded-2xl border border-slate-200"
                      >
                        <img
                          src={f.image}
                          alt={`${f.name || "Floor plan"} ${p.title}`}
                          className="h-64 w-full object-contain bg-slate-50"
                        />

                        <div className="p-4">
                          <p className="font-semibold">
                            {f.name || "Floor plan"}
                          </p>

                          {f.area && (
                            <p className="mt-1 text-sm text-slate-500">
                              {f.area}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {p.nearby?.length > 0 && (
                <>
                  <h2 className="mt-9 text-2xl font-semibold">What's nearby</h2>

                  <div className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-100">
                    {p.nearby.map((x, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between gap-4 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <Navigation size={17} className="text-indigo-700" />

                          <div>
                            <p className="text-sm font-medium">{x.name}</p>

                            {x.category && (
                              <p className="text-xs text-slate-400">
                                {x.category}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className="text-sm font-semibold text-slate-600">
                          {x.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {p.mapUrl && (
                <a
                  href={p.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  <MapPin size={17} />
                  Open location in Maps
                </a>
              )}

              {p.reraNumber && (
                <div className="mt-7 flex gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
                  <ShieldCheck size={19} />
                  <span>
                    RERA: <strong>{p.reraNumber}</strong>
                  </span>
                </div>
              )}
            </section>

            <div className="mt-7">
              <PropertyAssistant property={p} />
            </div>

            {p.faqs?.length > 0 && (
              <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-semibold">
                  Frequently asked questions
                </h2>

                <div className="mt-4 divide-y divide-slate-100">
                  {p.faqs.map((f, i) => (
                    <details key={i} className="py-4">
                      <summary className="cursor-pointer font-semibold text-slate-800">
                        {f.question}
                      </summary>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {f.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="xl:sticky xl:top-28 xl:self-start">
            <EnquiryForm propertyId={p._id} propertyTitle={p.title} />

            <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex gap-3">
                <Building2 className="text-indigo-700" />

                <div>
                  <p className="font-semibold">Need help deciding?</p>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Ask our AI advisor or send an enquiry. We can help compare
                    suitable options.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="mt-12">
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.16em] text-indigo-700">
                  You may also like
                </p>

                <h2 className="mt-1 text-3xl font-semibold">
                  Similar properties
                </h2>
              </div>

              <Link
                href="/properties"
                className="text-sm font-semibold text-indigo-700"
              >
                View all
              </Link>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {similar.map((x) => (
                <Link
                  key={x._id}
                  href={`/properties/${x.slug}`}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="h-52 bg-slate-100">
                    <img
                      src={
                        x.media?.find((m) => m.type === "image")?.url ||
                        x.images?.[0] ||
                        "/project1.jpg"
                      }
                      alt={x.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                      {x.type} · {x.purpose}
                    </p>

                    <h3 className="mt-2 font-semibold">{x.title}</h3>

                    <p className="mt-2 text-sm text-slate-500">{x.location}</p>

                    <p className="mt-3 font-bold text-[#151a3a]">
                      {x.priceLabel ||
                        (x.price
                          ? `₹${Number(x.price).toLocaleString("en-IN")}`
                          : "Price on request")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </main>
  );
}
