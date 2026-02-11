"use client";

import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";

import styles from "./ResultsMetric.module.css";

interface ResultsMetricProps {
  label: string;
  value: string;
  detail?: string;
}

interface ParsedValue {
  target: number;
  decimals: number;
  prefix: string;
  suffix: string;
  sign: string;
}

function parseMetricValue(value: string): ParsedValue | null {
  if (value.includes("->") || value.includes("→")) {
    return null;
  }

  const match = value.match(/^([^0-9+-]*)([+-]?\d+(?:\.\d+)?)(.*)$/);

  if (!match) {
    return null;
  }

  const [, prefix, numericPart, suffix] = match;
  const target = Number(numericPart);

  if (!Number.isFinite(target)) {
    return null;
  }

  const decimals = numericPart.includes(".") ? numericPart.split(".")[1].length : 0;
  const sign = numericPart.startsWith("+") ? "+" : target < 0 ? "-" : "";

  return {
    target: Math.abs(target),
    decimals,
    prefix,
    suffix,
    sign
  };
}

export default function ResultsMetric({ label, value, detail = "" }: ResultsMetricProps) {
  const parsedValue = useMemo(() => parseMetricValue(value), [value]);
  const [displayValue, setDisplayValue] = useState(parsedValue ? "0" : value);
  const [isAnimating, setIsAnimating] = useState(Boolean(parsedValue));

  useEffect(() => {
    if (!parsedValue) {
      setDisplayValue(value);
      setIsAnimating(false);
      return;
    }

    let animationFrame = 0;
    const start = performance.now();
    const duration = 800;

    const animate = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsedValue.target * eased;
      const numeric = current.toFixed(parsedValue.decimals);

      setDisplayValue(`${parsedValue.prefix}${parsedValue.sign}${numeric}${parsedValue.suffix}`);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    setIsAnimating(true);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [parsedValue, value]);

  return (
    <div className={styles.metricCard}>
      <div className={`${styles.metricIcon} ${isAnimating ? styles.iconSpinning : ""}`}>
        <Sparkles size={22} />
      </div>
      <div className={styles.metricContent}>
        <div className={styles.metricValue}>{displayValue}</div>
        <div className={styles.metricLabel}>{label}</div>
        {detail ? <div className={styles.metricDetail}>{detail}</div> : null}
      </div>
    </div>
  );
}
