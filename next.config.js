/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");

const nextConfig = withSvgr({

   crossOrigin: 'anonymous',

   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "**",
         },
      ],
   },


  
});
module.exports = nextConfig;
