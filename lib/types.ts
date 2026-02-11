export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  thumbnail: string;
  category: string;
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string;
}

export interface CaseStudyResultMetric {
  label: string;
  value: string;
  detail: string;
}

export interface CaseStudyTimelineStep {
  phase: string;
  summary: string;
  duration: string;
}

export interface CaseStudyMedia {
  screenshot: string;
  videoUrl: string;
}

export interface CaseStudyBeforeAfter {
  beforeLabel: string;
  beforeSummary: string;
  beforeImage: string;
  afterLabel: string;
  afterSummary: string;
  afterImage: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  result: string;
  avatar: string;
}

export interface CaseStudyMeta {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  duration: string;
  budgetRange: string;
  liveUrl: string;
  caseStudySlug: string;
  technologies: string[];
  results: CaseStudyResultMetric[];
  media: CaseStudyMedia;
  order: number;
}

export interface CaseStudy extends CaseStudyMeta {
  timeline: CaseStudyTimelineStep[];
  beforeAfter: CaseStudyBeforeAfter;
  testimonial: CaseStudyTestimonial | null;
  contentHtml: string;
}
