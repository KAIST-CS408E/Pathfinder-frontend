declare module 'jss-preset-default' {
  import { JSSOptions } from 'jss';

  export type JSSPresetOptions = {
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
  };

  function preset(opts?: Partial<JSSPresetOptions>): JSSOptions;
  export default preset;
}
