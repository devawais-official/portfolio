import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import { locales, Locale, defaultLocale } from "@/i18n/config";

const localizedDefaults: Record<Locale, { title: string; description: string }> = {
    en: {
        title: `M. Awais | Android & Cross-Platform Architect`,
        description: `M. Awais — Senior Android & Cross-Platform Developer (KMP, CMP, Flutter) with 6+ years building scalable apps using Clean Architecture, MVI & SOLID.`,

    },
    ur: {
        title: "محمد اویس | اینڈرائیڈ اور کراس پلیٹ فارم آرکیٹیکٹ",
        description: "محمد اویس — 6+ سالہ تجربہ کار سینئر اینڈرائیڈ و کراس پلیٹ فارم ڈویلپر (KMP, CMP, Flutter)۔ کلین آرکیٹیکچر، MVI اور SOLID کے ماہر۔",
    },
    de: {
        title: "M. Awais | Android & Cross-Platform Architekt",
        description: "M. Awais — Senior Android & Cross-Platform Entwickler (KMP, CMP, Flutter) mit 6+ Jahren Erfahrung in skalierbarer Clean Architecture & MVI.",
    },
    ar: {
        title: "محمد أويس | مهندس تطبيقات أندرويد وتطبيقات متعددة المنصات",
        description: "محمد أويس — مهندس برمجيات وتطبيقات أندرويد وتطبيقات متعددة المنصات (KMP, CMP, Flutter) بخبرة أكثر من 6 سنوات في بناء تطبيقات قابلة للتوسع باستخدام Clean Architecture و MVI.",
    },
    fr: {
        title: "M. Awais | Architecte Mobile Android & Multiplateforme",
        description: "M. Awais — Développeur Mobile Senior Android & Multiplateforme (KMP, CMP, Flutter) avec 6+ ans d'expérience en Clean Architecture et MVI."
    },
    es: {
        title: "M. Awais | Arquitecto Móvil Android y Multiplataforma",
        description: "M. Awais — Desarrollador Senior Móvil y Multiplataforma (KMP, CMP, Flutter) con más de 6 años construyendo aplicaciones escalables usando Clean Architecture, MVI y SOLID."
    },
    ja: {
        title: `M. Awais | Android & クロスプラットフォーム アーキテクト`,
        description: `M. Awais — Clean Architecture、MVI、SOLIDを用いて拡張性の高いアプリを開発する、6年以上の実績を持つシニアAndroid & クロスプラットフォームデベロッパー（KMP、CMP、Flutter）。`,
    },
    tr: {
        title: `M. Awais | Android ve Çapraz Platform Mimarı`,
        description: `M. Awais — Clean Architecture, MVI ve SOLID kullanarak ölçeklenebilir uygulamalar geliştiren 6+ yıl deneyimli Kıdemli Android ve Çapraz Platform Geliştiricisi (KMP, CMP, Flutter).`,
    },
};

const ogLocaleMap: Record<Locale, string> = {
    en: "en_US",
    ur: "ur_PK",
    de: "de_DE",
    ar: "ar_SA",
    fr: "fr_FR",
    es: "es_ES",
    ja: "ja_JP",
    tr: "tr_TR",

};

export const rtlLocales: Locale[] = ["ur", "ar"];

export function buildSharedFields(locale: Locale, path: string, title: string, description: string): Metadata {
    const languageAlternates = Object.fromEntries(
        locales.map((l) => [l, `${siteConfig.url}/${l}${path}`])
    );

    return {
        metadataBase: new URL(siteConfig.url),
        description,
        alternates: {
            canonical: locale === defaultLocale ? `${siteConfig.url}${path}` : `${siteConfig.url}/${locale}${path}`,
            languages: {
                ...languageAlternates,
                "x-default": `${siteConfig.url}/${defaultLocaleFallback()}${path}`,
            },
        },
        openGraph: {
            type: "website",
            url: locale === defaultLocale ? `${siteConfig.url}${path}` : `${siteConfig.url}/${locale}${path}`,
            title,
            description,
            siteName: "Muhammad Awais — Senior Mobile Developer Portfolio",
            locale: ogLocaleMap[locale],
            images: [
                {
                    url: `${siteConfig.url}/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`${siteConfig.url}/og-image.png`],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
            },
        },
        icons: {
            icon: "/favicon.svg",
        },
        other: {
            "color-scheme": "dark only",
        },
    };
}

function defaultLocaleFallback() {
    return "en";
}

export function getMetadata(locale: string): Metadata {
    const resolvedLocale: Locale = locales.includes(locale as Locale) ? (locale as Locale) : "en";
    const { title, description } = localizedDefaults[resolvedLocale];

    // ⚡ SEO & GEO HIGH-INTENT KEYWORDS: Optimized for Google SERPs, Perplexity & SearchGPT
    const advancedKeywords = [
        "Muhammad Awais", "Awais", "Devawais", "devawais-official", "awaisdevm",
        "Mobile Dev", "Mobile Developer", "Senior Mobile Developer", "Mobile App Architect",
        "Android Developer", "Senior Android Developer", "Kotlin Multiplatform", "KMP Developer",
        "Compose Multiplatform", "CMP Developer", "Flutter Developer", "Senior Flutter Developer",
        "Flutter Expert", "Clean Architecture", "MVI Architecture", "Jetpack Compose",
        "Agora SDK Integration", "IoT Hardware Integration", "Telehealth App Developer",
        "FinTech App Developer", "Android Developer Lahore", "Mobile Consultant Pakistan"
    ];

    return {
        ...buildSharedFields(resolvedLocale, "", title, description),
        title,
        keywords: advancedKeywords,
    };
}

// ⚡ HIGH SEO & GEO OPTIMIZATION: Schema.org Knowledge Graph Generator for Google & AI Engines
export const getCombinedSchemaData = () => {
    return [
        {
            "@type": "WebSite",
            "name": "Muhammad Awais — Mobile App Developer & Multiplatform Architect",
            "alternateName": ["Devawais", "awaisdevm", "Muhammad Awais", "devawais-official"],
            "url": siteConfig.url,
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${siteConfig.url}/?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
            }
        },
        {
            "@type": "Person",
            "name": "Muhammad Awais",
            "alternateName": ["Devawais", "awaisdevm", "Awais", "devawais-official"],
            "jobTitle": "Senior Mobile App Developer & Architect",
            "url": siteConfig.url,
            "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": `${siteConfig.url}/en/contact`
            },
            "image": `${siteConfig.url}/profile.jpg`,
            "gender": "Male",
            "description": "Senior Mobile App Developer with 6+ years of engineering experience specializing in Native Android, Kotlin Multiplatform (KMP), Compose Multiplatform (CMP), Flutter, and Clean Architecture.",
            "nationality": {
                "@type": "Country",
                "name": "Pakistan"
            },
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "Lahore",
                "addressRegion": "Punjab",
                "addressCountry": "Pakistan"
            },
            "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "University of South Asia",
                "address": "Lahore, Pakistan"
            },
            "knowsAbout": [
                "Mobile App Architecture",
                "Native Android Development",
                "Kotlin Multiplatform (KMP)",
                "Compose Multiplatform (CMP)",
                "Flutter & Dart",
                "Jetpack Compose",
                "Clean Architecture",
                "MVI & MVVM Patterns",
                "Agora SDK & Real-Time Telehealth",
                "IoT & Medical Hardware Driver Integration",
                "FinTech & Payment Gateways",
                "Kotlin",
                "Java",
                "CI/CD Automation & Bitbucket/GitHub Pipelines"
            ],
            "worksFor": [
                { "@type": "Organization", "name": "QuickGem Solutions" },
                { "@type": "Organization", "name": "Egora Pvt Ltd" },
                { "@type": "Organization", "name": "Healthwire Pvt Ltd" },
                { "@type": "Organization", "name": "DonGamers" },
                { "@type": "Organization", "name": "Netroots Technologies LLC" }
            ],
            "sameAs": [
                siteConfig.socialBaseUrls.github && `${siteConfig.socialBaseUrls.github}${siteConfig.usernames.github}`,
                siteConfig.socialBaseUrls.linkedin && `${siteConfig.socialBaseUrls.linkedin}${siteConfig.usernames.linkedin}`,
                siteConfig.socialBaseUrls.twitter && `${siteConfig.socialBaseUrls.twitter}${siteConfig.usernames.twitter}`
            ].filter((url): url is string => Boolean(url)),
        }
    ];
};