"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { m, AnimatePresence, Variants } from "framer-motion";
import { navLinks, headerSocialLinks } from "@/lib/site-config";
import LanguageSwitcher from "./LanguageSwitcher";
import { ArrowUpRightIcon, HomeIcon } from "../icons";

// ============================================================================
// TYPES & PROPS
// ============================================================================
interface MobileDrawerProps {
  isOpen: boolean;
  getLocalizedHref: (href: string) => string;
  translate: (key: string) => string;
  onClose: () => void;
}

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const drawerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "-100%",
    transition: {
      type: "tween",
      ease: "easeInOut",
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function MobileDrawer({
  isOpen,
  getLocalizedHref,
  translate,
  onClose,
}: MobileDrawerProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  // Lock body scroll when drawer is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const isActive = (href: string) => {
    const localized = getLocalizedHref(href);
    return pathname === localized; 
  };

  const buttonText = translate("home.buttonStart") || "Let's Talk";

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* BACKDROP OVERLAY */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-background/80 backdrop-blur-md md:hidden"
            aria-hidden="true"
          />

          {/* MAIN DRAWER CONTAINER */}
          <m.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed left-0 top-16 z-[9999] flex h-[calc(100vh-4rem)] w-full flex-col justify-between overflow-y-auto border-t border-border/30 bg-surface/95 p-6 backdrop-blur-xl md:hidden"
          >
            {/* NAVIGATION LINKS GRID */}
            <div className="grid grid-cols-1 gap-3 py-6">
              {/* 1. Home Link with Home Icon */}
              <m.div variants={itemVariants}>
                <Link
                  href={getLocalizedHref("/")}
                  onClick={onClose}
                  className={
                    isActive("/")
                      ? "flex items-center gap-3 rounded-xl border border-primary/30 bg-primary/15 p-4 font-semibold text-heading transition-all duration-200"
                      : "flex items-center gap-3 rounded-xl p-4 text-muted transition-all duration-200 hover:bg-surface/60 hover:text-heading"
                  }
                >
                  <HomeIcon size={18} className="text-primary" aria-hidden="true" />
                  <span className="text-base font-semibold uppercase tracking-wide">
                    {translate("nav.home") || "Home"}
                  </span>
                </Link>
              </m.div>

              {/* 2. Other Core Links (Services, About) */}
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <m.div key={link.href} variants={itemVariants}>
                    <Link
                      href={getLocalizedHref(link.href)}
                      onClick={onClose}
                      className={
                        active
                          ? "flex items-center justify-between rounded-xl border border-primary/30 bg-primary/15 p-4 font-semibold text-heading transition-all duration-200"
                          : "flex items-center justify-between rounded-xl p-4 text-muted transition-all duration-200 hover:bg-surface/60 hover:text-heading"
                      }
                    >
                      <span className="text-base font-semibold uppercase tracking-wide">
                        {translate(`nav.${link.label.toLowerCase()}`)}
                      </span>
                    </Link>
                  </m.div>
                );
              })}
            </div>

            {/* SEPARATOR, DEVELOPER ICONS, LANGUAGE SWITCHER & CTA BUTTON */}
            <div className="mt-auto flex flex-col gap-5 pb-6">
              <m.div
                variants={itemVariants}
                className="border-t border-border/20"
              />

              <m.div
                variants={itemVariants}
                className="flex items-center justify-between gap-4"
              >
                {/* Developer Icons (GitHub, LinkedIn) */}
                <div className="flex items-center gap-3">
                  {headerSocialLinks.map((social) => (
                    <a
                      key={social.id}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit my ${social.label} profile`}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border/30 bg-surface/60 text-muted transition-all duration-200 hover:border-primary/40 hover:bg-surface hover:text-primary-light"
                      onClick={onClose}
                    >
                      <social.icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  ))}
                </div>

                {/* Language Switcher */}
                <LanguageSwitcher direction="up" align="right" />
              </m.div>

              {/* Standout Primary CTA Button */}
              <m.div variants={itemVariants} className="w-full">
                <Link
                  href={getLocalizedHref("/contact")}
                  onClick={onClose}
                  className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-[#151828] shadow-lg shadow-primary/25 hover:bg-primary-light hover:shadow-xl active:scale-95"
                >
                  <span className="font-bold text-[#151828]">{buttonText}</span>
                  <ArrowUpRightIcon size={16} className="stroke-[2.5] text-[#151828]" aria-hidden="true" />
                </Link>
              </m.div>
            </div>
          </m.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}