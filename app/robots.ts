import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/thankyou", "/ppc1", "/ppc2"],
    },
    sitemap: "https://www.abbaddentalclinic.com/sitemap.xml",
  };
}
