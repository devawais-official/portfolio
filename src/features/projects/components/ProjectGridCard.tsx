"use client";

import Image from "next/image";
import type { Project } from "@/features/projects/data";
import GenericCard, {
  type CardAction,
  type CardBadge,
} from "@/components/ui/PreviewCard";
import {
  AppStoreIcon,
  ArrowUpRightIcon,
  PlayStoreIcon,
  SmartphoneIcon,
} from "@/components/icons";

interface ProjectGridCardProps {
  project: Project & {
    hasSolidBg?: boolean;
    isDarkLogo?: boolean;
  };
  labels: {
    ctaPlayStore: string;
    ctaAppStore: string;
    ctaDetails: string;
  };
  priority?: boolean;
}

export default function ProjectGridCard({
  project,
  labels,
  priority = false,
}: ProjectGridCardProps) {
  const themeColor = project.themeColor || "#3b82f6";

  const media = project.image ? (
    <div className="relative flex h-full w-full items-center justify-center p-6">
      <div
        className="pointer-events-none absolute h-28 w-28 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-125 group-hover:opacity-40"
        style={{
          background: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border transition-all duration-300 group-hover:scale-105 ${
          project.hasSolidBg ? "p-0" : "p-3.5"
        }`}
        style={{
          backgroundColor: project.hasSolidBg
            ? "transparent"
            : `color-mix(in srgb, ${themeColor} 12%, #0f172a)`,
          borderColor: `color-mix(in srgb, ${themeColor} 45%, #ffffff 15%)`,
          boxShadow: `0 8px 20px -6px ${themeColor}30, inset 0 1px 1px rgba(255,255,255,0.15)`,
        }}
      >
        {!project.hasSolidBg && (
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(circle at center, rgba(255,255,255,0.18) 0%, transparent 75%)`,
            }}
          />
        )}

        <Image
          src={project.image}
          alt={project.title || project.slug || "Project Logo"}
          width={96}
          height={96}
          priority={priority}
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
          sizes="96px"
          className={`relative z-10 h-full w-full transition-all duration-300 group-hover:scale-110 ${
            project.hasSolidBg ? "object-cover" : "object-contain"
          }`}
          style={{
            filter: project.isDarkLogo
              ? "drop-shadow(0px 0px 6px rgba(255, 255, 255, 0.6)) brightness(1.2)"
              : "drop-shadow(0 4px 8px rgba(0,0,0,0.4))",
          }}
        />
      </div>
    </div>
  ) : (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div className="flex h-28 w-28 items-center justify-center rounded-2xl border border-border bg-surface-sunken shadow-inner">
        <SmartphoneIcon size={40} className="text-primary/70" />
      </div>
    </div>
  );

  const badges: CardBadge[] = [
    { text: project.platform, variant: "primary" },
    { text: project.category, variant: "secondary" },
  ];

  const tags = project.tech.slice(0, 4).map((techItem) => ({ text: techItem }));
  const actions: CardAction[] = [];
  const storeIconStyle = "h-3.5 w-3.5 shrink-0";

  const playStoreUrl = [project.url, project.iosUrl].find((link) =>
    link?.includes("play.google.com")
  ) ?? null;

  const appStoreUrl = [project.iosUrl, project.url].find((link) =>
    link?.includes("apps.apple.com")
  ) ?? null;

  if (project.isOnPlayStore && playStoreUrl) {
    actions.push({
      label: labels.ctaPlayStore,
      href: playStoreUrl,
      isExternal: true,
      variant: "primary",
      icon: <PlayStoreIcon className={storeIconStyle} aria-hidden="true" />,
    });
  }

  if (project.isOnAppStore && appStoreUrl) {
    actions.push({
      label: labels.ctaAppStore,
      href: appStoreUrl,
      isExternal: true,
      variant: actions.length === 0 ? "primary" : "secondary",
      icon: <AppStoreIcon className={storeIconStyle} aria-hidden="true" />,
    });
  }

  // Always add "View details" so every project card navigates to the case study
  const projectDetailHref = `/projects/${project.slug}`;
  actions.push({
    label: labels.ctaDetails,
    href: projectDetailHref,
    isExternal: false,
    variant: actions.length === 0 ? "primary" : "secondary",
    icon: <ArrowUpRightIcon className={storeIconStyle} aria-hidden="true" />,
  });

  return (
    <GenericCard
      href={projectDetailHref}
      title={project.title || project.slug.replace("-", " ").toUpperCase()}
      summary={project.summary}
      media={media}
      badges={badges}
      tags={tags}
      actions={actions}
    />
  );
}