import type { MetadataRoute } from "next";
import { abs } from "@/lib/site";

// Served at /robots.txt
// Nothing is disallowed: blocking /api/ made Google report "Blocked by robots.txt" for the
// contact-form endpoint it discovers in the page JS. /api/* is kept out of the index with an
// X-Robots-Tag: noindex header instead (see next.config.ts), which Google treats as intentional.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: abs("/sitemap.xml"),
  };
}
