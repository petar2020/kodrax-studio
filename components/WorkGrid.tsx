import Image from "next/image";
import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";

import TiltCard from "@/components/TiltCard";
import { getAllCaseStudiesMeta } from "@/lib/caseStudies";
import { defaultLocale, getDictionary, withLocalePath, type Locale } from "@/lib/i18n";

import styles from "./WorkGrid.module.css";

const fallbackLiveLinks = [
  "https://bozic-konig.com/",
  "https://srbijatours.com/",
  "",
  "",
  "https://demo.drivesoft.rs/",
  "https://prostormiljenkoadereta.org.rs/"
];

const fallbackImages = [
  "/img/case-studies/bozic-hero.png",
  "/img/case-studies/serbia-hero.png",
  "/img/case-studies/serbia-mobile-hero.png",
  "/img/case-studies/drivesoft-backoffice-hero.png",
  "/img/case-studies/drivesoft-hero.png",
  "/img/case-studies/prostor-hero.png"
];

const projectTags = [
  ["React", "Next.js", "Tailwind CSS", "REST API"],
  ["WordPress", "Laravel API", "MySQL", "Redis"],
  ["React Native", "Expo", "Android", "iOS"],
  ["Laravel 10", "MySQL", "Redis", "Docker"],
  ["React", "Vite", "Tailwind", "i18n"],
  ["WordPress", "Gutenberg", "Performance", "SEO"]
];

const featuredCaseSlugs = [
  "online-reservations-bozic-konig",
  "serbia-tours-ticket-system",
  "serbia-tours-mobile-app",
  "drivesoft-back-office",
  "drivesoft-demo-platform",
  "prostor-miljenko-dereta"
];

interface WorkGridProps {
  id?: string;
  locale?: Locale;
}

export default function WorkGrid({ id, locale = defaultLocale }: WorkGridProps) {
  const dictionary = getDictionary(locale);
  const caseStudies = getAllCaseStudiesMeta(locale);
  const caseBySlug = new Map(caseStudies.map((caseStudy) => [caseStudy.slug, caseStudy]));

  return (
    <section id={id} className={`section ${styles.section}`}>
      <div className="container">
        <h2 className="section-title">{dictionary.workGrid.title}</h2>
        <p className="section-lead">{dictionary.workGrid.lead}</p>

        <div className={styles.grid}>
          {dictionary.workGrid.projects.map((project, index) => {
            const slug = featuredCaseSlugs[index];
            const caseStudy = caseBySlug.get(slug);
            const liveUrl = caseStudy?.liveUrl || fallbackLiveLinks[index];
            const casePath = withLocalePath(locale, `/case-studies/${caseStudy?.caseStudySlug ?? slug}`);

            return (
              <TiltCard key={project.title} className={styles.item}>
                <div className={styles.thumb}>
                  <Image
                    src={caseStudy?.media.screenshot ?? fallbackImages[index]}
                    alt={project.alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1120px) 50vw, 33vw"
                    loading="lazy"
                  />
                  <div className={styles.overlay}>
                    <Link href={casePath} className={styles.overlayButton}>
                      <FileText size={16} />
                      <span>{dictionary.workGrid.viewCaseStudy}</span>
                    </Link>
                    {liveUrl && (
                      <a href={liveUrl} className={styles.overlayButton} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                        <span>{dictionary.workGrid.liveDemo}</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className={styles.wrap}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.chips}>
                    {projectTags[index].map((tag) => (
                      <span key={tag} className={styles.chip}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
