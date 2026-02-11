"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./StatsBar.module.css";

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 150, suffix: "k+", label: "Yearly transactions" },
  { value: 4, suffix: "+", label: "Years in production" },
  { value: 100, suffix: "%", label: "Job success score" }
];

const statsSr: Stat[] = [
  { value: 50, suffix: "+", label: "Isporučenih projekata" },
  { value: 150, suffix: "k+", label: "Godišnjih transakcija" },
  { value: 4, suffix: "+", label: "Godine u produkciji" },
  { value: 100, suffix: "%", label: "Uspešnost na Upwork-u" }
];

interface StatsBarProps {
  locale?: string;
}

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) {
          return;
        }

        hasAnimated.current = true;
        const start = performance.now();
        const duration = 1200;

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);

          setDisplay(Math.round(target * eased));

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={styles.number}>
      {display}
      {suffix}
    </span>
  );
}

export default function StatsBar({ locale = "en" }: StatsBarProps) {
  const data = locale === "sr" ? statsSr : stats;

  return (
    <div className={styles.bar}>
      <div className={`container ${styles.grid}`}>
        {data.map((stat) => (
          <div key={stat.label} className={styles.stat}>
            <AnimatedNumber target={stat.value} suffix={stat.suffix} />
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
