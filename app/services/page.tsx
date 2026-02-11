import type { Metadata } from "next";

import Reveal from "@/components/Reveal";
import ServicesCards from "@/components/ServicesCards";

import styles from "./services.module.css";

export const metadata: Metadata = {
  title: "Services",
  description: "Laravel, frontend, WordPress/Webflow rescue, and full delivery support services."
};

const process = [
  {
    title: "1. Discovery",
    text: "We align on requirements, technical risk, and clear milestones before implementation."
  },
  {
    title: "2. Build",
    text: "You get iterative delivery with status visibility, code quality checks, and predictable scope control."
  },
  {
    title: "3. Stabilize",
    text: "After launch we track performance, fix bottlenecks, and secure a maintainable long-term baseline."
  }
];

export default function ServicesPage() {
  return (
    <div className="page-wrap">
      <Reveal>
        <section className="section">
          <div className="container">
            <h1 className="section-title">Service coverage</h1>
            <p className="page-intro">
              Engagements include greenfield builds, migrations, rescue projects, and backend/frontend optimization.
            </p>

            <div className={styles.process}>
              {process.map((step) => (
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
        <ServicesCards />
      </Reveal>
    </div>
  );
}
