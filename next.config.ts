import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-861836c4cda7439e918e1357065cdc65.r2.dev",
      },
    ],
  },
};

export default nextConfig;
