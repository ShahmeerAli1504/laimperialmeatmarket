/* ==========================================================================
   Site-wide SEO constants + schema.org (JSON-LD) builders.
   Set NEXT_PUBLIC_SITE_URL (e.g. https://laimperialmeatmarket.com) in Vercel so
   canonical URLs, the sitemap and robots.txt point at the real domain.
   ========================================================================== */
import { DOORDASH, INSTAGRAM, MENU } from "@/lib/data";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000")
).replace(/\/+$/, "");

export const SITE_NAME = "La Imperial Meat Market & Taqueria";
export const SITE_SHORT_NAME = "La Imperial";
export const SITE_DESCRIPTION =
  "Family-run carnicería, taquería, panadería and Mexican grocery with two locations in Winnemucca, NV. Fresh-cut Certified Angus Beef, street tacos, quesabirria, pan dulce, catering and wild game processing. Order on DoorDash.";

export const KEYWORDS = [
  "La Imperial Meat Market",
  "Imperial Meat Market Winnemucca",
  "meat market Winnemucca NV",
  "carnicería Winnemucca",
  "taquería Winnemucca",
  "Mexican restaurant Winnemucca",
  "tacos Winnemucca NV",
  "quesabirria Winnemucca",
  "panadería Winnemucca",
  "pan dulce Winnemucca",
  "Mexican grocery Winnemucca",
  "butcher shop Winnemucca",
  "wild game processing Winnemucca",
  "deer processing Nevada",
  "elk processing Nevada",
  "carne asada Winnemucca",
  "catering Winnemucca",
  "breakfast burrito Winnemucca",
  "Humboldt County Nevada",
];

export const abs = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

const EVERY_DAY = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const ORG_ID = abs("/#organization");

function store(opts: {
  id: string;
  name: string;
  types: string[];
  street: string;
  telephone: string;
  opens: string;
  image: string;
  extra?: Record<string, unknown>;
}) {
  const q = encodeURIComponent(`${opts.street}, Winnemucca, NV 89445`);
  return {
    "@type": opts.types,
    "@id": abs(`/#${opts.id}`),
    name: opts.name,
    url: SITE_URL,
    image: [abs(opts.image), abs("/images/banner-meats.webp"), abs("/images/al-pastor.webp")],
    logo: abs("/icon.png"),
    telephone: opts.telephone,
    priceRange: "$10–20",
    servesCuisine: ["Mexican", "Tacos", "Mexican Bakery"],
    menu: abs("/menu"),
    hasMenu: abs("/menu"),
    acceptsReservations: false,
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: opts.street,
      addressLocality: "Winnemucca",
      addressRegion: "NV",
      postalCode: "89445",
      addressCountry: "US",
    },
    areaServed: { "@type": "City", name: "Winnemucca, Nevada" },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${q}`,
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: EVERY_DAY, opens: opts.opens, closes: "20:00" }],
    potentialAction: {
      "@type": "OrderAction",
      target: { "@type": "EntryPoint", urlTemplate: DOORDASH, actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"] },
      deliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModeOwnFleet", "http://purl.org/goodrelations/v1#DeliveryModePickUp"],
    },
    parentOrganization: { "@id": ORG_ID },
    sameAs: [INSTAGRAM],
    ...opts.extra,
  };
}

/** Organization + WebSite — rendered on every page from the root layout. */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG_ID,
      name: SITE_NAME,
      alternateName: ["Imperial Meat Market & Taqueria", "La Imperial", "Carnicería La Imperial"],
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: abs("/icon.png") },
      image: abs("/images/logo.webp"),
      description: SITE_DESCRIPTION,
      sameAs: [INSTAGRAM, DOORDASH],
      contactPoint: [
        { "@type": "ContactPoint", telephone: "+1-775-623-9191", contactType: "customer service", areaServed: "US", availableLanguage: ["English", "Spanish"] },
        { "@type": "ContactPoint", telephone: "+1-775-623-2405", contactType: "customer service", areaServed: "US", availableLanguage: ["English", "Spanish"] },
      ],
      subOrganization: [{ "@id": abs("/#store-blvd") }, { "@id": abs("/#store-bridge") }],
    },
    {
      "@type": "WebSite",
      "@id": abs("/#website"),
      url: SITE_URL,
      name: SITE_NAME,
      inLanguage: ["en-US", "es-US"],
      publisher: { "@id": ORG_ID },
    },
  ],
};

/** Both stores as LocalBusiness entries — rendered on the home page. */
export const storesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    store({
      id: "store-blvd",
      name: `${SITE_NAME} — Winnemucca Blvd`,
      types: ["Restaurant", "ButcherShop", "GroceryStore"],
      street: "5184 E Winnemucca Blvd",
      telephone: "+1-775-623-9191",
      opens: "08:00",
      image: "/images/case-angus-ribeye.webp",
    }),
    store({
      id: "store-bridge",
      name: `${SITE_NAME} — South Bridge St`,
      types: ["Restaurant", "ButcherShop", "GroceryStore", "Bakery"],
      street: "1200 S Bridge St",
      telephone: "+1-775-623-2405",
      opens: "06:30",
      image: "/images/store-bridge.webp",
      extra: {
        makesOffer: {
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: "Wild Game Processing", description: "Cut, wrap, grind, sausage and jerky for deer, elk, antelope and other wild game." },
        },
      },
    }),
  ],
};

/** Full taquería menu as schema.org Menu — rendered on /menu. */
export const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  "@id": abs("/menu#menu"),
  name: `${SITE_NAME} Menu`,
  url: abs("/menu"),
  inLanguage: "en-US",
  hasMenuSection: MENU.map((c) => ({
    "@type": "MenuSection",
    name: c.title.en,
    hasMenuItem: c.items.map((i) => ({
      "@type": "MenuItem",
      name: i.name,
      description: i.en,
      offers: { "@type": "Offer", price: i.price.toFixed(2), priceCurrency: "USD", url: DOORDASH },
    })),
  })),
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

/** Safe JSON-LD serialization (prevents `</script>` breakouts). */
export const ldJson = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
