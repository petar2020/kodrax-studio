import type { Metadata } from "next";

import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import Reveal from "@/components/Reveal";
import StatsBar from "@/components/StatsBar";
import ServicesCards from "@/components/ServicesCards";
import TeamSection from "@/components/TeamSection";
import WorkGrid from "@/components/WorkGrid";
import { getDictionary } from "@/lib/i18n";
import { requireLocale } from "@/lib/routeLocale";

interface HomePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.homePage.title,
    description: dictionary.homePage.description
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  const locale = requireLocale(lang);

  return (
    <>
      <HeroSection locale={locale} />

      <Reveal>
        <StatsBar locale={locale} />
      </Reveal>

      <Reveal>
        <ServicesCards id="services" locale={locale} />
      </Reveal>

      <Reveal>
        <WorkGrid id="work" locale={locale} />
      </Reveal>

      <Reveal>
        <TeamSection id="team" locale={locale} />
      </Reveal>

      <Reveal>
        <ContactSection id="contact" locale={locale} />
      </Reveal>
    </>
  );
}
