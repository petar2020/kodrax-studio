import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

import { defaultLocale, type Locale } from "@/lib/i18n";
import type { BlogPost, BlogPostMeta } from "@/lib/types";

function getBlogDirectory(locale: Locale): string {
  return path.join(process.cwd(), "content", "blog", locale);
}

function readMarkdownFiles(locale: Locale): string[] {
  const blogDirectory = getBlogDirectory(locale);

  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  return fs
    .readdirSync(blogDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

function readPostMeta(fileName: string, locale: Locale): BlogPostMeta {
  const blogDirectory = getBlogDirectory(locale);
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(blogDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return {
    slug,
    title: String(data.title ?? "Untitled post"),
    description: String(data.description ?? ""),
    date: String(data.date ?? "1970-01-01"),
    author: String(data.author ?? "KodraX Studio"),
    readTime: String(data.readTime ?? "5 min read"),
    thumbnail: String(data.thumbnail ?? `/img/blog/${slug}.png`),
    category: String(data.category ?? "General")
  };
}

export function getAllPostSlugs(locale: Locale = defaultLocale): string[] {
  return readMarkdownFiles(locale).map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getAllPostsMeta(locale: Locale = defaultLocale): BlogPostMeta[] {
  return readMarkdownFiles(locale)
    .map((fileName) => readPostMeta(fileName, locale))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPostBySlug(
  slug: string,
  locale: Locale = defaultLocale
): Promise<BlogPost | null> {
  const blogDirectory = getBlogDirectory(locale);
  const fullPath = path.join(blogDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(remarkHtml).process(content);

  return {
    slug,
    title: String(data.title ?? "Untitled post"),
    description: String(data.description ?? ""),
    date: String(data.date ?? "1970-01-01"),
    author: String(data.author ?? "KodraX Studio"),
    readTime: String(data.readTime ?? "5 min read"),
    thumbnail: String(data.thumbnail ?? `/img/blog/${slug}.png`),
    category: String(data.category ?? "General"),
    contentHtml: processedContent.toString()
  };
}
