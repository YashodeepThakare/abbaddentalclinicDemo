import type { MetadataRoute } from "next";
import blogs from "./Blogs/data/blogs.json";
import services from "./services/data/services.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = blogs.map((blog) => ({
    url: `https://www.abbaddentalclinic.com/Blogs/blogs/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const serviceUrls = services.map((service) => ({
    url: `https://www.abbaddentalclinic.com/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: "https://www.abbaddentalclinic.com/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://www.abbaddentalclinic.com/Blogs/blogs",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...blogUrls,
    ...serviceUrls,
  ];
}
