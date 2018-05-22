import jss from 'jss';
import preset from 'jss-preset-default';
import { Style } from 'jss/css';

jss.setup(preset());

// const paddingDiv = 12;

// const indigoBlue50 = '#E8EAF6';
const ourKaistBlue = '#E3F2FD';
/*
const ourKaistBlue = '#E3F2FD';
const ourKaistBlueD = '#1A237E';
const recommendColor = '#FFC107';
const lightGrey1 = '#f5f5f5'; */

export default jss
  .createStyleSheet({
    testDiv: {
      backgroundColor: "blue",
      display: 'flex',
      height: 400,
      width: 400,

      '&:hover': {
        backgroundColor: 'red',
      },

      '& div':{
        backgroundColor: "grey",
        height: 50,
        width: 50,

        margin: 10,

        '&:hover': {
          backgroundColor: 'red',
        },

        '&:lastChild':{
          backgroundColor: "black !important"
        },

        '&:last-child':{
          backgroundColor: "black !important"
        }
      },

      '&:last-child':{
        backgroudColor: "black !important"
      }
    } as Style,

    titleContainer: {
      margin: "auto",
      marginBottom: "3vh",
      marginTop: "4vh",
      width: "80vw",
    },

    division: {
      border: "1px solid grey",
      margin:"auto",
      marginBottom: "2vh",
      width: "80vw",
    },

    boardContainer: {
      // div.boardContainer-0-0-29 > div > div.smooth-dnd-container > div:last-child


      '& > div':{

        '& > div': {

          zIndex: 0,

          '& > div': {
            '& > section': {
              '& > header': {
                zIndex: "0",
              },
            },
          },

          '& > :last-child': {
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            position: "sticky",
            zIndex: 100,

            right: "0vw",
            top: "0vh",

            // '& > div': {
              '& > section': {
                backgroundColor:ourKaistBlue,
              },
            // },
          },
        },

      },
    } as Style,

  })
  .attach();
