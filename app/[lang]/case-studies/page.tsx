import type { Metadata } from "next";

import CaseStudyCard from "@/components/CaseStudyCard";
import Reveal from "@/components/Reveal";
import { getAllCaseStudiesMeta } from "@/lib/caseStudies";
import { getDictionary } from "@/lib/i18n";
import { requireLocale } from "@/lib/routeLocale";

import styles from "@/app/case-studies/case-studies.module.css";

interface CaseStudiesPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: CaseStudiesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.caseStudiesPage.metaTitle,
    description: dictionary.caseStudiesPage.metaDescription
  };
}

export default async function CaseStudiesPage({ params }: CaseStudiesPageProps) {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);
  const caseStudies = getAllCaseStudiesMeta(locale);

  return (
    <div className="page-wrap">
      <Reveal>
        <section className={`section ${styles.hero}`}>
          <div className="container">
            <p className={styles.kicker}>{dictionary.caseStudiesPage.kicker}</p>
            <h1 className="section-title">{dictionary.caseStudiesPage.title}</h1>
            <p className="section-lead">{dictionary.caseStudiesPage.intro}</p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="container">
            <Reveal stagger>
              <div className={styles.grid}>
                {caseStudies.map((caseStudy) => (
                  <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} locale={locale} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
