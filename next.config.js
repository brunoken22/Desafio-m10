/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["res.cloudinary.com", "encrypted-tbn0.gstatic.com"],
      remotePatterns: [
         {
            protocol: "https",
            hostname:
               "https://res.cloudinary.com/dy26iktoi/image/upload/v1688595425/logo_mzoa3e.png",
            pathname: "/product/**",
         },
      ],
   },
   compiler: {
      styledComponents: true,
   },
};
module.exports = nextConfig;
