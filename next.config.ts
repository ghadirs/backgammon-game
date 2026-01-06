import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ["./src/app"],
  },
  output: "export", // <--- THIS IS THE KEY LINE
  basePath: process.env.NODE_ENV === "production" ? "/backgammon-game" : "",
  images: { unoptimized: true },
};

export default nextConfig;
