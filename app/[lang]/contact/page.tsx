import type { Metadata } from "next";

import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import { getDictionary } from "@/lib/i18n";
import { requireLocale } from "@/lib/routeLocale";

interface ContactPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);

  return {
    title: dictionary.contactPage.metaTitle,
    description: dictionary.contactPage.metaDescription
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = await params;
  const locale = requireLocale(lang);
  const dictionary = getDictionary(locale);

  return (
    <div className="page-wrap">
      <Reveal>
        <ContactSection
          locale={locale}
          title={dictionary.contactPage.title}
          description={dictionary.contactPage.description}
        />
      </Reveal>
    </div>
  );
}
