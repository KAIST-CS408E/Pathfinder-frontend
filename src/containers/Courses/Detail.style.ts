import jss from 'jss';
import preset from 'jss-preset-default';
import { Style } from 'jss/css';

jss.setup(preset());

const lightGrey1 = '#f5f5f5';

export default jss
  .createStyleSheet({
    profContainer: {
      backgroundColor: 'white',
      display: 'flex',

      flexWrap: 'nowrap',

      minHeight: '20vh',
      overflow: 'auto',

      borderRadius: '0px 0px 6px 6px',
    },

    testDiv: {
      backgroundColor: 'white',
      display: 'flex',
      flex: '0 0 auto',
      minHeight: '19vh',
      minWidth: '10vw',

      borderLeft: '5px solid ' + lightGrey1,
      margin: '2px 6px',
      padding: '16px 12px 4px 0px',

      position: 'relative',
    },

    semesterTypo: {
      left: 4,
      top: 0,

      position: 'absolute',
    },

    tableContainer: {
      margin: '1rem 0rem',
    },

    subtitleContainer: {},

    paperCutting: {
      // backgroundColor: "purple",
      borderRadius: 6,
    } as Style,

    courseDetailCard: {
      display: 'inline',
      width: '100%',
    } as Style,

    detailCardTitle: {
      backgroundColor: lightGrey1,
      borderRadius: '6px 6px 0px 0px',
      display: 'flex',
      /*
      '& .MuiCardContent': {
        padingBottom: 0,
      }, */
    } as Style,

    stickLeft: {
      left: 0,
      top: 0,
    } as Style,

    stickRight: {
      right: 0,
      top: 0,
    } as Style,

    typoMiddleAlign: {
      margin: 'auto',
    } as Style,

    sankyGraphDiv: {
      border: 'red',
      width: '40%',
    },

    besideSankyGraph: {
      backgroundColor: '#FAFAFA',
      maxHeight: '30vh',
      padding: 12,
      width: '30%',

      overflow: 'auto',
    },

    recommandSentence: {
      border: '1px solid grey',
      borderRadius: 4,
      paddingLeft: '2px',
      textAlign: 'left',
      width: '16em',
    },
  })
  .attach();
