import { ArrowRight } from "lucide-react";

import Reveal from "@/components/Reveal";
import { defaultLocale, getDictionary, type Locale } from "@/lib/i18n";

import styles from "./HeroSection.module.css";

interface HeroSectionProps {
  locale?: Locale;
}

export default function HeroSection({ locale = defaultLocale }: HeroSectionProps) {
  const dictionary = getDictionary(locale);

  const kicker = locale === "sr" ? "Full-stack studio iz Niša" : "Full-stack studio from Serbia";
  const available = locale === "sr" ? "Dostupni za nove projekte" : "Available for new projects";

  return (
    <section className={styles.hero}>
      <div className={styles.orbitRing} aria-hidden="true">
        <span className={styles.orbitDot} />
      </div>
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      <div className="container">
        <Reveal>
          <div className={styles.kickerRow}>
            <span className={styles.kickerBadge}>{kicker}</span>
            <span className={styles.statusDot} />
            <span className={styles.statusText}>{available}</span>
          </div>
        </Reveal>

        <Reveal>
          <h1 className={styles.title}>{dictionary.hero.title}</h1>
        </Reveal>

        <Reveal>
          <p className={styles.lead}>{dictionary.hero.lead}</p>
        </Reveal>

        <Reveal>
          <div className={styles.cta}>
            <a
              className={`button ${styles.ctaPrimary}`}
              href="https://www.upwork.com/agencies/1965890569940564427/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{dictionary.hero.ctaUpwork}</span>
              <ArrowRight size={16} className={styles.ctaArrow} />
            </a>
            <a className="button button-ghost" href={`mailto:${dictionary.site.email}`}>
              {dictionary.hero.ctaEmailPrefix}: {dictionary.site.email}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
