import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets the dev server be reached from other devices on the LAN (e.g.
  // testing on a phone via http://192.168.0.118:3000) without Next.js
  // blocking those requests as cross-origin.
  allowedDevOrigins: ["192.168.0.118"],
};

export default nextConfig;
