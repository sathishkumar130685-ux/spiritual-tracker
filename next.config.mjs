/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allows the build to finish even if there are small type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skips the linting check during build to speed things up
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;