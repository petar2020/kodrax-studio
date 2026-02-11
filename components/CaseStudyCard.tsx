import Image from "next/image";
import Link from "next/link";

import { defaultLocale, getDictionary, withLocalePath, type Locale } from "@/lib/i18n";
import type { CaseStudyMeta } from "@/lib/types";

import TechnologyBadge from "./TechnologyBadge";
import styles from "./CaseStudyCard.module.css";

interface CaseStudyCardProps {
  caseStudy: CaseStudyMeta;
  locale?: Locale;
}

export default function CaseStudyCard({ caseStudy, locale = defaultLocale }: CaseStudyCardProps) {
  const dictionary = getDictionary(locale);

  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        <Image
          src={caseStudy.media.screenshot}
          alt={`${caseStudy.title} thumbnail`}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 100vw, (max-width: 1120px) 50vw, 33vw"
          loading="lazy"
        />
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>
          <span>{caseStudy.client}</span>
          <span>{caseStudy.industry}</span>
          <span>{caseStudy.duration}</span>
        </p>

        <h2 className={styles.title}>{caseStudy.title}</h2>
        <p className={styles.summary}>{caseStudy.summary}</p>

        <div className={styles.metrics}>
          {caseStudy.results.slice(0, 3).map((metric) => (
            <div key={`${caseStudy.slug}-${metric.label}`} className={styles.metricItem}>
              <p>{metric.label}</p>
              <strong>{metric.value}</strong>
            </div>
          ))}
        </div>

        <div className={styles.stack}>
          {caseStudy.technologies.slice(0, 5).map((technology) => (
            <TechnologyBadge key={`${caseStudy.slug}-${technology}`} name={technology} />
          ))}
        </div>

        <Link href={withLocalePath(locale, `/case-studies/${caseStudy.slug}`)} className={styles.link}>
          {dictionary.caseStudiesPage.openCaseStudy}
        </Link>
      </div>
    </article>
  );
}
