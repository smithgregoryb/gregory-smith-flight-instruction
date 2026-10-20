import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://gregorysmithcfi.com";
  const paths = [
    "",
    "/flight-lessons-long-beach",
    "/flight-training-apple-valley",
    "/private-pilot-training",
  ];

  return paths.map((path) => ({
    url: site + path,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
