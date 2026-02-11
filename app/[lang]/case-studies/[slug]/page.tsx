import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";

import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ResultsMetric from "@/components/ResultsMetric";
import Reveal from "@/components/Reveal";
import TechnologyBadge from "@/components/TechnologyBadge";
import { getAllCaseStudySlugs, getCaseStudyBySlug } from "@/lib/caseStudies";
import { getDictionary, locales, withLocalePath } from "@/lib/i18n";
import { requireLocale } from "@/lib/routeLocale";

import styles from "@/app/case-studies/[slug]/case-study.module.css";

interface CaseStudyPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return locales.flatMap((lang) => getAllCaseStudySlugs(lang).map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);
  const caseStudy = await getCaseStudyBySlug(slug, locale);

  if (!caseStudy) {
    return {
      title: dictionary.caseStudiesPage.notFound
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.summary
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { lang, slug } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);
  const caseStudy = await getCaseStudyBySlug(slug, locale);
  const labels = dictionary.caseStudiesPage.labels;

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="page-wrap">
      <Reveal>
        <section className={`section ${styles.hero}`}>
          <div className="container">
            <Link href={withLocalePath(locale, "/case-studies")} className={styles.back}>
              {dictionary.caseStudiesPage.backToCaseStudies}
            </Link>

            <div className={styles.heroGrid}>
              <div>
                <p className={styles.kicker}>{caseStudy.industry}</p>
                <h1 className={styles.title}>{caseStudy.title}</h1>
                <p className={styles.summary}>{caseStudy.summary}</p>

                <div className={styles.meta}>
                  <span>
                    {labels.client}: {caseStudy.client}
                  </span>
                  <span>
                    {labels.duration}: {caseStudy.duration}
                  </span>
                  {caseStudy.budgetRange ? (
                    <span>
                      {labels.budget}: {caseStudy.budgetRange}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className={styles.heroImageWrap}>
                <Image
                  src={caseStudy.media.screenshot}
                  alt={`${caseStudy.title} hero`}
                  fill
                  className={styles.heroImage}
                  sizes="(max-width: 900px) 100vw, 42vw"
                />
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="container">
            <h2 className={styles.sectionTitle}>{labels.results}</h2>
            <div className={styles.metrics}>
              {caseStudy.results.slice(0, 3).map((metric) => (
                <ResultsMetric
                  key={`${caseStudy.slug}-${metric.label}`}
                  label={metric.label}
                  value={metric.value}
                  detail={metric.detail}
                />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="container">
            <div className={styles.twoCol}>
              <article className={styles.panel}>
                <h2 className={styles.sectionTitle}>{labels.challenge}</h2>
                <p>{caseStudy.challenge}</p>
              </article>

              <article className={styles.panel}>
                <h2 className={styles.sectionTitle}>{labels.solution}</h2>
                <p>{caseStudy.solution}</p>
              </article>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="container">
            <h2 className={styles.sectionTitle}>{labels.timeline}</h2>
            <div className={styles.timeline}>
              {caseStudy.timeline.map((step) => (
                <article key={`${caseStudy.slug}-${step.phase}`} className={styles.timelineItem}>
                  <p className={styles.phase}>{step.phase}</p>
                  <h3>{step.summary}</h3>
                  <p className={styles.duration}>{step.duration}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="container">
            <h2 className={styles.sectionTitle}>{labels.technologies}</h2>
            <div className={styles.stack}>
              {caseStudy.technologies.map((technology) => (
                <TechnologyBadge key={`${caseStudy.slug}-${technology}`} name={technology} />
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="container">
            <h2 className={styles.sectionTitle}>{labels.beforeAfter}</h2>
            <BeforeAfterSlider
              title={caseStudy.title}
              beforeLabel={caseStudy.beforeAfter.beforeLabel}
              beforeSummary={caseStudy.beforeAfter.beforeSummary}
              beforeImage={caseStudy.beforeAfter.beforeImage}
              afterLabel={caseStudy.beforeAfter.afterLabel}
              afterSummary={caseStudy.beforeAfter.afterSummary}
              afterImage={caseStudy.beforeAfter.afterImage}
            />
          </div>
        </section>
      </Reveal>

      {caseStudy.testimonial ? (
        <Reveal>
          <section className="section">
            <div className="container">
              <div className={styles.testimonialBox}>
                <div className={styles.testimonialHeader}>
                  <Image
                    src={caseStudy.testimonial.avatar}
                    alt={caseStudy.testimonial.name}
                    width={48}
                    height={48}
                    className={styles.avatar}
                    loading="lazy"
                  />
                  <div>
                    <strong>{caseStudy.testimonial.name}</strong>
                    <small>
                      {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
                    </small>
                    <div className={styles.stars} aria-label="5 stars">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} size={14} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className={styles.quote}>"{caseStudy.testimonial.quote}"</blockquote>
                <p className={styles.resultLine}>
                  {labels.result}: {caseStudy.testimonial.result}
                </p>
              </div>
            </div>
          </section>
        </Reveal>
      ) : null}

      {caseStudy.media.videoUrl ? (
        <Reveal>
          <section className="section">
            <div className="container">
              <h2 className={styles.sectionTitle}>{labels.walkthrough}</h2>
              <div className={styles.videoWrap}>
                <iframe
                  src={caseStudy.media.videoUrl}
                  title={`${caseStudy.title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </section>
        </Reveal>
      ) : null}

      <Reveal>
        <section className="section">
          <div className="container">
            <article className={styles.content} dangerouslySetInnerHTML={{ __html: caseStudy.contentHtml }} />
          </div>
        </section>
      </Reveal>
    </div>
  );
}
