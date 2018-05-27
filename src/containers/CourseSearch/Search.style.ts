import jss from 'jss';
import preset from 'jss-preset-default';
import { Style } from 'jss/css';

jss.setup(preset());

const maxContainerWidth = '80%';
const outerMargin = '10%';

const marginBox = 36; /*
const heightB1 = 30;
const heightL1 = 24; */
const roundingBig = 4;
const roundingSmall = 2;

// const paddingDiv = 12;

export default jss
  .createStyleSheet({
    search: {
      align: 'center',
      paddingTop: 12,
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
        marginLeft: 12,
        marginTop: 0,

        height: '75vh',
        width: 300,

        position: 'sticky',
        top: '3vh',

        alignSelf: 'flex-start',
      },
    } as Style,

    searchBtn: {
      // height: 100,
      width: 150,

      marginBottom: 4,
      marginLeft: 6,
    },

    searchFilter: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingTop: 8,

      alignItems: 'center',

      flexGrow: 1,

      '& > div': {
        marginBottom: 6,
      },

      '& .filterItem': {
        marginRight: 12,
      },

      '& .chip': {
        marginRight: 6,
      },

      '& .department': {
        display: "flex",
        marginRight: 6,
        paddingTop: 4,

        '& > div': {
          '&:first-child': {
            '& span': {
              paddingLeft: 0,
            },
          },
        },
      },
    } as Style,

    addDepartmentBtn: {
      backgroundColor: "rgba(0, 0, 0, 0.0)",
      border: "1px solid rgba(0, 0, 0, 0.43)",
      height: 30,
      marginRight: 6,

      // margin: 0,
    },

    searchCard: {
      marginLeft: outerMargin,
      marginRight: outerMargin,

      borderRadius: roundingBig,
      marginBottom: marginBox,
      marginTop: marginBox,
      width: maxContainerWidth,

      backgroundColor: "#f8f8f8",
    },

    searchBox: {
      
      display: 'flex',

      border: 0,
      margin: 0,
      padding: 0,
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

  },

  lbb: { // Load Bar Block
    height: 12,
    width: 12,

    padding: 1,
  },

    
  })
  .attach();
