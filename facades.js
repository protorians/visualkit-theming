import { Coloring, MetaConfig, MetaElement, ThemeSeries, ThemeTypes, Theming, ThemingSlot, Themings } from "./index";
export function coloring() {
    return new Coloring;
}
export function metae() {
    return new MetaElement;
}
export function metaConfig() {
    return new MetaConfig;
}
export function theming(options) {
    return new Theming('theme', options);
}
export function themingSlot() {
    return new ThemingSlot();
}
export function makeTheming(properties, options) {
    options = options || {};
    const theme = theming(options);
    Object.entries(properties).forEach(({ 0: key, 1: prop }) => {
        const slot = themingSlot().name(key);
        if (typeof prop[0] == 'string') {
            slot.value(prop[0]);
        }
        if (typeof prop[1] == 'string') {
            slot.type(prop[1]);
        }
        if (typeof prop[2] == 'string') {
            slot.series(prop[2]);
        }
        theme.slot(slot);
    });
    return theme;
}
export function assign(instance, associate) {
    if (Array.isArray(instance)) {
        if (typeof associate == 'object') {
            Object.entries(associate).forEach(({ 0: key, 1: value }) => instance[key] = value);
        }
        else {
            instance.push(associate);
        }
    }
    else if (typeof instance == 'object' && typeof associate == 'object') {
        Object.entries(associate).forEach(({ 0: key, 1: value }) => {
            if (instance)
                instance[key] = value;
        });
    }
    return instance;
}
export function variant(name, color, intensityRatio, opacityRatio) {
    intensityRatio = intensityRatio || 10;
    opacityRatio = opacityRatio || 10;
    const payload = {};
    const lighten = Coloring.lighten(color, intensityRatio);
    const darken = Coloring.darken(color, intensityRatio);
    payload[name] = `${(color)}`;
    payload[`${name}-lite`] = `${lighten}`;
    payload[`${name}-heavy`] = `${darken}`;
    /**
     * Opacité classique
     */
    for (let x = 0; x <= 9; x++) {
        payload[`${name}-alpha-${x}`] = `${Coloring.rgba(color, x / opacityRatio)}`;
        payload[`${name}-alpha-${x}-lite`] = `${Coloring.rgba(lighten, x / opacityRatio)}`;
        payload[`${name}-alpha-${x}-heavy`] = `${Coloring.rgba(darken, x / opacityRatio)}`;
    }
    /**
     * Opacité des variations
     */
    for (let x = 0; x <= 9; x++) {
        const glighten = Coloring.lighten(lighten);
        const gdarken = Coloring.darken(lighten);
        payload[`${name}-lite-alpha-${x}`] = `${Coloring.rgba(glighten, x / opacityRatio)}`;
        payload[`${name}-lite-alpha-${x}-lite`] = `${Coloring.rgba(Coloring.lighten(glighten), x / opacityRatio)}`;
        payload[`${name}-lite-alpha-${x}-heavy`] = `${Coloring.rgba(Coloring.darken(glighten), x / opacityRatio)}`;
        payload[`${name}-heavy-alpha-${x}`] = `${Coloring.rgba(gdarken, x / opacityRatio)}`;
        payload[`${name}-heavy-alpha-${x}-lite`] = `${Coloring.rgba(Coloring.lighten(gdarken), x / opacityRatio)}`;
        payload[`${name}-heavy-alpha-${x}-heavy`] = `${Coloring.rgba(Coloring.darken(gdarken), x / opacityRatio)}`;
    }
    return payload;
}
export function runtime(config) {
    config = config || {};
    const palettes = theming({ identifier: config.palette || undefined });
    const tones = theming({ identifier: config.tone || undefined });
    const properties = theming({ identifier: config.category || undefined });
    const slots = Array.from(document.querySelectorAll(MetaConfig.selectorID)).map(meta => {
        const name = meta.getAttribute('property') || undefined;
        const value = meta.getAttribute('content') || undefined;
        const intensityRatio = parseInt(`${meta.getAttribute('theme:intensity-ratio')}`) || undefined;
        const opacityRatio = parseInt(`${meta.getAttribute('theme:opacity-ratio')}`) || undefined;
        const type = (meta.getAttribute('theme:type') || ThemeTypes.Data);
        const series = (meta.getAttribute('theme:series') || ThemeSeries.Property);
        if (name && value) {
            const paletteName = (meta.getAttribute('theme:palette') || undefined);
            const toneName = (meta.getAttribute('theme:tone') || undefined);
            const categoryName = (meta.getAttribute('theme:category') || undefined);
            const slot = themingSlot()
                .name(name)
                .type(type)
                .series(series)
                .value(value)
                .option('intensityRatio', intensityRatio)
                .option('opacityRatio', opacityRatio);
            if (series == ThemeSeries.Palette) {
                (paletteName ? Themings.palette(paletteName) || palettes : palettes).slot(slot);
            }
            if (series == ThemeSeries.Tone) {
                (toneName ? Themings.tone(toneName) || tones : tones).slot(slot);
            }
            if (series == ThemeSeries.Property) {
                (categoryName ? Themings.category(categoryName) || properties : properties).slot(slot);
            }
            return slot;
        }
        return undefined;
    });
    palettes.render();
    tones.render();
    properties.render();
    return { palettes, tones, properties, slots, };
}
