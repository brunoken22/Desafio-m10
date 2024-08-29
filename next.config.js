/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");

const nextConfig = withSvgr({
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "**",
         },
      ],
   },
   experimental: {
      serverActions: {
        allowedOrigins: ['*'],
      },
    },
});
module.exports = nextConfig;
