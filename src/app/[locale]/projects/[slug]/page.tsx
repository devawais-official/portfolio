import { rawProjects } from "@/data";
import { buildSharedFields } from "@/lib/seo";
import { Locale, locales } from "@/i18n/config";
import { getTranslations } from "next-intl/server";
import { getLocalizedPath } from "@/lib/utils";
import { siteRoutes } from "@/lib/site-config";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/features/projects/data";
import ProjectCaseStudy from "@/features/projects/components/ProjectCaseStudy";

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const resolvedLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
    const project = await getProjectBySlug(slug, resolvedLocale);

    if (!project) return {};

    const title = `${project.title} — Case Study | Muhammad Awais`;
    const description =
        project.description ||
        project.summary ||
        `${project.title} — Mobile app engineering case study by Muhammad Awais.`;
    const dynamicPath = `/projects/${slug}`;

    return {
        ...buildSharedFields(resolvedLocale, dynamicPath, title, description),
        title,
    };
}

export async function generateStaticParams() {
    return locales.flatMap((locale) =>
        rawProjects.map((p) => ({
            locale,
            slug: p.slug,
        }))
    );
}

export default async function ProjectDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    const resolvedLocale = locales.includes(locale as Locale) ? (locale as Locale) : "en";

    const project = await getProjectBySlug(slug, resolvedLocale);
    if (!project) notFound();

    const t = await getTranslations({ locale: resolvedLocale });
    const projectsPath = getLocalizedPath(siteRoutes.projects, resolvedLocale);

    const safeT = (key: string, fallback: string) => {
        try {
            const val = t(key);
            return typeof val === "string" && val ? val : fallback;
        } catch {
            return fallback;
        }
    };

    let platforms: Record<string, string> = {};
    try {
        if (t.has("projects.platforms")) {
            platforms = (t.raw("projects.platforms") ?? {}) as Record<string, string>;
        }
    } catch {
        platforms = {};
    }

    const labels = {
        role: safeT("projects.detail.role", "Role"),
        duration: safeT("projects.detail.duration", "Duration"),
        platform: safeT("projects.detail.platform", "Platform"),
        challenge: safeT("projects.detail.challenge", "The Challenge"),
        solution: safeT("projects.detail.solution", "The Solution"),
        outcome: safeT("projects.detail.outcome", "Outcome"),
        techStack: safeT("projects.detail.techStack", "Tech Stack"),
        highlights: safeT("projects.detail.highlights", "Key Highlights"),
        metrics: safeT("projects.detail.metrics", "Impact Metrics"),
        viewOnPlayStore: safeT("projects.detail.viewOnPlayStore", "View on Google Play"),
        viewOnAppStore: safeT("projects.detail.viewOnAppStore", "View on App Store"),
        backToProjects: safeT("projects.ctas.backToProjects", "← All Projects"),
        platforms,
    };

    return (
        <ProjectCaseStudy
            project={project}
            labels={labels}
            projectsPath={projectsPath}
        />
    );
}

