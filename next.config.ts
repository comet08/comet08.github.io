import type { NextConfig } from "next";

// GITHUB_ACTIONS is automatically set to "true" by GitHub Actions runner
const isGithubActions = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubActions ? "/portfolio" : "",
  assetPrefix: isGithubActions ? "/portfolio" : "",
  images: { unoptimized: true },
};

export default nextConfig;
