import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
  experimental: {
    appDir: true,
    // serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client"]
  },
}

// module.exports = nextConfig

export default nextConfig
