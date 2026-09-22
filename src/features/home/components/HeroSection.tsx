import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import StatCounter from "@/components/ui/StatCounter";
import { Button } from "@/components/ui/Button";
import { MappedHomeData } from "./HomeView";
import SectionWrapper from "@/components/layout/SectionWrapper";
import { AndroidIcon, ArrowUpRightIcon, FlutterIcon, KotlinIcon } from "@/components/icons";

// ============================================================================
// 1. THEME & CONFIGURATION LAYER
// ============================================================================
const THEME_CONFIG = {
  shapes: {
    squircleRadius: "42% 58% 63% 37% / 41% 45% 55% 59%",
  },
  styles: {
    /* FIXED: Increased top-padding (pt-32 sm:pt-36 lg:pt-36) so the top badge doesn't overlap with the header */
    sectionWrapper: "pb-8 pt-24 sm:pt-28 lg:pt-28",
    layoutGrid: "container-page grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]",
    headingGradient: "text-gradient-brand",
    portraitMaskBg: "bg-gradient-to-br from-primary-subtle to-transparent",
    portraitEchoOuter: "pointer-events-none absolute inset-0 -rotate-3 scale-[0.98] border border-border-subtle md:-rotate-6",
    portraitEchoInner: "pointer-events-none absolute -inset-2 rotate-2 border border-border-subtle/50 md:-inset-3 md:rotate-3",

    badgeContainer: "liquid-glass relative z-20 mx-auto -mt-6 flex w-fit items-center gap-4 rounded-full px-6 py-3 shadow-lg",

    badgeItem: "badge-icon",

    tooltip: "liquid-glass pointer-events-none absolute bottom-full left-1/2 mb-3 -translate-x-1/2 scale-75 rounded-lg border border-border-subtle px-2.5 py-1 text-[11px] font-medium text-heading shadow-lg opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap z-30",
    tooltipArrow: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-primary-dark",
  },

  data: {
    stackBadges: [
      { id: "kotlin", tooltip: "Kotlin" },
      { id: "compose", tooltip: "Compose" },
      { id: "flutter", tooltip: "Flutter" },
    ],
  },
} as const;

type StackBadge = typeof THEME_CONFIG.data.stackBadges[number];
type StackBadgeId = StackBadge["id"];

const STACK_BADGE_ICONS: Record<StackBadgeId, ReactNode> = {
  kotlin: <KotlinIcon className="h-3.5 w-3.5" aria-hidden="true" />,
  compose: <AndroidIcon className="h-3.5 w-3.5" aria-hidden="true" />,
  flutter: <FlutterIcon className="h-3.5 w-3.5" aria-hidden="true" />,
};

interface HeroSectionProps {
  translate: (key: string) => string;
  homeData: MappedHomeData;
}

// ============================================================================
// 2. SUB-COMPONENTS
// ============================================================================

/** Status indicator for availability with fixed spacing and vertical alignment */
function AvailabilityBadge({ text }: { text: string }) {
  return (
    <p className="eyebrow flex items-center gap-2.5">
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
      </span>
      <span>{text}</span>
    </p>
  );
}

// ============================================================================
// MAIN HERO PORTRAIT COMPONENT
// ============================================================================
function HeroPortrait({ translate }: { translate: (key: string) => string }) {
  const { shapes, styles, data } = THEME_CONFIG;

  return (
    <div className="relative aspect-[4/5] w-full max-w-[260px] sm:max-w-[320px] md:max-w-[340px] lg:max-w-[370px]">
      {/* Background Echo Shapes */}
      <div
        className={styles.portraitEchoOuter}
        style={{ borderRadius: shapes.squircleRadius }}
        aria-hidden="true"
      />
      <div
        className={styles.portraitEchoInner}
        style={{ borderRadius: shapes.squircleRadius }}
        aria-hidden="true"
      />

      {/* Masked Portrait Image */}
      <div
        className={`relative z-10 h-full w-full overflow-hidden ${styles.portraitMaskBg}`}
        style={{ borderRadius: shapes.squircleRadius }}
      >
        <Image
          src="/brand/dev-pic.webp"
          alt={translate("home.portraitAlt")}
          fill
          sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 370px"
          className="object-cover object-top transition-transform duration-500 hover:scale-105"
          priority
          fetchPriority="high"
        />
      </div>

      {/* Floating Stack Badges Bar */}
      <div className={styles.badgeContainer}>
        {data.stackBadges.map((badge) => (
          <TechBadgeItem key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// INDIVIDUAL TECH STACK BADGE WITH WORKING TOOLTIP
// ============================================================================
function TechBadgeItem({ badge }: { badge: StackBadge }) {
  return (
    <div
      className="group relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface/80 text-primary backdrop-blur-md transition-all duration-300 hover:border-border-strong hover:bg-surface hover:text-heading"
      aria-label={`${badge.tooltip} technology`}
    >
      {/* Tech Icon */}
      <span className="flex h-5 w-5 items-center justify-center">
        {STACK_BADGE_ICONS[badge.id]}
      </span>

      {/* Modern Tooltip with Smooth Fade-up Animation */}
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 translate-y-1 opacity-0 scale-95 whitespace-nowrap rounded-lg border border-border/60 bg-surface-elevated/95 px-3 py-1 font-mono text-[11px] font-semibold tracking-wide text-heading shadow-xl backdrop-blur-md transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 z-50">
        {badge.tooltip}

        {/* Tooltip Arrow */}
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-r border-b border-border/60 bg-surface-elevated" />
      </span>
    </div>
  );
}

// ============================================================================
// 3. MAIN HERO COMPONENT
// ============================================================================
export default function HeroSection({ translate, homeData }: HeroSectionProps) {
  const { stats, availabilityText, contactPath, projectsPath } = homeData;

  return (
    <SectionWrapper className={THEME_CONFIG.styles.sectionWrapper}>
      <div className={THEME_CONFIG.styles.layoutGrid}>

        {/* Left Side: Content & Actions */}
        <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left w-full">
          {/* Availability Badge */}
          <AvailabilityBadge text={availabilityText} />

          {/* Fixed Heading Structure */}
          <h1 className="mt-5 font-display text-3xl font-bold leading-[1.12] tracking-tight text-heading sm:text-4xl md:text-5xl lg:text-[52px] xl:text-[58px]">
            {/* REMOVED: whitespace-nowrap to prevent Japanese text from overflowing screens */}
            <span className="block text-heading [text-wrap:balance]">
              {translate("home.heading1")}
            </span>

            {/* Heading 2: Styled Accent Text */}
            <em> <span className={`block mt-1 sm:mt-2 ${THEME_CONFIG.styles.headingGradient} [text-wrap:balance]`}>
              {translate("home.heading2")}
            </span></em>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl font-normal text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
            {translate("home.description")}
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row lg:justify-start">
            <Button asChild variant="solid" className="btn-primary w-full sm:w-auto">
              <Link href={contactPath} className="inline-flex items-center justify-center gap-2">
                {translate("home.buttonStart")} <ArrowUpRightIcon size={16} />
              </Link>
            </Button>

            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href={projectsPath}>
                {translate("home.buttonView")}
              </Link>
            </Button>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 grid w-full grid-cols-3 gap-6 border-t border-border/50 pt-8">
            <StatCounter value={stats.yearsExperience} label={translate("home.stats.experience")} />
            <StatCounter value={stats.projectsCompleted} label={translate("home.stats.completed")} />
            <StatCounter value={stats.appsOnStores} label={translate("home.stats.stores")} />
          </div>
        </div>

        {/* Right Side: Portrait Visuals */}
        <div className="flex h-full w-full items-center justify-center lg:justify-end lg:self-center">
          <HeroPortrait translate={translate} />
        </div>

      </div>
    </SectionWrapper>
  );
}