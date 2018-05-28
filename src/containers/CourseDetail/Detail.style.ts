import jss from 'jss';
import preset from 'jss-preset-default';
import { Style } from 'jss/css';

jss.setup(preset());

const lightGrey1 = '#f5f5f5';
const ourKaistBlueD = "#1A237E";
const ourKaistBlue = "#E8EAF6";



export default jss
  .createStyleSheet({
    profContainer: {
      backgroundColor: 'white',
      display: 'flex',

      flexWrap: 'nowrap',
      overflow: 'auto',

      borderRadius: '0px 0px 6px 6px',
    },

    semesterChipSelected: {
      backgroundColor: '#E3F2FD',
    },

    semesterDiv: {
      backgroundColor: 'white',
      borderLeft: '5px solid ' + lightGrey1,
      display: 'flex',
      flex: '0 0 auto',
      minHeight: '19vh',
      minWidth: '10vw',
      position: 'relative',
      // marginRight: 12,
      // paddingLeft: 12,
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

    percentBar: {
      margin:"auto",
      marginLeft: 0,

      position: "absolute",

      left:0,
      top: -4,

      backgroundColor: ourKaistBlue,
      height: 28,
      width: 30,
    },

    recCourseList: {
      padding: "0px 12px",

      '& h3': {
        color: ourKaistBlueD,
        zIndex: 4
      },
    } as Style,
  })
  .attach();
