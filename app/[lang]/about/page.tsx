import type { Metadata } from "next";

import Reveal from "@/components/Reveal";
import TeamSection from "@/components/TeamSection";
import { getDictionary } from "@/lib/i18n";
import { requireLocale } from "@/lib/routeLocale";

import styles from "@/app/about/about.module.css";

interface AboutPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.aboutPage.metaTitle,
    description: dictionary.aboutPage.metaDescription
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);

  return (
    <div className="page-wrap">
      <Reveal>
        <section className="section">
          <div className="container">
            <h1 className="section-title">{dictionary.aboutPage.title}</h1>
            <p className="page-intro">{dictionary.aboutPage.intro}</p>

            <div className={styles.split}>
              {dictionary.aboutPage.principles.map((item) => (
                <article key={item.title} className={styles.card}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <TeamSection
          locale={locale}
          title={dictionary.aboutPage.teamTitle}
          description={dictionary.aboutPage.teamDescription}
        />
      </Reveal>
    </div>
  );
}
