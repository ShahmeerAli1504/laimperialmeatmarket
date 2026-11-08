import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old static URLs keep working
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/menu.html", destination: "/menu", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }],
      },
    ];
  },
};

export default nextConfig;
