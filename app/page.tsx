import type { Metadata } from "next";

import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import Reveal from "@/components/Reveal";
import ServicesCards from "@/components/ServicesCards";
import StatsBar from "@/components/StatsBar";
import TeamSection from "@/components/TeamSection";
import WorkGrid from "@/components/WorkGrid";

export const metadata: Metadata = {
  title: "Full-stack Studio — Laravel, React, Next.js, React Native & WordPress",
  description:
    "KodraX Studio builds Laravel APIs, React & Next.js frontends, React Native mobile apps, and delivers WordPress solutions."
};

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <Reveal>
        <StatsBar />
      </Reveal>

      <Reveal>
        <ServicesCards id="services" />
      </Reveal>

      <Reveal>
        <WorkGrid id="work" />
      </Reveal>

      <Reveal>
        <TeamSection id="team" />
      </Reveal>

      <Reveal>
        <ContactSection id="contact" />
      </Reveal>
    </>
  );
}
