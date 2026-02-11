import en from "@/locales/en.json";
import sr from "@/locales/sr.json";

export const locales = ["en", "sr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = {
  en,
  sr
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function resolveLocale(value: string): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split("/").filter(Boolean)[0] ?? "";
  return resolveLocale(firstSegment);
}

export function withLocalePath(locale: Locale, href: string): string {
  if (!href.startsWith("/")) {
    return href;
  }

  const hashIndex = href.indexOf("#");
  const basePath = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
  const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";

  if (basePath === "/") {
    return hash ? `/${locale}/${hash}` : `/${locale}`;
  }

  return `/${locale}${basePath}${hash}`;
}

export function switchLocaleInPath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  if (isLocale(segments[0])) {
    segments[0] = targetLocale;
    return `/${segments.join("/")}`;
  }

  return `/${targetLocale}/${segments.join("/")}`;
}

export function formatLocalizedDate(
  value: string | number | Date,
  locale: Locale,
  options: Intl.DateTimeFormatOptions
): string {
  const localeCode = locale === "sr" ? "sr-RS" : "en-US";
  return new Intl.DateTimeFormat(localeCode, options).format(new Date(value));
}
