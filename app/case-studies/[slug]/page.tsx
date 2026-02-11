import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import ResultsMetric from "@/components/ResultsMetric";
import Reveal from "@/components/Reveal";
import TechnologyBadge from "@/components/TechnologyBadge";
import { getAllCaseStudySlugs, getCaseStudyBySlug } from "@/lib/caseStudies";

import styles from "./case-study.module.css";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case study not found"
    };
  }

  return {
    title: caseStudy.title,
    description: caseStudy.summary
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="page-wrap">
      <Reveal>
        <section className={`section ${styles.hero}`}>
          <div className="container">
            <Link href="/case-studies" className={styles.back}>
              Back to case studies
            </Link>

            <div className={styles.heroGrid}>
              <div>
                <p className={styles.kicker}>{caseStudy.industry}</p>
                <h1 className={styles.title}>{caseStudy.title}</h1>
                <p className={styles.summary}>{caseStudy.summary}</p>

                <div className={styles.meta}>
                  <span>Client: {caseStudy.client}</span>
                  <span>Duration: {caseStudy.duration}</span>
                  {caseStudy.budgetRange ? <span>Budget: {caseStudy.budgetRange}</span> : null}
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
            <h2 className={styles.sectionTitle}>Results metrics</h2>
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
                <h2 className={styles.sectionTitle}>Challenge</h2>
                <p>{caseStudy.challenge}</p>
              </article>

              <article className={styles.panel}>
                <h2 className={styles.sectionTitle}>Solution</h2>
                <p>{caseStudy.solution}</p>
              </article>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="container">
            <h2 className={styles.sectionTitle}>Timeline and process</h2>
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
            <h2 className={styles.sectionTitle}>Technologies used</h2>
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
            <h2 className={styles.sectionTitle}>Before / after</h2>
            <div className={styles.beforeAfter}>
              <article className={styles.beforeAfterItem}>
                <div className={styles.beforeAfterImageWrap}>
                  <Image
                    src={caseStudy.beforeAfter.beforeImage}
                    alt={`${caseStudy.title} before`}
                    fill
                    className={styles.beforeAfterImage}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
                <h3>{caseStudy.beforeAfter.beforeLabel}</h3>
                <p>{caseStudy.beforeAfter.beforeSummary}</p>
              </article>

              <article className={styles.beforeAfterItem}>
                <div className={styles.beforeAfterImageWrap}>
                  <Image
                    src={caseStudy.beforeAfter.afterImage}
                    alt={`${caseStudy.title} after`}
                    fill
                    className={styles.beforeAfterImage}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
                <h3>{caseStudy.beforeAfter.afterLabel}</h3>
                <p>{caseStudy.beforeAfter.afterSummary}</p>
              </article>
            </div>
          </div>
        </section>
      </Reveal>

      {caseStudy.testimonial ? (
        <Reveal>
          <section className="section">
            <div className="container">
              <blockquote className={styles.testimonial}>
                <p>"{caseStudy.testimonial.quote}"</p>
                <footer>
                  {caseStudy.testimonial.name} - {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
                </footer>
                <strong>Result: {caseStudy.testimonial.result}</strong>
              </blockquote>
            </div>
          </section>
        </Reveal>
      ) : null}

      {caseStudy.media.videoUrl ? (
        <Reveal>
          <section className="section">
            <div className="container">
              <h2 className={styles.sectionTitle}>Project walkthrough</h2>
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
