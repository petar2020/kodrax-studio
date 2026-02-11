import type { MetadataRoute } from "next";

import { getAllPostsMeta } from "@/lib/blog";
import { getAllCaseStudiesMeta } from "@/lib/caseStudies";
import { locales } from "@/lib/i18n";

const siteUrl = "https://kodrax.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/services", "/contact", "/blog", "/case-studies"];

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPaths.map((pathName) => ({
      url: `${siteUrl}/${locale}${pathName}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: pathName === "" ? 1 : 0.85
    }))
  );

  const blogRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllPostsMeta(locale).map((post) => ({
      url: `${siteUrl}/${locale}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.75
    }))
  );

  const caseStudyRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    getAllCaseStudiesMeta(locale).map((caseStudy) => ({
      url: `${siteUrl}/${locale}/case-studies/${caseStudy.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8
    }))
  );

  return [...staticRoutes, ...blogRoutes, ...caseStudyRoutes];
}
