"use client";

import { usePathname } from "next/navigation";

import { getDictionary, getLocaleFromPathname } from "@/lib/i18n";

import styles from "./Footer.module.css";

export default function Footer() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>
          {year} {dictionary.footer.rights} - {dictionary.site.address} - {dictionary.site.email} -{" "}
          {dictionary.site.phone}
        </p>
      </div>
    </footer>
  );
}
