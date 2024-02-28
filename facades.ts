import {
  Coloring,
  MetaConfig,
  MetaElement,
  Theming,
  ThemingSlot
} from "./index";
import type {
  IColorKeys,
  IColors,
  IThemingBlueprintRaw,
  IThemingOptions,
  IThemingSeries,
  IThemingType
} from "./types";



export function coloring() {

  return new Coloring

}


export function metae() {

  return new MetaElement

}


export function metaConfig() {

  return new MetaConfig

}


export function theming(options?: IThemingOptions) {

  return new Theming('theme', options);

}


export function themingSlot() {

  return new ThemingSlot();

}


export function makeTheming<Schema extends IThemingBlueprintRaw>(

  properties: Partial<Schema>,

  options?: IThemingOptions

) {

  options = options || {} as IThemingOptions;

  const theme = theming(options);

  Object.entries(properties).forEach(({ 0: key, 1: prop }) => {

    const slot = themingSlot().name(key)

    if (typeof prop[0] == 'string') { slot.value(prop[0]) }

    if (typeof prop[1] == 'string') { slot.type(prop[1] as IThemingType) }

    if (typeof prop[2] == 'string') { slot.series(prop[2] as IThemingSeries) }

    theme.slot(slot)

  })

  return theme;

}


export function assign<I>(instance: I, associate: any) {

  if (Array.isArray(instance)) {

    if (typeof associate == 'object') {

      Object.entries(associate as object).forEach(({ 0: key, 1: value }) =>

        instance[key as keyof I] = value

      )

    }

    else {

      instance.push(associate);

    }

  }

  else if (typeof instance == 'object' && typeof associate == 'object') {

    Object.entries(associate as object).forEach(({ 0: key, 1: value }) => {

      if (instance) instance[key as keyof I] = value

    })

  }

  return instance;

}


export function variant<T extends string>(name: T, color: string, intensityRatio?: number, opacityRatio?: number) {

  intensityRatio = intensityRatio || 10;

  opacityRatio = opacityRatio || 10;


  const payload: IColors<T> = {} as IColors<T>;

  const lighten = Coloring.lighten(color, intensityRatio)

  const darken = Coloring.darken(color, intensityRatio)


  payload[name as IColorKeys<T>] = `${(color)}`;

  payload[`${name}-lite` as IColorKeys<T>] = `${lighten}`;

  payload[`${name}-heavy` as IColorKeys<T>] = `${darken}`;


  /**
   * Opacité classique
   */
  for (let x = 0; x <= 9; x++) {

    payload[`${name}-alpha-${x}` as IColorKeys<T>] = `${Coloring.rgba(color, x / opacityRatio)}`;

    payload[`${name}-alpha-${x}-lite` as IColorKeys<T>] = `${Coloring.rgba(lighten, x / opacityRatio)}`;

    payload[`${name}-alpha-${x}-heavy` as IColorKeys<T>] = `${Coloring.rgba(darken, x / opacityRatio)}`;

  }


  /**
   * Opacité des variations
   */
  for (let x = 0; x <= 9; x++) {

    const glighten = Coloring.lighten(lighten);

    const gdarken = Coloring.darken(lighten);


    payload[`${name}-lite-alpha-${x}` as IColorKeys<T>] = `${Coloring.rgba(glighten, x / opacityRatio)}`;

    payload[`${name}-lite-alpha-${x}-lite` as IColorKeys<T>] = `${Coloring.rgba(Coloring.lighten(glighten), x / opacityRatio)}`;

    payload[`${name}-lite-alpha-${x}-heavy` as IColorKeys<T>] = `${Coloring.rgba(Coloring.darken(glighten), x / opacityRatio)}`;


    payload[`${name}-heavy-alpha-${x}` as IColorKeys<T>] = `${Coloring.rgba(gdarken, x / opacityRatio)}`;

    payload[`${name}-heavy-alpha-${x}-lite` as IColorKeys<T>] = `${Coloring.rgba(Coloring.lighten(gdarken), x / opacityRatio)}`;

    payload[`${name}-heavy-alpha-${x}-heavy` as IColorKeys<T>] = `${Coloring.rgba(Coloring.darken(gdarken), x / opacityRatio)}`;

  }

  return payload;


}