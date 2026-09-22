"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { m } from "framer-motion";
import { AnimatedSection } from "@/components/layout/AnimatedSection";
import StatCounter from "@/components/ui/StatCounter";
import AppMockup, { type MockupVariant } from "./AppMockup";
import ProjectArchiveScreens from "./ProjectArchiveScreens";
import type { Project } from "@/features/projects/data";
import {
  PlayStoreIcon,
  AppStoreIcon,
  ArrowUpRightIcon,
} from "@/components/icons";

// ============================================================================
// TYPES & CONSTANTS
// ============================================================================
export interface CaseStudyLabels {
  role: string;
  duration: string;
  platform: string;
  challenge: string;
  solution: string;
  outcome: string;
  techStack: string;
  highlights: string;
  metrics: string;
  viewOnPlayStore: string;
  viewOnAppStore: string;
  backToProjects: string;
  platforms?: Record<string, string>;
}

interface ProjectCaseStudyProps {
  project: Project;
  labels: CaseStudyLabels;
  projectsPath: string;
}

const DEFAULT_PLATFORM_MAP: Record<string, string> = {
  android: "Android Native",
  flutter: "Flutter",
  ios: "iOS",
  kmp: "Kotlin Multiplatform",
  cmp: "Compose Multiplatform",
  web: "Web",
};

function formatPlatform(platform: string, platformsMap?: Record<string, string>): string {
  return platformsMap?.[platform] ?? DEFAULT_PLATFORM_MAP[platform] ?? platform;
}

// ============================================================================
// HELPER UI COMPONENTS
// ============================================================================
function MetaPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
        {label}
      </span>
      <span className="text-sm font-semibold text-heading">{value}</span>
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-6 shrink-0 bg-primary" />
      <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
        {label}
      </span>
    </div>
  );
}

function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-muted transition-colors hover:text-heading"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M9 2L4 7L9 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {label}
    </Link>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ProjectCaseStudy({
  project,
  labels,
  projectsPath,
}: ProjectCaseStudyProps) {
  const mockupVariant = (project.mockupVariant as MockupVariant) || "screen-default";

  // Derive store and live action links
  const playStoreUrl =
    project.isOnPlayStore && project.url && project.url !== "#"
      ? project.url
      : null;
  const appStoreUrl =
    project.isOnAppStore && project.iosUrl && project.iosUrl !== "#"
      ? project.iosUrl
      : null;
  const liveUrl =
    !playStoreUrl && !appStoreUrl && project.url && project.url !== "#"
      ? project.url
      : null;

  const actionButtons = [
    playStoreUrl && {
      href: playStoreUrl,
      label: labels.viewOnPlayStore,
      Icon: PlayStoreIcon,
      className: "btn-primary",
    },
    appStoreUrl && {
      href: appStoreUrl,
      label: labels.viewOnAppStore,
      Icon: AppStoreIcon,
      className:
        "inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-heading shadow-xs transition-all duration-300 hover:border-border-strong hover:bg-surface-elevated active:scale-95",
    },
    liveUrl && {
      href: liveUrl,
      label: "Visit Live",
      Icon: ArrowUpRightIcon,
      className: "btn-primary",
    },
  ].filter(Boolean) as Array<{
    href: string;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
    className: string;
  }>;

  return (
    <div className="main-content-stream">
      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-12 pt-6 sm:pt-10">
        <div className="layout-glow-layer" aria-hidden="true" />

        <div className="container-page">
          <AnimatedSection>
            <BackLink href={projectsPath} label={labels.backToProjects} />
          </AnimatedSection>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_auto]">
            {/* Left Column: Details & Actions */}
            <AnimatedSection delay={0.05}>
              <p className="eyebrow">{project.category}</p>

              <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-heading sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>

              <p className="mt-4 max-w-xl text-base text-foreground/80 sm:text-lg">
                {project.description || project.summary}
              </p>

              {/* Metadata Pills */}
              <div className="card-surface mt-6 flex flex-wrap gap-6 p-4">
                {project.role && (
                  <MetaPill label={labels.role} value={project.role} />
                )}
                {project.duration && (
                  <MetaPill label={labels.duration} value={project.duration} />
                )}
                <MetaPill
                  label={labels.platform}
                  value={formatPlatform(project.platform, labels.platforms)}
                />
              </div>

              {/* Action Buttons */}
              {actionButtons.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-3">
                  {actionButtons.map(({ href, label, Icon, className }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      <Icon className="h-3.5 w-3.5 shrink-0" />
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </AnimatedSection>

            {/* Right Column: Phone Mockup */}
            <AnimatedSection
              delay={0.12}
              className="flex items-start justify-center lg:justify-end"
            >
              <div className="relative flex items-center gap-6">
                {project.image && (
                  <div className="relative hidden h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-md sm:flex">
                    <Image
                      src={project.image}
                      alt={project.altText}
                      width={52}
                      height={52}
                      className="h-12 w-12 object-contain"
                    />
                  </div>
                )}
                <AppMockup variant={mockupVariant} themeColor={project.themeColor} />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── IMPACT METRICS ───────────────────────────────────────── */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="border-y border-border bg-surface/50">
          <div className="container-page py-10">
            <AnimatedSection>
              <SectionLabel label={labels.metrics} />
            </AnimatedSection>
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {project.metrics.map((metric, i) => (
                <AnimatedSection key={metric.label} delay={i * 0.07}>
                  <StatCounter value={metric.value} label={metric.label} />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ARCHIVE APP SCREENS ────────────────────────────────────── */}
      <ProjectArchiveScreens project={project} />

      {/* ── CHALLENGE & SOLUTION ─────────────────────────────────── */}
      {(project.challenge || project.solution) && (
        <section className="section-pad">
          <div className="container-page">
            <div className="grid gap-10 lg:grid-cols-2">
              {project.challenge && (
                <AnimatedSection>
                  <SectionLabel label={labels.challenge} />
                  <p className="mt-4 text-base leading-relaxed text-foreground/80">
                    {project.challenge}
                  </p>
                </AnimatedSection>
              )}
              {project.solution && (
                <AnimatedSection delay={0.08}>
                  <SectionLabel label={labels.solution} />
                  <p className="mt-4 text-base leading-relaxed text-foreground/80">
                    {project.solution}
                  </p>
                </AnimatedSection>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── OUTCOME QUOTE ─────────────────────────────────────────── */}
      {project.outcome && (
        <section className="py-10">
          <div className="container-page">
            <AnimatedSection>
              <div className="card-surface relative overflow-hidden p-8 sm:p-10">
                <span
                  className="absolute left-6 top-2 select-none font-display text-8xl font-black leading-none text-primary-subtle"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <SectionLabel label={labels.outcome} />
                <p className="relative mt-4 max-w-3xl text-lg font-medium leading-relaxed text-heading sm:text-xl">
                  {project.outcome}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ── KEY HIGHLIGHTS ─────────────────────────────────────────── */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="section-pad">
          <div className="container-page">
            <AnimatedSection>
              <SectionLabel label={labels.highlights} />
            </AnimatedSection>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {project.highlights.map((highlight, i) => (
                <AnimatedSection key={highlight} delay={i * 0.06}>
                  <div className="card-surface flex items-start gap-3 p-4">
                    <span className="badge-icon h-5 w-5 shrink-0 text-[10px] font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-medium text-foreground">
                      {highlight}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TECH STACK ─────────────────────────────────────────────── */}
      {project.tech && project.tech.length > 0 && (
        <section className="pb-16">
          <div className="container-page">
            <AnimatedSection>
              <SectionLabel label={labels.techStack} />
            </AnimatedSection>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((tag, i) => (
                <m.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="inline-flex items-center rounded-full border border-border bg-primary-subtle px-3.5 py-1.5 font-mono text-xs font-semibold text-primary transition-all duration-200 hover:scale-105"
                >
                  {tag}
                </m.span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM NAV ─────────────────────────────────────────────── */}
      <div className="border-t border-border">
        <div className="container-page py-8">
          <AnimatedSection>
            <BackLink href={projectsPath} label={labels.backToProjects} />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}