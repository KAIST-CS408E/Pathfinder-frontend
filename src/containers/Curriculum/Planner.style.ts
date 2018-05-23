import jss from 'jss';
import preset from 'jss-preset-default';
import { Style } from 'jss/css';

jss.setup(preset());

// const paddingDiv = 12;

// const indigoBlue50 = '#E8EAF6';
const ourKaistBlue = '#E3F2FD';
const ourKaistBlueH = '#039BE5';

const warnColor = "rgb(232, 113, 151)";
const passColor =  "rgb(153, 190, 221)";
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
        height: "77vh",
        textAlign: "left",

        '& > div': {

          zIndex: 0,

          '& > div': {
            '& > section': {
              '& > header': {
                textAlign: "left",
                zIndex: "0",

                '& span': {
                  '&:first-child':{
                    textAlign:"left",
                    width: "40%"
                  },
                  '&:last-child': {
                    width: "60%",
                  },
                },
              },

              // each card custom
              '& article': {
                maxWidth: 320,
                minWidth: 300,

                '& > span': {
                  '& > header': {
                    borderBottom: 0,
                    marginBottom: 0,
                    paddingBottom: 8,

                    '& > span': {
                      '&:first-child': {
                        textAlign: "left",
                      },
                      '&:last-child': {},
                    },
                  },

                  '& > :nth-child(2)': {
                    paddingBottom: 8,
                  },

                  '& > :last-child': {
                    '& span': {
                      '&:hover': {
                        backgroundColor: ourKaistBlueH + " !important",
                      },
                    },
                  },
                },
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

          // make feedback for each semester
          '& > :nth-child(3)': {
            '& > section': {
              '& > div': {
                overflow: "visible",

                '& > div': {
                  '& > :last-child': {
                    borderRadius: 0,
                    boxShadow: "0px 0px 0px 10px " + warnColor,
                    float: "left",
                    position: "absolute",

                    top: "290px",

                    height: "auto",

                    '& article': {
                      backgroundColor: warnColor,
                      border: "0px solid " + warnColor,
                      color: "white",
                      margin: "0px !important",

                      '& header':{
                        '& > span': {
                          '&:last-child': {
                          }
                        },
                      },

                      '& div': {
                        color: "white",
                      },
                    }
                  },
                },
              },
            },
          },

          // make feedback for each semester
          '& > :nth-child(4)': {
            '& > section': {
              '& > div': {
                overflow: "visible",

                '& > div': {
                  '& > :last-child': {
                    borderRadius: 0,
                    boxShadow: "0px 0px 0px 10px " + passColor,
                    float: "left",
                    position: "absolute",

                    top: "160px",

                    height: "auto",

                    '& article': {
                      backgroundColor: passColor,
                      border: "0px solid " + passColor,
                      color: "white",
                      margin: "0px !important",

                      '& div': {
                        color: "white",
                      },
                    }
                  },
                },
              },
            },
          },
        },

      },
    } as Style,

  })
  .attach();
