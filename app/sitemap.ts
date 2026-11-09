import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";

// Served at /sitemap.xml
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: abs("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      images: [abs("/images/carne-asada.webp"), abs("/images/banner-meats.webp"), abs("/images/al-pastor.webp"), abs("/images/conchas.webp")],
    },
    { url: abs("/menu"), lastModified, changeFrequency: "weekly", priority: 0.9, images: [abs("/images/al-pastor.webp")] },
    { url: abs("/contact"), lastModified, changeFrequency: "monthly", priority: 0.8, images: [abs("/images/store-bridge.webp")] },
  ];
}
