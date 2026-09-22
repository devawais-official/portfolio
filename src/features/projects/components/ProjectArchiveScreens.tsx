"use client";

import { AnimatedSection } from "@/components/layout/AnimatedSection";
import type { Project } from "@/features/projects/data";
import {
  getArchiveScreens,
  type ArchiveScreenItem,
} from "@/features/projects/data/archive-screens";

export interface ProjectArchiveScreensProps {
  project: Project;
  color?: string;
}

/** Render inner phone content based on screen variant */
function ArchiveScreenContent({ screen }: { screen: ArchiveScreenItem }) {
  const { variant = "orb", kicker, heading, headingItalic, bgStyle } = screen;
  const accentColor = bgStyle.accent || "#FF644E";

  return (
    <div className="relative z-10 flex flex-1 flex-col justify-center py-4">
      {variant === "orb" && (
        <div
          className="mb-4 flex h-9 w-9 items-center justify-center rounded-full text-base font-bold text-white shadow-xs"
          style={{ backgroundColor: accentColor }}
        >
          ✦
        </div>
      )}

      {variant !== "ring" && (
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] opacity-60">
          {kicker}
        </span>
      )}

      {variant === "ring" && (
        <div className="mb-4 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-current shadow-xs">
          <strong className="text-xl font-bold leading-none">4</strong>
          <span className="text-[8px] font-bold uppercase tracking-wider opacity-80">
            days
          </span>
        </div>
      )}

      <h3 className="mt-1.5 text-xl font-bold leading-snug tracking-tight">
        {heading}
        <br />
        {headingItalic && (
          <em className="font-serif font-normal italic">{headingItalic}</em>
        )}
      </h3>

      {variant === "orb" && (
        <div
          className="mt-5 h-1.5 w-16 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      )}

      {variant === "pause" && (
        <div className="mt-8 flex items-center justify-center gap-1.5">
          <span className="h-7 w-2 rounded-full bg-current opacity-80" />
          <span className="h-7 w-2 rounded-full bg-current opacity-80" />
        </div>
      )}

      {variant === "lines" && (
        <div className="mt-6 flex flex-col gap-2">
          <div className="h-2 w-full rounded-full border border-current opacity-40" />
          <div className="h-2 w-full rounded-full border border-current opacity-40" />
          <div className="h-2 w-full rounded-full border border-current opacity-40" />
        </div>
      )}
    </div>
  );
}

export default function ProjectArchiveScreens({
  project,
  color,
}: ProjectArchiveScreensProps) {
  const accentColor = color || project.themeColor || "#00B4D8";
  const screens = getArchiveScreens(project, accentColor);
  const borderStyle = { borderColor: `${accentColor}18` };

  return (
    <section
      className="border-t py-16 sm:py-20"
      style={borderStyle}
      aria-labelledby="archive-title"
    >
      <div className="container-page">
        {/* Section Header */}
        <AnimatedSection>
          <div
            className="flex flex-col gap-4 border-b pb-8 md:flex-row md:items-end md:justify-between"
            style={borderStyle}
          >
            <div>
              <div
                className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em]"
                style={{ color: accentColor }}
              >
                <span>ARCHIVE</span>
                <span className="opacity-40">/</span>
                <span>APP SCREENS</span>
              </div>
              <h2
                id="archive-title"
                className="mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl"
              >
                Visual Record & Key Interface Moments
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-foreground/70">
              A visual record of the product features, preserved after store
              deployment.
            </p>
          </div>
        </AnimatedSection>

        {/* 4 Phone Cards Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {screens.map((screen, index) => (
            <AnimatedSection key={screen.number} delay={index * 0.08}>
              <article className="group flex flex-col">
                {/* Outer Phone Frame */}
                <div className="relative h-[410px] w-full overflow-hidden rounded-[36px] border-[6px] border-neutral-900 bg-neutral-950 shadow-2xl transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]">
                  {/* Phone Inner Screen */}
                  <div
                    className="relative flex h-full w-full select-none flex-col justify-between overflow-hidden rounded-[28px] p-5 transition-transform duration-300 group-hover:scale-[1.01]"
                    style={{
                      backgroundColor: screen.bgStyle.bg,
                      color: screen.bgStyle.text,
                    }}
                  >
                    {/* Status Notch & Header Bar */}
                    <div className="relative z-10 shrink-0">
                      <div className="mx-auto h-4 w-20 rounded-full bg-neutral-900" />
                      <div className="mt-2 flex items-center justify-between px-1 font-mono text-[9px] font-bold opacity-75">
                        <span>9:41</span>
                        <span className="tracking-widest">•••</span>
                      </div>
                    </div>

                    {/* Center Variant Content */}
                    <ArchiveScreenContent screen={screen} />

                    {/* Phone Bottom Pill Indicator */}
                    <div className="relative z-10 flex shrink-0 justify-center">
                      <div className="h-1 w-20 rounded-full bg-black/20" />
                    </div>
                  </div>
                </div>

                {/* Caption below Phone */}
                <div className="mt-4 px-1">
                  <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-foreground/50">
                    {screen.number} / {screen.detail}
                  </div>
                  <h4 className="mt-0.5 text-base font-bold text-heading transition-colors group-hover:text-white">
                    {screen.title}
                  </h4>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
