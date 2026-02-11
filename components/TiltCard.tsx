"use client";

import { useCallback, useRef, type MouseEvent, type ReactNode } from "react";

import styles from "./TiltCard.module.css";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
}

export default function TiltCard({ children, className }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const onMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;

    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    const glowX = x * 100;
    const glowY = y * 100;

    card.style.setProperty("--glow-x", `${glowX}%`);
    card.style.setProperty("--glow-y", `${glowY}%`);
  }, []);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    card.style.transform = "";
    card.style.removeProperty("--glow-x");
    card.style.removeProperty("--glow-y");
  }, []);

  return (
    <div
      ref={cardRef}
      className={`${styles.tiltCard} ${className ?? ""}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.glowOverlay} />
      {children}
    </div>
  );
}
