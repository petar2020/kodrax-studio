import { defaultLocale, getDictionary, type Locale } from "@/lib/i18n";

import ContactForm from "./ContactForm";
import styles from "./ContactSection.module.css";

interface ContactSectionProps {
  id?: string;
  title?: string;
  description?: string;
  locale?: Locale;
}

export default function ContactSection({
  id,
  title,
  description,
  locale = defaultLocale
}: ContactSectionProps) {
  const dictionary = getDictionary(locale);
  const sectionTitle = title ?? dictionary.contactSection.title;
  const sectionDescription = description ?? dictionary.contactSection.description;

  return (
    <section id={id} className={`section ${styles.section}`}>
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 className="section-title">{sectionTitle}</h2>
          <p className="section-lead">{sectionDescription}</p>

          <div className={styles.cta}>
            <a
              className="button"
              href="https://www.upwork.com/agencies/1965890569940564427/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {dictionary.contactSection.ctaUpwork}
            </a>
            <a className="button button-ghost" href={`mailto:${dictionary.site.email}`}>
              {dictionary.contactSection.ctaEmailPrefix}: {dictionary.site.email}
            </a>
          </div>

          <p className={styles.note}>{dictionary.contactSection.note}</p>
        </div>

        <ContactForm locale={locale} />
      </div>
    </section>
  );
}
