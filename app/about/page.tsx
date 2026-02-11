import type { Metadata } from "next";

import Reveal from "@/components/Reveal";
import TeamSection from "@/components/TeamSection";

import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About and Team",
  description: "Meet the KodraX Studio team and how we structure technical delivery."
};

const principles = [
  {
    title: "Pragmatic architecture",
    text: "We prioritize maintainable systems over hype, with explicit tradeoffs and clean handoff docs."
  },
  {
    title: "Fast incident response",
    text: "When production fails, we treat it as an engineering emergency and stabilize first."
  },
  {
    title: "Long-term ownership",
    text: "We stay available for monitoring, optimization, and roadmap execution after launch."
  }
];

export default function AboutPage() {
  return (
    <div className="page-wrap">
      <Reveal>
        <section className="section">
          <div className="container">
            <h1 className="section-title">About KodraX Studio</h1>
            <p className="page-intro">
              We are a small senior team focused on robust Laravel backends, performant frontends, and safe
              migrations from legacy stacks.
            </p>

            <div className={styles.split}>
              {principles.map((item) => (
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
          title="Core team"
          description="Direct communication, transparent estimates, and end-to-end ownership of delivery."
        />
      </Reveal>
    </div>
  );
}
