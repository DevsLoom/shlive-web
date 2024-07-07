/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "streaming-api-production-7d35.up.railway.app",
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
            },
            {
                protocol: "http",
                hostname: "localhost",
                port: "5000",
            },
        ],
    },
};

export default nextConfig;
