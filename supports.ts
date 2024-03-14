import { assign, variant } from "./facades";
import {
  ThemeTypes,
  type ITheming,
  type IThemingSlot,
  type IThemingSlotOptions,
  ThemeSeries,
  IThemingSlotPayload,
  IThemingType,
  IThemingSeries,
  IThemingSlotOption,
  IThemingOptions,
  IColorRGB,
  IThemingRuntime
} from "./types";




export class Themings {

  static entries: IThemingRuntime[] = [];

  static palette(name: string) {

    return ([...this.entries.filter(entry => entry.palettes.identifier == name)][0] || undefined)?.palettes || undefined

  }

  static tone(name: string) {

    return ([...this.entries.filter(entry => entry.tones.identifier == name)][0] || undefined)?.tones || undefined

  }

  static category(name: string) {

    return ([...this.entries.filter(entry => entry.properties.identifier == name)][0] || undefined)?.properties || undefined

  }

}




export class Coloring {



  static fixHexColor(hex: string){

    if(hex.length == 3 || hex.length == 4){

      return `${ hex }${ hex.replace('#', '') }`

    }

    return hex;

  }


  static rgba(hex: string, alpha: number = 1) {

    let h = this.fixHexColor(hex).replace('#', '');

    // if (h.length === 3) {
    //
    //   h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    //
    // }

    let r = parseInt(h.substring(0, 2), 16) || 0,

      g = parseInt(h.substring(2, 4), 16) || 0,

      b = parseInt(h.substring(4, 6), 16) || 0;


    if (alpha > 1 && alpha <= 100) {

      const fixed = (alpha / 100).toFixed(2);

      alpha = parseInt(fixed, 2);

    }

    return `rgba(${r},${g},${b},${alpha})`

  }


  static hex({ red, green, blue }: IColorRGB) {

    return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`;

  }

  static rgb(hex: string) {

    let r: string | number = 0, g: string | number = 0, b: string | number = 0;

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

  static cmyk(hex: string) {

    let C = 0, M = 0, Y = 0, K = 0;

    hex = (hex.charAt(0) == "#") ? hex.substring(1, 7) : hex;

    if (hex.length != 6) { return; }

    if (/[0-9a-f]{6}/i.test(hex) != true) { return; }

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



  static lighten(hex: string, ratio: number = 7, hastag: boolean = true) {

    return this.intensity(hex, ratio < 0 ? 0 : ratio, hastag)

  }

  static darken(hex: string, ratio: number = 7, hastag: boolean = true) {

    return this.intensity(hex, -1 * (ratio > 0 ? ratio : 0), hastag)

  }

  static intensity(hex: string, ratio: number, hastag: boolean = true) {

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

    } else {

      return hex;

    }

  }

}


export class MetaElement {

  static elements(property: string) {

    return Array.from(

      document.querySelectorAll(`${MetaConfig.selectorID}[property="${property}"]`)

    )

  }

}



export class MetaConfig {

  static get selectorID() {

    return `meta[name="kit:theming"]`

  }

  static get entries() {

    return Array.from(document.querySelectorAll(`${this.selectorID}`))

  }


  static get exists() {

    return this.entries.length > 0

  }


  static theme(key: string) {

    const get = MetaElement.elements(key)

      .map(e => e.getAttribute('content') || '')

      .filter(value => value);

    return get[get.length - 1] || get[0] || null;

  }

}



export class ThemingSlot implements IThemingSlot {

  #options: IThemingSlotOptions = {

    type: ThemeTypes.Data,

    series: ThemeSeries.Property,

  } as IThemingSlotOptions;

  #payload: IThemingSlotPayload[] = [];

  get options() { return this.#options }

  get payload() { return this.#payload }

  name(name: string): this {

    this.#options.name = name;

    return this;

  }

  type(type: IThemingType): this {

    this.#options.type = type;

    return this;

  }

  series(series: IThemingSeries): this {

    this.#options.series = series;

    return this;

  }

  value(value: string): this {

    this.#options.value = value;

    return this;

  }

  option<N extends keyof IThemingSlotOption>(name: N, value: IThemingSlotOption[N]) {

    this.#options[name] = value;

    return this;

  }

  render(): this {

    if (this.#options.type == ThemeTypes.Color) {

      this.#options.series = (

        this.#options.series != ThemeSeries.Palette &&

        this.#options.series != ThemeSeries.Tone

      ) ? ThemeSeries.Palette : this.#options.series;

      if (typeof this.#options.value == 'string') {

        this.#payload = assign(

          this.#payload,

          variant(

            this.#options.name,

            this.#options.value,

            this.#options.intensityRatio,

            this.#options.opacityRatio,

          )

        )

      }

      else {

        this.#payload = assign(this.#payload, this.#options.value)

      }

    }

    else if (this.#options.type == ThemeTypes.Data) {

      this.#payload[this.options.name as keyof IThemingSlotPayload] = this.#options.value;

    }

    return this;

  }

}



export class Theming implements ITheming {

  #slots: IThemingSlot[] = [];

  style: HTMLStyleElement;

  kit: string;

  options: IThemingOptions = {} as IThemingOptions;


  constructor(kit: string, options?: IThemingOptions) {

    this.options = options || {} as IThemingOptions;

    this.kit = kit;

    this.options.identifier = this.options.identifier;

    this.options.graft = this.options.graft || document.head;

    this.style = document.createElement('style');

    this.style.setAttribute('visualkit:theme', '')

    this.options.graft.appendChild(this.style);

  }

  get slots() { return this.#slots; }

  get graft() { return this.options.graft; }

  get identifier() { return this.options.identifier; }

  slot(sheet: IThemingSlot): this {

    this.#slots.push(sheet)

    return this;

  }

  selector(series: IThemingSeries) {

    return `*[${this.kit}\\:${series}${this.options.identifier ? `~="${this.options.identifier}"` : ''}], *[${this.kit}\\:name${this.options.identifier ? `~="${this.options.identifier}"` : ''}]`

  }

  removeSlot(sheet: IThemingSlot): this {

    this.#slots = this.#slots.filter(entry => entry.options.name != sheet.options.name);

    return this;

  }

  removeSlotByName(name: string): this {

    this.#slots = this.#slots.filter(entry => entry.options.name != name);

    return this;

  }

  deploy(slot: IThemingSlot) {

    return Object.entries(slot.payload).map(({ 0: key, 1: value }) => {

      const line = `--${this.kit}-${key}: ${value}`;

      this.style.sheet?.insertRule(`${this.selector(slot.options.series)} { ${line}; }`);

      return line;

    })

  }

  render(): string[] {

    return (

      this.#slots

        .map(slot => slot.render())

        .map(slot => this.deploy(slot))

    ).map(slot => slot.join(';'))

  }

}



