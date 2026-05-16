import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:8000/api/:path*",
      },
      {
        source: "/proxy/cvat",
        destination: "http://cvat:8080",
      },
      {
        source: "/proxy/cvat/:path*",
        destination: "http://cvat:8080/:path*",
      },
    ];
  },
};

export default nextConfig;
