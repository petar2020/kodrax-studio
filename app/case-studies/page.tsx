import type { Metadata } from "next";

import CaseStudyCard from "@/components/CaseStudyCard";
import Reveal from "@/components/Reveal";
import { getAllCaseStudiesMeta } from "@/lib/caseStudies";

import styles from "./case-studies.module.css";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Detailed project breakdowns with measurable booking and performance outcomes."
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudiesMeta();

  return (
    <div className="page-wrap">
      <Reveal>
        <section className={`section ${styles.hero}`}>
          <div className="container">
            <p className={styles.kicker}>Case Studies</p>
            <h1 className="section-title">Business outcomes from booking and conversion projects</h1>
            <p className="section-lead">
              From transport ticketing to WordPress recovery, each case includes challenge, delivery approach, and
              measurable impact.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="section">
          <div className="container">
            <div className={styles.grid}>
              {caseStudies.map((caseStudy) => (
                <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} />
              ))}
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
