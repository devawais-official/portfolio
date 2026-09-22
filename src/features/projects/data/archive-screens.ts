import type { Project, ArchiveScreenItem } from "@/features/projects/data";

export type { ArchiveScreenItem };

/** Get 4 archive screens for a project from its mapped localized data or generate fallbacks */
export function getArchiveScreens(
  project: Project,
  accentColor: string
): ArchiveScreenItem[] {
  if (project.archiveScreens && project.archiveScreens.length > 0) {
    return project.archiveScreens;
  }

  const highlights = project.highlights ?? [];
  const archiveScreens = project.archiveScreens ?? [];
  return [
    {
      number: "01",
      detail: highlights[0] ? highlights[0].slice(0, 18) : "Overview",
      title: highlights[0] ?? "Core Experience",
      kicker: archiveScreens[0].kicker ?? "01 / FEATURE",
      heading: archiveScreens[0].heading ?? "Built for",
      headingItalic: archiveScreens[0].headingItalic ?? "seamless use.",
      bgStyle: { bg: "#F4EFEA", text: "#18181B", accent: accentColor },
      variant: "orb",
    },
    {
      number: "02",
      detail: highlights[1] ? highlights[1].slice(0, 18) : "Focus mode",
      title: highlights[1] ?? "Key Interaction",
      kicker: archiveScreens[1].kicker ?? "02 / INTERACTION",
      heading: archiveScreens[1].heading ?? "Designed with",
      headingItalic: archiveScreens[1].headingItalic ?? "precision.",
      bgStyle: { bg: "#B4D4F3", text: "#0F172A", accent: accentColor },
      variant: "pause",
    },
    {
      number: "03",
      detail: highlights[2] ? highlights[2].slice(0, 18) : "Progress",
      title: highlights[2] ?? "Performance & Speed",
      kicker: archiveScreens[2].kicker ?? "03 / METRICS",
      heading: archiveScreens[2].heading ?? "Fast, reliable,",
      headingItalic: archiveScreens[2].headingItalic ?? "responsive.",
      bgStyle: { bg: "#C6E357", text: "#0F172A", accent: accentColor },
      variant: "ring",
    },
    {
      number: "04",
      detail: highlights[3] ? highlights[3].slice(0, 18) : "Settings",
      title: highlights[3] ?? "Custom Control",
      kicker: archiveScreens[3].kicker ?? "04 / ARCHITECTURE",
      heading: archiveScreens[3].heading ?? "Tailored to",
      headingItalic: archiveScreens[3].headingItalic ?? "your needs.",
      bgStyle: { bg: "#FF644E", text: "#FFFFFF", accent: "#FFFFFF" },
      variant: "lines",
    },
  ];
}
