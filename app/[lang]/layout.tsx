import { locales } from "@/lib/i18n";
import { requireLocale } from "@/lib/routeLocale";

interface LocalizedLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocalizedLayout({ children, params }: LocalizedLayoutProps) {
  const { lang } = await params;
  const locale = requireLocale(lang);

  return <div lang={locale}>{children}</div>;
}
