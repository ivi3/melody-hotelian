/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        domains: [
            'https://images.unsplash.com',
            'api-prod-minimal-v510.vercel.app',
            'tailwindui.com',
        ]
    }
}

module.exports = nextConfig
