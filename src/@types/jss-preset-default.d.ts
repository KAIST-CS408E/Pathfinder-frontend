declare module 'jss-preset-default' {
  import { JSSOptions } from 'jss';

  export interface IJSSPresetOptions {
    template: any;
    global: any;
    extend: any;
    nested: any;
    compose: any;
    camelCase: any;
    defaultUnit: any;
    expand: any;
    vendorPrefixer: any;
    propsSort: any;
  }

  function preset(opts?: Partial<IJSSPresetOptions>): JSSOptions;
  export default preset;
}
