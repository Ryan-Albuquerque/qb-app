/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        API_URL: process.env.API_URL
    }
};

export default nextConfig;
