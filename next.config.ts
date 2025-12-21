import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    sassOptions: {
        includePaths: ['./src/app'],
    },
    images: {unoptimized: true},
};

export default nextConfig;