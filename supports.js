var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ThemingSlot_options, _ThemingSlot_payload, _Theming_slots;
import { assign, variant } from "./facades";
import { ThemeTypes, ThemeSeries } from "./types";
export class Coloring {
    static rgba(hex, alpha = 1) {
        let h = hex.replace('#', '');
        if (h.length === 3) {
            h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
        }
        let r = parseInt(h.substring(0, 2), 16), g = parseInt(h.substring(2, 4), 16), b = parseInt(h.substring(4, 6), 16);
        if (alpha > 1 && alpha <= 100) {
            alpha = alpha / 100;
        }
        return `rgba(${r},${g},${b},${alpha})`;
    }
    static hex({ red, green, blue }) {
        return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;
    }
    static rgb(hex) {
        let r = 0, g = 0, b = 0;
        if (hex.length == 4) {
            r = `0x${hex[1] + hex[1]}`;
            g = `0x${hex[2] + hex[2]}`;
            b = `0x${hex[3] + hex[3]}`;
        }
        else if (hex.length == 7) {
            r = `0x${hex[1] + hex[2]}`;
            g = `0x${hex[3] + hex[4]}`;
            b = `0x${hex[5] + hex[6]}`;
        }
        return [+r, +g, +b];
    }
    static cmyk(hex) {
        let C = 0, M = 0, Y = 0, K = 0;
        hex = (hex.charAt(0) == "#") ? hex.substring(1, 7) : hex;
        if (hex.length != 6) {
            return;
        }
        if (/[0-9a-f]{6}/i.test(hex) != true) {
            return;
        }
        let r = parseInt(hex.substring(0, 2), 16);
        let g = parseInt(hex.substring(2, 4), 16);
        let b = parseInt(hex.substring(4, 6), 16);
        if (r == 0 && g == 0 && b == 0) {
            K = 1;
            return [0, 0, 0, 1];
        }
        C = 1 - (r / 255);
        M = 1 - (g / 255);
        Y = 1 - (b / 255);
        const minCMY = Math.min(C, Math.min(M, Y));
        C = (C - minCMY) / (1 - minCMY);
        M = (M - minCMY) / (1 - minCMY);
        Y = (Y - minCMY) / (1 - minCMY);
        K = minCMY;
        return [C, M, Y, K];
    }
    static lighten(hex, ratio = 7, hastag = true) {
        return this.intensity(hex, ratio < 0 ? 0 : ratio, hastag);
    }
    static darken(hex, ratio = 7, hastag = true) {
        return this.intensity(hex, -1 * (ratio > 0 ? ratio : 0), hastag);
    }
    static intensity(hex, ratio, hastag = true) {
        hex = hex.replace(`#`, ``);
        if (hex.length === 6) {
            const decimalColor = parseInt(hex, 16);
            let r = (decimalColor >> 16) + ratio;
            r > 255 && (r = 255);
            r < 0 && (r = 0);
            let g = (decimalColor & 0x0000ff) + ratio;
            g > 255 && (g = 255);
            g < 0 && (g = 0);
            let b = ((decimalColor >> 8) & 0x00ff) + ratio;
            b > 255 && (b = 255);
            b < 0 && (b = 0);
            return `${hastag ? '#' : ''}${(g | (b << 8) | (r << 16)).toString(16)}`;
        }
        else {
            return hex;
        }
    }
}
export class MetaElement {
    static elements(property) {
        return Array.from(document.querySelectorAll(`${MetaConfig.selectorID}[property="${property}"]`));
    }
}
export class MetaConfig {
    static get selectorID() {
        return `meta[name="kit:theming"]`;
    }
    static get entries() {
        return Array.from(document.querySelectorAll(`${this.selectorID}`));
    }
    static get exists() {
        return this.entries.length > 0;
    }
    static theme(key) {
        const get = MetaElement.elements(key)
            .map(e => e.getAttribute('content') || '')
            .filter(value => value);
        return get[get.length - 1] || get[0] || null;
    }
}
export class ThemingSlot {
    constructor() {
        _ThemingSlot_options.set(this, {
            type: ThemeTypes.Data,
            series: ThemeSeries.Property,
        });
        _ThemingSlot_payload.set(this, []);
    }
    get options() { return __classPrivateFieldGet(this, _ThemingSlot_options, "f"); }
    get payload() { return __classPrivateFieldGet(this, _ThemingSlot_payload, "f"); }
    name(name) {
        __classPrivateFieldGet(this, _ThemingSlot_options, "f").name = name;
        return this;
    }
    type(type) {
        __classPrivateFieldGet(this, _ThemingSlot_options, "f").type = type;
        return this;
    }
    series(series) {
        __classPrivateFieldGet(this, _ThemingSlot_options, "f").series = series;
        return this;
    }
    value(value) {
        __classPrivateFieldGet(this, _ThemingSlot_options, "f").value = value;
        return this;
    }
    option(name, value) {
        __classPrivateFieldGet(this, _ThemingSlot_options, "f")[name] = value;
        return this;
    }
    render() {
        if (__classPrivateFieldGet(this, _ThemingSlot_options, "f").type == ThemeTypes.Color) {
            __classPrivateFieldGet(this, _ThemingSlot_options, "f").series = (__classPrivateFieldGet(this, _ThemingSlot_options, "f").series != ThemeSeries.Palette &&
                __classPrivateFieldGet(this, _ThemingSlot_options, "f").series != ThemeSeries.Tone) ? ThemeSeries.Palette : __classPrivateFieldGet(this, _ThemingSlot_options, "f").series;
            if (typeof __classPrivateFieldGet(this, _ThemingSlot_options, "f").value == 'string') {
                __classPrivateFieldSet(this, _ThemingSlot_payload, assign(__classPrivateFieldGet(this, _ThemingSlot_payload, "f"), variant(__classPrivateFieldGet(this, _ThemingSlot_options, "f").name, __classPrivateFieldGet(this, _ThemingSlot_options, "f").value, __classPrivateFieldGet(this, _ThemingSlot_options, "f").intensityRatio, __classPrivateFieldGet(this, _ThemingSlot_options, "f").opacityRatio)), "f");
            }
            else {
                __classPrivateFieldSet(this, _ThemingSlot_payload, assign(__classPrivateFieldGet(this, _ThemingSlot_payload, "f"), __classPrivateFieldGet(this, _ThemingSlot_options, "f").value), "f");
            }
        }
        else if (__classPrivateFieldGet(this, _ThemingSlot_options, "f").type == ThemeTypes.Data) {
            __classPrivateFieldGet(this, _ThemingSlot_payload, "f")[this.options.name] = __classPrivateFieldGet(this, _ThemingSlot_options, "f").value;
        }
        return this;
    }
}
_ThemingSlot_options = new WeakMap(), _ThemingSlot_payload = new WeakMap();
export class Theming {
    constructor(kit, options) {
        _Theming_slots.set(this, []);
        this.options = {};
        this.options = options || {};
        this.kit = kit;
        this.options.identifier = this.options.identifier;
        this.options.graft = this.options.graft || document.head;
        this.style = document.createElement('style');
        this.style.setAttribute('visualkit:theme', '');
        this.options.graft.appendChild(this.style);
    }
    get slots() { return __classPrivateFieldGet(this, _Theming_slots, "f"); }
    get graft() { return this.options.graft; }
    get identifier() { return this.options.identifier; }
    slot(sheet) {
        __classPrivateFieldGet(this, _Theming_slots, "f").push(sheet);
        return this;
    }
    selector(series) {
        return `*[${this.kit}\\:${series}${this.options.identifier ? `~="${this.options.identifier}"` : ''}]`;
    }
    removeSlot(sheet) {
        __classPrivateFieldSet(this, _Theming_slots, __classPrivateFieldGet(this, _Theming_slots, "f").filter(entry => entry.options.name != sheet.options.name), "f");
        return this;
    }
    removeSlotByName(name) {
        __classPrivateFieldSet(this, _Theming_slots, __classPrivateFieldGet(this, _Theming_slots, "f").filter(entry => entry.options.name != name), "f");
        return this;
    }
    deploy(slot) {
        return Object.entries(slot.payload).map(({ 0: key, 1: value }) => {
            const line = `--${this.kit}-${key}: ${value}`;
            this.style.sheet?.insertRule(`${this.selector(slot.options.series)} { ${line}; }`);
            return line;
        });
    }
    render() {
        return (__classPrivateFieldGet(this, _Theming_slots, "f")
            .map(slot => slot.render())
            .map(slot => this.deploy(slot))).map(slot => slot.join(';'));
    }
}
_Theming_slots = new WeakMap();
