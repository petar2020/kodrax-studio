"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import styles from "./Reveal.module.css";

interface RevealProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  stagger?: boolean;
}

export default function Reveal({ children, className, threshold = 0.08, stagger = false }: RevealProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) {
      return;
    }

    // If the URL has a hash and this element contains the target,
    // show immediately to avoid flash of invisible content on navigation.
    const hash = window.location.hash.slice(1);

    if (hash) {
      try {
        const target = element.querySelector(`#${CSS.escape(hash)}`);

        if (target) {
          setIsVisible(true);
          return;
        }
      } catch {
        // invalid hash, ignore
      }
    }

    // If element is already in view on mount (above-the-fold), show instantly
    const rect = element.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  const classes = [styles.reveal, isVisible ? styles.show : "", stagger ? styles.stagger : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={elementRef} className={classes}>
      {children}
    </div>
  );
}
