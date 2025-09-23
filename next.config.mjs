/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["kawilangrancakalong.fuadonetwo.my.id", "localhost", "127.0.0.1"],
    unoptimized: true, // hindari optimisasi Next.js
  },
};

export default nextConfig;
