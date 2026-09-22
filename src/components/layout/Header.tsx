"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { siteConfig, headerSocialLinks } from "@/lib/site-config";
import { useTranslations, useLocale } from "next-intl";
import { Magnetic } from "../ui/Magnetic";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import DesktopNavbar from "./DesktopNavbar";
import MobileDrawer from "./MobileDrawer";
import LanguageSwitcher from "./LanguageSwitcher";
import { MenuIcon, XIcon, ArrowUpRightIcon } from "../icons";
import { Locale, locales } from "@/i18n/config";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  const pathname = usePathname();
  const contextLocale = useLocale() as Locale;
  const t = useTranslations();
  const translate = (key: string, options?: any) => t(key, options);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = lastScrollY.current;
    const delta = current - previous;
    lastScrollY.current = current;

    // Always show near the top of the page
    if (current < 50) {
      setVisible(true);
      return;
    }

    // Dead-zone: ignore tiny scroll movements (< 10px)
    if (Math.abs(delta) < 10) return;

    // Scrolling down → hide, scrolling up → show
    setVisible(delta < 0);
  });

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const getLocalizedHref = useMemo(() => {
    return (href: string) => {
      const segments = pathname.split('/');
      const activeLocale = (locales.includes(segments[1] as any) ? segments[1] : contextLocale) as Locale;
      const cleanPath = href.startsWith('/') ? href.substring(1) : href;
      return cleanPath ? `/${activeLocale}/${cleanPath}` : `/${activeLocale}`;
    };
  }, [pathname, contextLocale]);

  const buttonText = translate("home.buttonStart") || "Let's Talk";

  return (
    <header
      className={cn(
        "fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-transform duration-300",
        "w-[94%] sm:w-auto max-w-[95vw]",
        visible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="liquid-glass flex h-14 sm:h-16 items-center justify-between gap-3 sm:gap-5 lg:gap-7 rounded-full border border-border/40 bg-surface/75 px-3.5 py-1.5 shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-5">
        {/* 1. LEFT: Personal / Brand Logo */}
        <Magnetic strength={0.2}>
          <Link
            href={`/${contextLocale}`}
            className="group relative flex items-center focus:outline-none"
            aria-label={`Go to ${siteConfig.name} home`}
          >
            <div
              className="h-7 w-16 sm:h-8 sm:w-22 bg-gradient-to-r from-primary via-accent-dark to-accent transition-transform duration-300 group-hover:scale-105 [mask-image:url('/brand/ma-logo.svg')] [mask-position:center_left] [mask-repeat:no-repeat] [mask-size:contain]"
              aria-hidden="true"
            />
          </Link>
        </Magnetic>

        {/* 2. CENTER: Nav Links (Services | About | Contact) */}
        <DesktopNavbar
          getLocalizedHref={getLocalizedHref}
          translate={translate}
        />

        {/* 3. RIGHT: Utility & Action Area ([GitHub] [LinkedIn] [🌐 EN ▾] [Let's Talk ]) */}
        <div className="hidden items-center gap-2 sm:gap-2.5 md:flex">
          {/* Developer Icons: Only GitHub & LinkedIn */}
          <div className="flex items-center gap-1">
            {headerSocialLinks.map((social) => (
              <Magnetic key={social.id} strength={0.25}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border/30 bg-surface/60 text-muted transition-all duration-200 hover:border-primary/40 hover:bg-surface hover:text-primary-light"
                >
                  <social.icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Standout Primary CTA Button [ Let's Talk ] */}
          <Magnetic strength={0.15}>
            <Link
              href={getLocalizedHref("/contact")}
              className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-[#151828] shadow-md shadow-primary/20 transition-all duration-300 hover:scale-105 hover:bg-primary-light hover:shadow-lg hover:shadow-primary/30 active:scale-95 whitespace-nowrap min-h-[36px]"
            >
              <span className="font-bold text-[#151828]">{buttonText}</span>
              <ArrowUpRightIcon size={14} className="stroke-[2.5] text-[#151828] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          </Magnetic>
        </div>

        {/* MOBILE CONTROLS */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />

          <Button
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            variant="ghost"
            size="icon"
            className="flex h-10 w-10 min-h-[40px] min-w-[40px] items-center justify-center rounded-full border border-border/30 bg-surface/60 text-muted backdrop-blur-md transition-colors hover:border-primary/40 hover:bg-surface hover:text-heading"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <XIcon className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MenuIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        getLocalizedHref={getLocalizedHref}
        translate={translate}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}