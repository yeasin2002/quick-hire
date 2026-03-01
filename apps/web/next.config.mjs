/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      { hostname: "us1.discourse-cdn.com" },
      { hostname: "ik.imagekit.io" },
    ],
  },
};

export default nextConfig;
