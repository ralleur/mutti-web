/** Map browser locales to an actual server option (e.g. de-DE -> de). */
export function selectSetupLanguage(
    options: ReadonlyArray<{ Value?: string | null }>,
    browserLocale?: string,
    serverLocale?: string
): string {
    const normalize = (value: string) => value.replace(/_/g, '-').toLowerCase();
    const values = options.map(option => option.Value).filter((value): value is string => !!value);
    for (const locale of [ browserLocale, serverLocale, 'en-US' ]) {
        if (!locale) continue;
        const normalized = normalize(locale);
        const exact = values.find(value => normalize(value) === normalized);
        if (exact) return exact;
        const base = values.find(value => normalize(value) === normalized.split('-')[0]);
        if (base) return base;
    }
    return values[0] || '';
}
