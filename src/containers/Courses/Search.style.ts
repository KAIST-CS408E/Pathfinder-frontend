import jss from 'jss';
import preset from 'jss-preset-default';
import { Style } from 'jss/css';

jss.setup(preset());
export default jss
  .createStyleSheet({
    resultContainer: {
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
        marginTop: 24,

        height: '75vh',
        width: 300,

        position: 'sticky',
        top: '9vh',

        alignSelf: 'flex-start',
      },
    } as Style,

    search: {
      padding: 12,
    } as Style,

    searchBox: {
      display: 'flex',
    },

    searchBtn: {
      // height: 100,
      width: 150,

      marginLeft: 6,
    },

    optionContainer: {
      padding: 6,

      display: 'flex',
      flexGrow: 1,

      alignContent: 'stretch',
      flexDirection: 'column',

      '& .search': {
        marginBottom: 12,
      },
    } as Style,

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
  })
  .attach();
