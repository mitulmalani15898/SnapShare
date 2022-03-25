export const BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/";
export const API_BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:8080/api";
export const S3_RESOURCE_URL = "https://snapshare-s3-bucket.s3.amazonaws.com/";
