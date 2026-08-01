import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // default is 60s, which makes the optimizer re-derive every variant
    // over and over on a low-traffic site
    minimumCacheTTL: 31536000,
    // 64 for BoardCard thumbnails, 200 for the SensorGrid tiles
    imageSizes: [64, 128, 200, 256, 384],
  },
};

export default nextConfig;
