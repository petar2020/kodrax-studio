import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

import { defaultLocale, type Locale } from "@/lib/i18n";
import type {
  CaseStudy,
  CaseStudyBeforeAfter,
  CaseStudyMedia,
  CaseStudyMeta,
  CaseStudyResultMetric,
  CaseStudyTestimonial,
  CaseStudyTimelineStep
} from "@/lib/types";

function getCaseStudiesDirectory(locale: Locale): string {
  return path.join(process.cwd(), "content", "case-studies", locale);
}

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return typeof value === "object" && value !== null ? (value as UnknownRecord) : {};
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asNumber(value: unknown, fallback = 0): number {
  return typeof value === "number" ? value : fallback;
}

function asStringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function normalizeMetric(value: unknown): CaseStudyResultMetric[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((metric) => {
      if (typeof metric === "string") {
        return { label: "Result", value: metric, detail: "" };
      }

      const metricRecord = asRecord(metric);

      return {
        label: asString(metricRecord.label, "Result"),
        value: asString(metricRecord.value),
        detail: asString(metricRecord.detail)
      };
    })
    .filter((metric) => metric.value.length > 0);
}

function normalizeTimeline(value: unknown): CaseStudyTimelineStep[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((step) => {
      const stepRecord = asRecord(step);

      return {
        phase: asString(stepRecord.phase, "Phase"),
        summary: asString(stepRecord.summary),
        duration: asString(stepRecord.duration)
      };
    })
    .filter((step) => step.summary.length > 0);
}

function normalizeMedia(value: unknown): CaseStudyMedia {
  const media = asRecord(value);

  return {
    screenshot: asString(media.screenshot, "/img/logo.webp"),
    videoUrl: asString(media.videoUrl)
  };
}

function normalizeBeforeAfter(value: unknown): CaseStudyBeforeAfter {
  const beforeAfter = asRecord(value);

  return {
    beforeLabel: asString(beforeAfter.beforeLabel, "Before"),
    beforeSummary: asString(beforeAfter.beforeSummary),
    beforeImage: asString(beforeAfter.beforeImage, "/img/logo.webp"),
    afterLabel: asString(beforeAfter.afterLabel, "After"),
    afterSummary: asString(beforeAfter.afterSummary),
    afterImage: asString(beforeAfter.afterImage, "/img/logo.webp")
  };
}

function normalizeTestimonial(value: unknown): CaseStudyTestimonial | null {
  if (!value) {
    return null;
  }

  const testimonial = asRecord(value);
  const quote = asString(testimonial.quote);

  if (!quote) {
    return null;
  }

  return {
    quote,
    name: asString(testimonial.name),
    role: asString(testimonial.role),
    company: asString(testimonial.company),
    result: asString(testimonial.result),
    avatar: asString(testimonial.avatar, "/img/avatars/default-avatar.jpg")
  };
}

function readMarkdownFilesByLocale(locale: Locale): string[] {
  const caseStudiesDirectory = getCaseStudiesDirectory(locale);

  if (!fs.existsSync(caseStudiesDirectory)) {
    return [];
  }

  return fs
    .readdirSync(caseStudiesDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

function parseCaseStudyMeta(fileName: string, locale: Locale): CaseStudyMeta {
  const caseStudiesDirectory = getCaseStudiesDirectory(locale);
  const slug = fileName.replace(/\.md$/, "");
  const fullPath = path.join(caseStudiesDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);
  const dataRecord = asRecord(data);

  return {
    slug,
    title: asString(dataRecord.title, "Untitled case study"),
    client: asString(dataRecord.client, "Client"),
    industry: asString(dataRecord.industry, "General"),
    summary: asString(dataRecord.summary),
    challenge: asString(dataRecord.challenge),
    solution: asString(dataRecord.solution),
    duration: asString(dataRecord.duration, "N/A"),
    budgetRange: asString(dataRecord.budgetRange),
    liveUrl: asString(dataRecord.liveUrl),
    caseStudySlug: asString(dataRecord.caseStudySlug, slug),
    technologies: asStringList(dataRecord.technologies),
    results: normalizeMetric(dataRecord.results),
    media: normalizeMedia(dataRecord.media),
    order: asNumber(dataRecord.order, 99)
  };
}

export function getAllCaseStudySlugs(locale: Locale = defaultLocale): string[] {
  return readMarkdownFilesByLocale(locale).map((fileName) => fileName.replace(/\.md$/, ""));
}

export function getAllCaseStudiesMeta(locale: Locale = defaultLocale): CaseStudyMeta[] {
  return readMarkdownFilesByLocale(locale)
    .map((fileName) => parseCaseStudyMeta(fileName, locale))
    .sort((a, b) => a.order - b.order);
}

export async function getCaseStudyBySlug(
  slug: string,
  locale: Locale = defaultLocale
): Promise<CaseStudy | null> {
  const caseStudiesDirectory = getCaseStudiesDirectory(locale);
  const fullPath = path.join(caseStudiesDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const dataRecord = asRecord(data);
  const processedContent = await remark().use(remarkHtml).process(content);

  const meta = parseCaseStudyMeta(`${slug}.md`, locale);

  return {
    ...meta,
    timeline: normalizeTimeline(dataRecord.timeline),
    beforeAfter: normalizeBeforeAfter(dataRecord.beforeAfter),
    testimonial: normalizeTestimonial(dataRecord.testimonial),
    contentHtml: processedContent.toString()
  };
}
