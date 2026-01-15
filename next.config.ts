import type { NextConfig } from "next";

// Read BASE_PATH from environment variable
// If not set, defaults to empty string (root path)
// Examples: BASE_PATH=/fonts, BASE_PATH=/f, BASE_PATH=/view
const basePath = process.env.BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
