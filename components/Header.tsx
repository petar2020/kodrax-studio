"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { getDictionary, getLocaleFromPathname, switchLocaleInPath, withLocalePath } from "@/lib/i18n";

import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname() ?? "/";
  const locale = getLocaleFromPathname(pathname);
  const dictionary = getDictionary(locale);

  const navLinks = [
    { href: "/#work", label: dictionary.header.nav.work },
    { href: "/services", label: dictionary.header.nav.services },
    { href: "/about", label: dictionary.header.nav.team },
    { href: "/case-studies", label: dictionary.header.nav.caseStudies },
    { href: "/blog", label: dictionary.header.nav.blog },
    { href: "/contact", label: dictionary.header.nav.contact }
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const drawerRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const closeDrawer = () => setIsOpen(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 6);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);

    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const getFocusable = (): HTMLElement[] => {
      const drawer = drawerRef.current;

      if (!drawer) {
        return [];
      }

      return Array.from(
        drawer.querySelectorAll<HTMLElement>('a,button,[tabindex]:not([tabindex="-1"])')
      );
    };

    getFocusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawer();
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusable();

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.bar}`}>
          <Link href={`/${locale}`} className={styles.brand}>
            <span className={styles.logoMark}>K</span>
            KodraX <span className={styles.tag}>Studio</span>
          </Link>

          <nav className={styles.desktopNav} aria-label={dictionary.header.primaryNavLabel}>
            {navLinks.map((link) => (
              <Link key={link.href} href={withLocalePath(locale, link.href)} className={styles.navLink}>
                {link.label}
              </Link>
            ))}

            <div className={styles.localeSwitch} aria-label={dictionary.header.language}>
              <Link
                href={switchLocaleInPath(pathname, "en")}
                className={`${styles.localeLink} ${locale === "en" ? styles.localeLinkActive : ""}`}
              >
                EN
              </Link>
              <span>|</span>
              <Link
                href={switchLocaleInPath(pathname, "sr")}
                className={`${styles.localeLink} ${locale === "sr" ? styles.localeLinkActive : ""}`}
              >
                SR
              </Link>
            </div>

            <a
              className={`${styles.navLink} ${styles.ghostButton}`}
              href="https://www.upwork.com/agencies/1965890569940564427/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {dictionary.header.upwork}
            </a>
          </nav>

          <button
            ref={triggerRef}
            type="button"
            className={`${styles.hamburger} ${isOpen ? styles.hamburgerActive : ""}`}
            aria-label={dictionary.header.openMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-drawer"
            onClick={() => setIsOpen((state) => !state)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropVisible : ""}`}
        onClick={closeDrawer}
        aria-hidden={!isOpen}
      />

      <nav
        ref={drawerRef}
        id="mobile-drawer"
        className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label={dictionary.header.mobileNavLabel}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={withLocalePath(locale, link.href)}
            className={styles.drawerLink}
            onClick={closeDrawer}
          >
            {link.label}
          </Link>
        ))}
        <div className={styles.mobileLocaleSwitch}>
          <span>{dictionary.header.language}:</span>
          <Link
            href={switchLocaleInPath(pathname, "en")}
            className={`${styles.localeLink} ${locale === "en" ? styles.localeLinkActive : ""}`}
            onClick={closeDrawer}
          >
            EN
          </Link>
          <span>|</span>
          <Link
            href={switchLocaleInPath(pathname, "sr")}
            className={`${styles.localeLink} ${locale === "sr" ? styles.localeLinkActive : ""}`}
            onClick={closeDrawer}
          >
            SR
          </Link>
        </div>
        <span className={styles.spacer} aria-hidden="true" />
        <a
          className={`${styles.drawerLink} ${styles.ghostButton}`}
          href="https://www.upwork.com/agencies/1965890569940564427/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeDrawer}
        >
          {dictionary.header.upwork}
        </a>
      </nav>
    </>
  );
}
