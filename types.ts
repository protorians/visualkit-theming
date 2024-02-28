

export enum ThemeSeries {

  Palette = 'palette',

  Tone = 'tone',

  Property = 'property'

}

export enum ThemeTypes {

  Color = 'color',

  Data = 'data',

}


export type IThemingBlueprintFragment<T> = T

  | [T, ThemeTypes.Color | ThemeTypes.Data]

  | [T, ThemeTypes.Color | ThemeTypes.Data, ThemeSeries.Palette | ThemeSeries.Property | ThemeSeries.Tone];

export type IThemingBlueprintRaw = {

  [K: string]: IThemingBlueprintFragment<string | number>;

}

export type IThemingBlueprint<T> = {

  [K in keyof T]: IThemingBlueprintFragment<T[keyof T]>;

}

export type IThemingOptions = {

  identifier?: string,

  graft?: HTMLElement

}


export type IThemingSeries = ThemeSeries.Palette | ThemeSeries.Tone | ThemeSeries.Property;

export type IThemingType = ThemeTypes.Color | ThemeTypes.Data;

export type IColorRGB = {

  red: number,

  green: number,

  blue: number,

};


export type IColorAlphaKey<T extends string> = `${T}-alpha-${number}`;

export type IColorAlphaKeyLite<T extends string> = `${T}-alpha-${number}-lite`;

export type IColorAlphaKeyHeavy<T extends string> = `${T}-alpha-${number}-heavy`;

export type IColorValue = string

export type IColorKey<T extends string> = T | `${T}-lite` | `${T}-heavy`;

export type IColorKeys<T extends string> = IColorKey<T>

  & IColorAlphaKey<T>

  & IColorAlphaKeyLite<T>

  & IColorAlphaKeyHeavy<T>;

export type IColors<T extends string> = Record<IColorKeys<T>, IColorValue>



export type IThemingSlotPayload = IColors<string> | string

export type IThemingSlotOptions = {

  name: string;

  type: IThemingType;

  series: IThemingSeries;

  value: IThemingSlotPayload;

  intensityRatio?: number;

  opacityRatio?: number;

}

export type IThemingSlotOption = Omit<IThemingSlotOptions, 'type' | 'series' | 'value' | 'name'>

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




export type IThemingRuntime = {

  palettes: ITheming;

  tones: ITheming;

  properties: ITheming;

  slots: (IThemingSlot | undefined)[];

}




export type IRuntimeConfig = {

  palette?: string; 
  
  tone?: string; 
  
  category?: string;
  
}