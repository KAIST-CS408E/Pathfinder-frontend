import jss from 'jss';
import preset from 'jss-preset-default';
import { Style } from 'jss/css';

import { ourKaistBlue, ourKaistBlueD } from "@src/constants";

jss.setup(preset());

export default jss
  .createStyleSheet({
    timeTable: {
      height: '100%',
      width: '100%',

      '& th': {
        backgroundColor: ourKaistBlue,
        border: '1px solid rgba(0, 0, 0, 0)',
        fontSize: 0,
        padding: 0,
      },
    } as Style,

    classTimeCell: {
      backgroundColor: ourKaistBlueD + ' !important',
    } as Style,
  })
  .attach();
