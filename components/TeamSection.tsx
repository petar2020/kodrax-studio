import { defaultLocale, getDictionary, type Locale } from "@/lib/i18n";

import styles from "./TeamSection.module.css";

const teamMembers = ["Petar Arsic", "Nikola G."] as const;

interface TeamSectionProps {
  id?: string;
  title?: string;
  description?: string;
  locale?: Locale;
}

export default function TeamSection({
  id,
  title,
  description,
  locale = defaultLocale
}: TeamSectionProps) {
  const dictionary = getDictionary(locale);
  const teamTitle = title ?? dictionary.team.title;
  const teamDescription = description ?? dictionary.team.description;

  return (
    <section id={id} className={`section ${styles.section}`}>
      <div className="container">
        <h2 className="section-title">{teamTitle}</h2>
        <p className="section-lead">{teamDescription}</p>

        <div className={styles.grid}>
          {teamMembers.map((name, index) => (
            <article key={name} className={styles.person}>
              <div className={styles.avatar} aria-hidden="true" />
              <div>
                <h3>
                  {name} - {dictionary.team.members[index].role}
                </h3>
                <p>{dictionary.team.members[index].description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
