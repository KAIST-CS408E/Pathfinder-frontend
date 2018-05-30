import jss from 'jss';
import preset from 'jss-preset-default';
import { Style } from 'jss/css';

jss.setup(preset());

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
      borderLeft: '5px solid ' + ourKaistBlue,
      display: 'flex',
      flex: '0 0 auto',
      minHeight: '19vh',
      minWidth: '10vw',
      position: 'relative',

      marginRight: 24,
      // paddingLeft: 12,
    },

    semesterTypo: {
      left: 4,
      top: 0,

      position: 'absolute',
    },

    tableContainer: {
      margin: '0.8rem 0rem',
      marginTop: "0.6rem",
    },

    subtitleContainer: {},

    paperCutting: {
      // backgroundColor: "purple",
      borderRadius: 6,
      height: "84vh",
      overflow: "auto",
    } as Style,

    courseDetailCard: {
      display: 'inline',
      width: '100%',
    } as Style,

    detailCardTitle: {
      backgroundColor: "#7986CB",
      borderRadius: '6px 6px 0px 0px',
      display: 'flex',
      /*
      '& .MuiCardContent': {
        padingBottom: 0,
      }, */

      '& span': {
        color: "white",
      }
    } as Style,

    stickLeft: {
      left: 0,
      top: 0,
    } as Style,

    stickRight: {
      color: "white",
      right: 0,
      top: 0,
    } as Style,

    typoMiddleAlign: {
      color: "white",
      margin: 'auto',
    } as Style,

    prereqContainer: {
      backgroundColor: ourKaistBlue,
      color: ourKaistBlueD,
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      marginBottom: 12,
      padding: "12px 24px",
      paddingBottom: 24,
      textAlign: "left",
    },


    besideSankyGraph: {
      backgroundColor: 'white',
      maxHeight: '30vh',
      padding: 12,
      paddingTop: 0,
      width: '30%',

      overflow: 'hidden',

      '&:first-child': {
        marginLeft: 12,
      },
    } as Style,

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

    labelIcon: {
      fontSize: "0.9em",
      marginRight: 4,
      paddingTop: 6,
    },

    profSelectContainer: {
      display: "flex",

      overflow: "auto",
      padding: 24,
      paddingBottom: 12,
      paddingLeft: 12,
    },

    profSelDes: {
      position: "relative",

      height: 0,
      width: 0,

      paddingLeft: 12,
    },

    profNonSelect: {
      backgroundColor: "white",
      display: 'flex',
      flex: "0 0 auto",

      overflow: "visible",
      padding: "12px 24px",

      borderLeft: "2px solid " + ourKaistBlue
    },

    profSelect: {
      backgroundColor: "white",
      borderRight: "2px solid " + ourKaistBlue,
      display: 'flex',
      flex: "0 0 auto",

      overflow: "auto",
      padding: "24px 12px 12px 0px",
    },

    descriptionTable: {
      '& tbody': {
        borderLeft: "1px solid " + ourKaistBlue,
      },

      '& td': {
        verticalAlign: 'top',
      },
    } as Style,

    courseStepContainer: {
      paddingBottom: 12,
      textAlign: "left",
    },

    courseStep: {
      backgroundColor: "#7986CB",
      boxShadow:"0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
      color: "white",
      fontSize: 15,
    },

    courseStepAva: {
      backgroundColor: "#7986CB",
      color: "white",
    },

    sectionTitle: {
      display: "flex",
      fontSize: "0.9em",
      fontWeight: 500,
      height:38,
      width: '60%',
    },

    historyStep: {
      backgroundColor: "#7986CB",
      boxShadow:"0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
      color: "white",
      fontSize: 15,
      position: "absolute" as "absolute",

      left: 4,
      top: -14,
    },

    noReccomend: {
      border: "1px solid " + ourKaistBlue,
      borderTop: 0,
      color: ourKaistBlueD,
      padding: '12px',
      paddingTop: 4,
    },

  })
  .attach();
