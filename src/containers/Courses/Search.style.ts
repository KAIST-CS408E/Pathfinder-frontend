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
      borderWidth: "1px",

  }


    
  })
  .attach();
