import jss from 'jss';
import preset from 'jss-preset-default';
import { Style } from 'jss/css';

jss.setup(preset());

// const maxContainerWidth = '80%';

/*
const marginBox = 25;
const heightB1 = 30;
const heightL1 = 24;
const roundingBig = 4;
const roundingSmall = 2;
*/

// const paddingDiv = 12;


export default jss
  .createStyleSheet({

    tableContainer: {
    },

    subtitleContainer: {
    },

    paperCutting: {
      // backgroundColor: "purple",
      borderRadius: 6,
    } as Style,

    courseDetailCard: {
      display: "inline",
      width: "100%",
    } as Style,

    detailCardTitle: {
      backgroundColor: "#f5f5f5",
      borderRadius: "6px 6px 0px 0px",
      display: "flex",
      /*
      '& .MuiCardContent': {
        padingBottom: 0,
      }, */

    } as Style,

    detailCardGraphDiv: {
      backgroundColor: "#f5f5f5",
      display: "flex",
      /*
      '& .MuiCardContent': {
        padingBottom: 0,
      }, */

      '& .div': {
        backgroundColor: "red",
      },

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
      margin: "auto",
    } as Style,

    sankyGraphDiv: {
      border: "red",
      width: "40%",
    },

    besideSankyGraph: {
      width: "30%"
    },

    recommandSentence: {
      border: "1px solid grey",
      borderRadius: 4,
      paddingLeft: "2px",
      textAlign: "left",
      width: "16em",
    }
    // contentWih
    /*
    search: {
      align: 'center',
      padding: 12,
      textAlign: 'center',
    } as Style,

    resultContainer: {
      position: 'absolute',

      marginLeft: outerMargin,
      marginRight: outerMargin,
      width: maxContainerWidth,

      display: 'flex',
      justifyContent: 'stretch',

      '& .list': {
        flexGrow: 1,

        '& .item': {
          border: {
            color: 'black',
            style: 'solid',
            width: 1,
          },

          '& > header': {
            display: 'flex',
            height: 36,
            paddingLeft: 6,
            paddingRight: 6,
            position: 'relative',

            '& .pin': {
              position: 'absolute',
              right: 0,
              top: 0,
            },
          },

          '& .detail': {
            display: 'flex',
            justifyContent: 'space-between',

            '& .date': {
              display: 'flex',
              flexDirection: 'column',
            },

            '& .feature': {
              display: 'flex',
              flexDirection: 'column',
            },
          },
        },
      },
      '& .map': {
        width: 300,
      },
    } as Style,

    searchBtn: {
      // height: 100,
      width: 150,

      marginLeft: 6,
    },

    searchFilter: {
      display: 'flex',
      flexWrap: 'wrap',

      alignItems: 'center',

      flexGrow: 1,

      '& .filterItem': {
        marginRight: 12,
      },

      '& .department .chip': {
        marginRight: 6,
      },
    } as Style,

    addDepartmentBtn: {
      height: 24,
      width: 24,

      // margin: 0,
    },

    searchCard: {
      marginLeft: "auto",
      marginRight: "auto",

      borderRadius: roundingBig,
      marginBottom: marginBox,
      marginTop: marginBox,
      width: maxContainerWidth,

      backgroundColor: "#f8f8f8",
    },

    searchBox: {
      display: 'flex',
    },

    optionContainer: {
      padding: 6,

      fontSize: "2em",

      display: 'flex',
      flexGrow: 1,

      alignContent: 'stretch',
      flexDirection: 'column',

      '& .search': {
        marginBottom: 12,
      },
    } as Style,

    searchInput: {
      backgroundColor: "white",
      border: "grey",
      borderRadius: roundingSmall,
      borderWidth: "1px",

  }


    */
  })
  .attach();
