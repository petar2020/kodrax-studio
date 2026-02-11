import styles from "./ServicesCards.module.css";

import { defaultLocale, getDictionary, type Locale } from "@/lib/i18n";
import ServiceIcon, { type ServiceIconKey } from "@/components/ServiceIcon";

interface ServicesCardsProps {
  id?: string;
  locale?: Locale;
}

export default function ServicesCards({ id, locale = defaultLocale }: ServicesCardsProps) {
  const dictionary = getDictionary(locale);
  const serviceIcons: ServiceIconKey[] = [
    "custom-websites",
    "web-applications",
    "e-commerce",
    "mobile-apps",
    "integrations-devops"
  ];

  return (
    <section id={id} className={`section ${styles.section}`}>
      <div className="container">
        <h2 className="section-title">{dictionary.servicesCards.title}</h2>
        <div className={styles.grid}>
          {dictionary.servicesCards.items.map((service, index) => (
            <article key={service.title} className={styles.card}>
              <div className={styles.cardHeader}>
                <ServiceIcon service={serviceIcons[index]} />
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
            </article>
          ))}
        </div>

        <div className={styles.reasons}>
          <h2 className="section-title">{dictionary.servicesCards.whyTitle}</h2>
          <ul>
            {dictionary.servicesCards.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
