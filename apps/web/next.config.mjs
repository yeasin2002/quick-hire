/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        hostname: "us1.discourse-cdn.com",
      },
    ],
  },
};

export default nextConfig;
