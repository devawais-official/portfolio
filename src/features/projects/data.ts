import { rawProjects } from "@/data";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/config";
import { withTranslatedFields } from "@/i18n/data-mapper";

export interface ProjectMetric {
    label: string;
    value: string;
}

export interface RawArchiveScreen {
    number: string;
    bgStyle: {
        bg: string;
        text: string;
        accent?: string;
    };
    variant?: "orb" | "pause" | "ring" | "lines";
}

export interface ArchiveScreenItem extends RawArchiveScreen {
    detail: string;
    title: string;
    kicker: string;
    heading: string;
    headingItalic?: string;
}

export interface RawProject {
    id: number;
    slug: string;
    platform: string;
    image: string;
    url?: string;
    isOnPlayStore: boolean;
    isOnAppStore: boolean;
    themeColor?: string;
    mockupVariant?: string;
    iosUrl?: string;
    tech: string[];
    technology?: string;
    updatedAt?: string;
    archiveScreens?: RawArchiveScreen[];
}

export interface Project extends RawProject {
    title: string;
    summary: string;
    category: string;
    altText: string;
    // Case study fields (from i18n)
    description?: string;
    role?: string;
    duration?: string;
    challenge?: string;
    solution?: string;
    outcome?: string;
    highlights?: string[];
    metrics?: ProjectMetric[];
    archiveScreens?: ArchiveScreenItem[];
}

export function mapToLocalizedProject(
    raw: RawProject,
    translate: (key: string, options?: any) => any
): Project {
    return withTranslatedFields(raw, "projects.items", translate, (st) => {
        const title = (st("title") ?? "") as string;
        const summary = (st("summary") ?? "") as string;
        const category = (st("category") ?? "") as string;
        let fetchedAlt: any = "";
        try {
            fetchedAlt = st("altText");
        } catch {
            fetchedAlt = "";
        }
        const altText = (fetchedAlt && typeof fetchedAlt === "string" && fetchedAlt.length > 0)
            ? fetchedAlt
            : `${title || "Project"} preview by Muhammad Awais`;

        // Safely read optional case study fields
        const safeRead = (key: string): string => {
            try { return (st(key) ?? "") as string; } catch { return ""; }
        };
        const safeReadArr = (key: string): string[] => {
            try { const v = st(key); return Array.isArray(v) ? v : []; } catch { return []; }
        };
        const safeReadMetrics = (): ProjectMetric[] => {
            try {
                const v = st("metrics");
                if (!Array.isArray(v)) return [];
                return v.map((m: any) => ({ label: m.label ?? "", value: m.value ?? "" }));
            } catch { return []; }
        };
        const safeReadArchiveScreens = (): ArchiveScreenItem[] => {
            try {
                const rawScreens = raw.archiveScreens;
                if (!Array.isArray(rawScreens) || rawScreens.length === 0) return [];
                let locScreens: any[] = [];
                try {
                    const found = st("archiveScreens");
                    if (Array.isArray(found)) locScreens = found;
                } catch {
                    locScreens = [];
                }
                return rawScreens.map((rawItem, idx) => {
                    const locItem = locScreens[idx] ?? {};
                    return {
                        ...rawItem,
                        detail: locItem?.detail ?? "",
                        title: locItem?.title ?? "",
                        kicker: locItem?.kicker ?? "",
                        heading: locItem?.heading ?? "",
                        headingItalic: locItem?.headingItalic,
                    };
                });
            } catch {
                return [];
            }
        };

        return {
            title,
            summary,
            category,
            altText,
            description: safeRead("description"),
            role: safeRead("role"),
            duration: safeRead("duration"),
            challenge: safeRead("challenge"),
            solution: safeRead("solution"),
            outcome: safeRead("outcome"),
            highlights: safeReadArr("highlights"),
            metrics: safeReadMetrics(),
            archiveScreens: safeReadArchiveScreens(),
        };
    }) as Project;
}

export async function getProjectData(locale: Locale): Promise<Project[]> {
    const t = await getTranslations({ locale });
    const translate = (key: string, options?: any) => {
        try {
            if (t.has(key)) return t.raw(key);
            return "";
        } catch {
            try { return t(key, options); } catch { return ""; }
        }
    };
    return (rawProjects as RawProject[]).map((raw) =>
        mapToLocalizedProject(raw, translate)
    );
}

export async function getProjectBySlug(slug: string, locale: Locale): Promise<Project | null> {
    const t = await getTranslations({ locale });
    const translate = (key: string, options?: any) => {
        try {
            if (t.has(key)) return t.raw(key);
            return "";
        } catch {
            try { return t(key, options); } catch { return ""; }
        }
    };
    const raw = (rawProjects as RawProject[]).find((p) => p.slug === slug);
    if (!raw) return null;
    return mapToLocalizedProject(raw, translate);
}