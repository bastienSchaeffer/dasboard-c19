import * as createPalette from '@material-ui/core/styles/createPalette';
declare module '@material-ui/core/styles/createPalette' {
  interface PaletteOptions {
    graphs?: PaletteColorOptions;
  }
  interface Palette {
    graphs: PaletteColor;
  }
}
