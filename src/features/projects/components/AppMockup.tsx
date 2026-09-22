import React from "react";
import { useTranslations } from "next-intl";

// ============================================================================
// TYPES
// ============================================================================
export type MockupVariant = "screen-home" | "screen-finance" | "screen-learning" | "screen-default";

export interface AppMockupProps {
    variant?: MockupVariant;
    themeColor?: string;
}

// ============================================================================
// HELPERS
// ============================================================================
function mix(hex: string, alpha: number): string {
    return `${hex}${Math.round(alpha * 255).toString(16).padStart(2, "0")}`;
}

// ============================================================================
// VARIANT SCREENS
// ============================================================================
function HomeScreen({ color }: { color: string }) {
    const t = useTranslations("projects.mockup");
    return (
        <>
            <p className="mt-1 font-mono text-[7px] font-bold tracking-[0.15em] uppercase" style={{ color: `${color}cc` }}>
                {t("date")}
            </p>
            <h3 className="mt-1 text-[11px] font-bold leading-snug text-white">
                {t("greeting")}<br />
                <em className="not-italic" style={{ color }}>{t("userName")}</em>
            </h3>
            <div className="mt-2 rounded-lg p-2" style={{ background: mix(color, 0.2), border: `1px solid ${mix(color, 0.4)}` }}>
                <p className="font-mono text-[6px] font-bold uppercase tracking-widest" style={{ color: `${color}cc` }}>
                    {t("todaysFocus")}
                </p>
                <p className="mt-0.5 text-[9px] font-bold leading-tight text-white" style={{ whiteSpace: "pre-line" }}>
                    {t("focusText")}
                </p>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full" style={{ background: mix(color, 0.15) }}>
                    <div className="h-full rounded-full" style={{ width: "60%", background: color }} />
                </div>
                <p className="mt-0.5 text-[6px]" style={{ color: `${color}99` }}>{t("progressCount")}</p>
            </div>
            {[
                { icon: "○", label: t("task1"), done: true },
                { icon: "✦", label: t("task2"), done: false },
            ].map((task) => (
                <div key={task.label} className="mt-1.5 flex items-center gap-1.5 rounded-md px-1.5 py-1" style={{ background: mix(color, 0.08) }}>
                    <span className="text-[8px]" style={{ color }}>{task.icon}</span>
                    <span className="flex-1 text-[8px] text-white/80">{task.label}</span>
                    {task.done && (
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                            <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    )}
                </div>
            ))}
        </>
    );
}

function FinanceScreen({ color }: { color: string }) {
    const t = useTranslations("projects.mockup");
    const bars = [45, 65, 40, 80, 55];
    return (
        <>
            <p className="mt-1 font-mono text-[7px] font-bold tracking-[0.15em] uppercase" style={{ color: `${color}cc` }}>
                {t("overview")}
            </p>
            <h3 className="mt-1 text-[11px] font-bold leading-snug text-white">
                {t("inControl")}<br />
                <em className="not-italic" style={{ color }}>{t("together")}</em>
            </h3>
            <div className="mt-2 rounded-lg p-2" style={{ background: mix(color, 0.18), border: `1px solid ${mix(color, 0.35)}` }}>
                <p className="font-mono text-[6px] font-bold uppercase tracking-widest" style={{ color: `${color}cc` }}>
                    {t("availableToSpend")}
                </p>
                <p className="mt-0.5 text-[14px] font-bold text-white">$2,840.20</p>
                <p className="text-[7px] font-semibold" style={{ color }}>{t("growthText")}</p>
            </div>
            {[{ l: t("spending"), v: "$1,204" }, { l: t("saved"), v: "$640" }].map((s) => (
                <div key={s.l} className="mt-1.5 flex items-center justify-between rounded-md px-1.5 py-1" style={{ background: mix(color, 0.07) }}>
                    <span className="text-[8px] text-white/60">{s.l}</span>
                    <span className="text-[8px] font-bold text-white">{s.v}</span>
                </div>
            ))}
            <div className="mt-2 flex items-end gap-1" style={{ height: 20 }}>
                {bars.map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 3 ? color : mix(color, 0.35) }} />
                ))}
            </div>
        </>
    );
}

function LearningScreen({ color }: { color: string }) {
    const t = useTranslations("projects.mockup");
    return (
        <>
            <p className="mt-1 font-mono text-[7px] font-bold tracking-[0.15em] uppercase" style={{ color: `${color}cc` }}>
                {t("library")}
            </p>
            <h3 className="mt-1 text-[11px] font-bold leading-snug text-white">
                {t("learningHeading1")}<br />
                <em className="not-italic" style={{ color }}>{t("learningHeading2")}</em>
            </h3>
            {[
                { tag: t("tag1"), title: t("cardTitle1"), time: t("cardTime1"), active: true },
                { tag: t("tag2"), title: t("cardTitle2"), time: t("cardTime2"), active: false },
            ].map((card) => (
                <div
                    key={card.tag}
                    className="mt-1.5 rounded-lg p-2"
                    style={{
                        background: card.active ? mix(color, 0.2) : mix(color, 0.07),
                        border: `1px solid ${card.active ? mix(color, 0.4) : mix(color, 0.12)}`,
                    }}
                >
                    <p className="font-mono text-[6px] font-bold uppercase tracking-widest" style={{ color: `${color}99` }}>
                        {card.tag}
                    </p>
                    <p className="mt-0.5 text-[8px] font-bold leading-tight text-white" style={{ whiteSpace: "pre-line" }}>
                        {card.title}
                    </p>
                    <p className="mt-0.5 text-[6px]" style={{ color: `${color}99` }}>{card.time}</p>
                </div>
            ))}
        </>
    );
}

function DefaultScreen({ color }: { color: string }) {
    const t = useTranslations("projects.mockup");
    return (
        <>
            <p className="mt-1 font-mono text-[7px] font-bold tracking-[0.15em] uppercase" style={{ color: `${color}cc` }}>
                {t("liveProject")}
            </p>
            <h3 className="mt-1 text-[11px] font-bold leading-snug text-white">
                {t("defaultHeading1")}<br />
                <em className="not-italic" style={{ color }}>{t("defaultHeading2")}</em>
            </h3>
            <div className="mt-2 grid grid-cols-2 gap-1">
                {[
                    { label: t("statLabel1"), value: "10k+" },
                    { label: t("statLabel2"), value: "4.8★" },
                    { label: t("statLabel3"), value: "99%+" },
                    { label: t("statLabel4"), value: "<300ms" },
                ].map((s) => (
                    <div key={s.label} className="rounded-md p-1.5" style={{ background: mix(color, 0.12), border: `1px solid ${mix(color, 0.2)}` }}>
                        <p className="text-[7px] font-bold text-white">{s.value}</p>
                        <p className="text-[6px]" style={{ color: `${color}99` }}>{s.label}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

// ============================================================================
// COMPONENT
// ============================================================================
export default function AppMockup({ variant = "screen-default", themeColor = "#f9b17a" }: AppMockupProps) {
    const color = themeColor;

    return (
        <div
            className="relative mx-auto flex flex-col overflow-hidden"
            style={{
                width: 140,
                height: 256,
                borderRadius: 20,
                border: `1.5px solid ${mix(color, 0.35)}`,
                background: `color-mix(in srgb, ${color} 6%, #0f1117)`,
                boxShadow: `0 0 0 1px ${mix(color, 0.1)}, 0 24px 60px -10px ${mix(color, 0.4)}, inset 0 1px 1px rgba(255,255,255,0.06)`,
            }}
        >
            {/* Status bar */}
            <div className="flex h-7 shrink-0 items-center justify-between px-3" style={{ borderBottom: `1px solid ${mix(color, 0.12)}` }}>
                <span className="font-mono text-[8px] font-bold text-white/60">9:41</span>
                <div className="h-2 w-10 rounded-full bg-black/70" />
                <span className="font-mono text-[8px] text-white/60">●◒▰</span>
            </div>

            {/* Screen content */}
            <div className="flex flex-1 flex-col overflow-hidden px-3 pb-3 pt-1">
                {variant === "screen-home" && <HomeScreen color={color} />}
                {variant === "screen-finance" && <FinanceScreen color={color} />}
                {variant === "screen-learning" && <LearningScreen color={color} />}
                {variant === "screen-default" && <DefaultScreen color={color} />}
            </div>

            {/* Bottom nav */}
            <div className="flex h-7 shrink-0 items-center justify-around px-4" style={{ borderTop: `1px solid ${mix(color, 0.1)}` }}>
                {["⌂", "◌", "○", "◒"].map((icon, i) => (
                    <span key={i} className="text-[12px]" style={{ color: i === 0 ? color : "rgba(255,255,255,0.3)" }}>
                        {icon}
                    </span>
                ))}
            </div>
        </div>
    );
}
