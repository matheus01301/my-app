/** @type {import('next').NextConfig} */
module.exports = {
  distDir: '.next',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    return config;
  },
};
