export type TranslateFn = (key: string, options?: Record<string, unknown>) => any;

export function withTranslatedFields<
    Raw extends { slug: string },
    Fields extends Record<string, unknown>
>(
    raw: Raw,
    namespace: string,
    translate: TranslateFn,
    buildFields: (scopedTranslate: TranslateFn, raw: Raw) => Fields
): Raw & Fields {
    const scopedTranslate: TranslateFn = (key: string, options?: Record<string, unknown>) => {
        const cleanKey = key.startsWith(".") ? key.slice(1) : key;
        const fullKey = namespace ? `${namespace}.${raw.slug}.${cleanKey}` : `${raw.slug}.${cleanKey}`;
        try {
            return translate(fullKey, options);
        } catch {
            return "";
        }
    };

    return {
        ...raw,
        ...buildFields(scopedTranslate, raw),
    };
}

export function withTranslatedList<
    Raw extends { slug: string },
    Fields extends Record<string, unknown>
>(
    rawList: Raw[],
    namespace: string,
    translate: TranslateFn,
    buildFields: (scopedTranslate: TranslateFn, raw: Raw) => Fields
): (Raw & Fields)[] {
    return rawList.map((raw) =>
        withTranslatedFields(raw, namespace, translate, buildFields)
    );
}