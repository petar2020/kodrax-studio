import Image from "next/image";
import { ArrowUpCircle, CheckCircle2 } from "lucide-react";

import styles from "./BeforeAfterSlider.module.css";

interface BeforeAfterSliderProps {
  title: string;
  beforeLabel: string;
  beforeSummary: string;
  beforeImage: string;
  afterLabel: string;
  afterSummary: string;
  afterImage: string;
}

export default function BeforeAfterSlider({
  title,
  beforeLabel,
  beforeSummary,
  beforeImage,
  afterLabel,
  afterSummary,
  afterImage
}: BeforeAfterSliderProps) {
  return (
    <div className={styles.beforeAfterGrid}>
      <article className={styles.beforeAfterItem}>
        <div className={styles.imageWrap}>
          <Image
            src={beforeImage}
            alt={`${title} before`}
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
        <div className={styles.label}>
          <ArrowUpCircle size={16} />
          <span>{beforeLabel}</span>
        </div>
        <p>{beforeSummary}</p>
      </article>

      <article className={styles.beforeAfterItem}>
        <div className={styles.imageWrap}>
          <Image
            src={afterImage}
            alt={`${title} after`}
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 50vw"
            loading="lazy"
          />
        </div>
        <div className={styles.label}>
          <CheckCircle2 size={16} />
          <span>{afterLabel}</span>
        </div>
        <p>{afterSummary}</p>
      </article>
    </div>
  );
}
