import type { NextConfig } from "next";


module.exports = {
  productionBrowserSourceMaps: true,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static2.finnhub.io",
      },
    ],
  },
};

module.exports = nextConfig;



export default nextConfig;
