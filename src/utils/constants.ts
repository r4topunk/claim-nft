export const PROJECT_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://" + process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;

export const IPFS_URL =
  "https://harlequin-general-shrimp-966.mypinata.cloud/ipfs/";
