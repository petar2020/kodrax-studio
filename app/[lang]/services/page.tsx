import type { Metadata } from "next";

import Reveal from "@/components/Reveal";
import ServicesCards from "@/components/ServicesCards";
import { getDictionary } from "@/lib/i18n";
import { requireLocale } from "@/lib/routeLocale";

import styles from "@/app/services/services.module.css";

interface ServicesPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.servicesPage.metaTitle,
    description: dictionary.servicesPage.metaDescription
  };
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);

  return (
    <div className="page-wrap">
      <Reveal>
        <section className="section">
          <div className="container">
            <h1 className="section-title">{dictionary.servicesPage.title}</h1>
            <p className="page-intro">{dictionary.servicesPage.intro}</p>

            <div className={styles.process}>
              {dictionary.servicesPage.process.map((step) => (
                <article key={step.title} className={styles.step}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <ServicesCards locale={locale} />
      </Reveal>
    </div>
  );
}
