import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/lib/i18n";

export function requireLocale(locale: string): Locale {
  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}
