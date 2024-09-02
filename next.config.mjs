/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatar.iran.liara.run'
            },
            {
                protocol: 'https',
                hostname: 'tinyurl.com'
            },
            {
                protocol: 'https',
                hostname: 'shorturl.at',
            },
            {
                protocol: 'https',
                hostname: 'i.scdn.co',
            }
        ]
    }
};

export default nextConfig;
