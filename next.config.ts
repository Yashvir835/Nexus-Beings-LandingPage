// next.config.ts
import type { NextConfig } from "next";
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
const withVanillaExtract = createVanillaExtractPlugin();
const nextConfig: NextConfig = {
  images: {
    domains: ['assets.aceternity.com'],
  },
};

export default withVanillaExtract(nextConfig);
