declare module '@visualkit/theming/facades' {
  import { Coloring, MetaConfig, MetaElement, Theming, ThemingSlot } from "@visualkit/theming/index";
  import type { IColors, IThemingBlueprintRaw, IThemingOptions } from "@visualkit/theming/types";
  export function coloring(): Coloring;
  export function metae(): MetaElement;
  export function metaConfig(): MetaConfig;
  export function theming(options?: IThemingOptions): Theming;
  export function themingSlot(): ThemingSlot;
  export function makeTheming<Schema extends IThemingBlueprintRaw>(properties: Partial<Schema>, options?: IThemingOptions): Theming;
  export function assign<I>(instance: I, associate: any): I;
  export function variant<T extends string>(name: T, color: string, intensityRatio?: number, opacityRatio?: number): IColors<T>;

}
declare module '@visualkit/theming/index' {
  /**
   * @package @Visualkit/Theming
   * @license MIT
   * @author Y. Yannick GOBOU <protorian.dev@gmail.com>
   */
  export * from "@visualkit/theming/facades";
  export * from "@visualkit/theming/supports";
  export * from "@visualkit/theming/types";

}
declare module '@visualkit/theming/supports' {
  import { type ITheming, type IThemingSlot, type IThemingSlotOptions, IThemingSlotPayload, IThemingType, IThemingSeries, IThemingSlotOption, IThemingOptions, IColorRGB } from "@visualkit/theming/types";
  export class Coloring {
      static rgba(hex: string, alpha?: number): string;
      static hex({ red, green, blue }: IColorRGB): string;
      static rgb(hex: string): number[];
      static cmyk(hex: string): number[] | undefined;
      static lighten(hex: string, ratio?: number, hastag?: boolean): string;
      static darken(hex: string, ratio?: number, hastag?: boolean): string;
      static intensity(hex: string, ratio: number, hastag?: boolean): string;
  }
  export class MetaElement {
      static elements(property: string): Element[];
  }
  export class MetaConfig {
      static get selectorID(): string;
      static get entries(): Element[];
      static get exists(): boolean;
      static theme(key: string): string | null;
  }
  export class ThemingSlot implements IThemingSlot {
      #private;
      get options(): IThemingSlotOptions;
      get payload(): IThemingSlotPayload[];
      name(name: string): this;
      type(type: IThemingType): this;
      series(series: IThemingSeries): this;
      value(value: string): this;
      option<N extends keyof IThemingSlotOption>(name: N, value: IThemingSlotOption[N]): this;
      render(): this;
  }
  export class Theming implements ITheming {
      #private;
      style: HTMLStyleElement;
      kit: string;
      options: IThemingOptions;
      constructor(kit: string, options?: IThemingOptions);
      get slots(): IThemingSlot[];
      get graft(): HTMLElement | undefined;
      get identifier(): string | undefined;
      slot(sheet: IThemingSlot): this;
      selector(series: IThemingSeries): string;
      removeSlot(sheet: IThemingSlot): this;
      removeSlotByName(name: string): this;
      deploy(slot: IThemingSlot): string[];
      render(): string[];
  }

}
declare module '@visualkit/theming/types' {
  export enum ThemeSeries {
      Palette = "palette",
      Tone = "tone",
      Property = "property"
  }
  export enum ThemeTypes {
      Color = "color",
      Data = "data"
  }
  export type IThemingBlueprintFragment<T> = T | [T, ThemeTypes.Color | ThemeTypes.Data] | [T, ThemeTypes.Color | ThemeTypes.Data, ThemeSeries.Palette | ThemeSeries.Property | ThemeSeries.Tone];
  export type IThemingBlueprintRaw = {
      [K: string]: IThemingBlueprintFragment<string | number>;
  };
  export type IThemingBlueprint<T> = {
      [K in keyof T]: IThemingBlueprintFragment<T[keyof T]>;
  };
  export type IThemingOptions = {
      identifier?: string;
      graft?: HTMLElement;
  };
  export type IThemingSeries = ThemeSeries.Palette | ThemeSeries.Tone | ThemeSeries.Property;
  export type IThemingType = ThemeTypes.Color | ThemeTypes.Data;
  export type IColorRGB = {
      red: number;
      green: number;
      blue: number;
  };
  export type IColorAlphaKey<T extends string> = `${T}-alpha-${number}`;
  export type IColorAlphaKeyLite<T extends string> = `${T}-alpha-${number}-lite`;
  export type IColorAlphaKeyHeavy<T extends string> = `${T}-alpha-${number}-heavy`;
  export type IColorValue = string;
  export type IColorKey<T extends string> = T | `${T}-lite` | `${T}-heavy`;
  export type IColorKeys<T extends string> = IColorKey<T> & IColorAlphaKey<T> & IColorAlphaKeyLite<T> & IColorAlphaKeyHeavy<T>;
  export type IColors<T extends string> = Record<IColorKeys<T>, IColorValue>;
  export type IThemingSlotPayload = IColors<string> | string;
  export type IThemingSlotOptions = {
      name: string;
      type: IThemingType;
      series: IThemingSeries;
      value: IThemingSlotPayload;
      intensityRatio?: number;
      opacityRatio?: number;
  };
  export type IThemingSlotOption = Omit<IThemingSlotOptions, 'type' | 'series' | 'value' | 'name'>;
  export interface IThemingSlot {
      get options(): IThemingSlotOptions;
      get payload(): IThemingSlotPayload[];
      name(name: string): this;
      type(type: IThemingType): this;
      series(series: IThemingSeries): this;
      value(value: string): this;
      option<N extends keyof IThemingSlotOption>(name: N, value: IThemingSlotOption[N]): this;
      render(): this;
  }
  export interface ITheming {
      get graft(): HTMLElement | undefined;
      get identifier(): string | undefined;
      get slots(): IThemingSlot[];
      slot(slot: IThemingSlot): this;
      removeSlot(slot: IThemingSlot): this;
      removeSlotByName(name: string): this;
      render(): string[];
  }

}
declare module '@visualkit/theming' {
  import main = require('@visualkit/theming/index');
  export = main;
}