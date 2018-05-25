import jss from 'jss';
import preset from 'jss-preset-default';
import { Style } from 'jss/css';

jss.setup(preset());

// const paddingDiv = 12;

// const indigoBlue50 = '#E8EAF6';
// const ourKaistBlue = '#E3F2FD';
const ourKaistBlueH = '#039BE5';
//
// const warnColor = 'rgb(232, 113, 151)';
// const passColor = 'rgb(153, 190, 221)';
/*
const ourKaistBlueD = '#1A237E'; */
const recommendColor = '#FFC107';
const lightGrey1 = '#f8f8f8';
const defaultGrey = "#757575";
const ourKaistBlue = '#E3F2FD';


export default jss
  .createStyleSheet({
    titleContainer: {
      margin: 'auto',
      marginBottom: '3vh',
      marginTop: '4vh',
      width: '80vw',
    },

    division: {
      border: '1px solid grey',
      margin: 'auto',
      marginBottom: '2vh',
      width: '80vw',
    },

    laneHeader: {
      display: 'flex',
      padding: 10,
      paddingTop: 0,
    } as Style,

    laneLabel: {
      fontSize: 12,
      textAlign: 'right',

      padding: '0px 2px',
      width: '60%',
    },
    laneTitle: {
      fontSize: 15,
      textAlign: 'left',

      padding: '0px 2px',
      width: '40%',
    },

    boardContainer: {
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',

      height: '71vh',

      marginRight: '10vw',
      paddingLeft: '10vw',
      textAlign: 'left',

    } as Style,

    semesterBoard: { // lane
      flex: '0 0 auto',
      margin: 10,

      '& > div:first-child': {
        backgroundColor: lightGrey1,
        minWidth: 300,

        borderRadius: 4,
        padding: "10px 10px",
        paddingBottom: 30,
      },
    } as Style,

    pinBoard: { // lane
      flex: '0 0 auto',
      margin: 10,
      marginRight: 0,

      position: 'fixed',
      right: "10vw",

      '& > div:first-child': {
        backgroundColor: ourKaistBlue,
        width: 320,

        borderRadius: 4,
        padding: "10px 10px",
        paddingBottom: 30,
      },
    } as Style,

    feedback: {
      borderRadius: 4,
      color: "white",
      fontSize: 15,
      fontWeight: 500,

      marginTop: 10,

      position: "relative",
      right: 0,

      maxWidth: 320,

      '& > div': {
        padding: "10px 10px",

        '&:first-child': {
          borderRadius: "4px 4px 0px 0px",
          paddingTop: 10,
        },
        '&:last-child': {
          borderRadius: "0px 0px 4px 4px",
          paddingBottom: 10,
        },
      },
    } as Style,

    feedbackDetail: {
      fontSize: 12,
      fontWeight: 500,

      padding: "6px 10px",
      paddingBottom: 10,
    },
    feedbackTitle: {
      fontSize: 15,
      fontWeight: 500,

      padding: "0px 10px",
    },

    // default card css
    card: {
      backgroundColor: "white",
      borderRadius: 4,
      margin: "auto",
      marginBottom: 8,
      padding: "10px 6px",

      width: "100%",

      '& > span': {
        '& > header': {
          borderBottom: 0,
          marginBottom: 0,
          paddingBottom: 8,

          '& > span': {
            '&:first-child': {
              textAlign: 'left',
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
              backgroundColor: ourKaistBlueH + ' !important',
            },
          },
        },
      },
    } as Style,

    cardHeader: {
      display: "flex",

      '& svg': {
        height: 20,
      },
    } as Style,

    cardMiddle: {
      fontSize: 12,
      marginBottom: 10,
    },

    cardProfs: {
      display: "flex",
      textAlign: "right",

      '& > div': {
        backgroundColor: defaultGrey,
        borderRadius: 6,

        fontSize: 12,
        height: 18,

        margin: 2,
        padding: "2px 10px",

        '&:hover': {
          backgroundColor: ourKaistBlueH,
        },
      },
    } as Style,


    // default card css
    recCard: {
      backgroundColor: "rgb(255, 152, 0, 0.05)",
      border: "1px solid rgb(255, 152, 0)",
      borderRadius: 4,
      shadows: "0 0 3 rgb(255, 152, 0)",

      color: "#424242",

      margin: "auto",
      marginBottom: 8,
      padding: "10px 6px",

      width: "100%",

      '& > span': {
        '& > header': {
          borderBottom: 0,
          marginBottom: 0,
          paddingBottom: 8,

          '& > span': {
            '&:first-child': {
              textAlign: 'left',
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
              backgroundColor: ourKaistBlueH + ' !important',
            },
          },
        },
      },
    } as Style,

    recCardHeader: {
      display: "flex",

      '& svg': {
        height: 20,
      },
    } as Style,

    recCardTop: {
      borderBottom: "1px solid " + recommendColor,
       marginBottom: 6,
      paddingBottom: 4,
    },
      /*
        '& > div': {
          zIndex: 0,

          '& > div': {
            '& > section': {
              '& > header': {
                textAlign: 'left',
                zIndex: '0',

                '& span': {
                  '&:first-child': {
                    textAlign: 'left',
                    width: '40%',
                  },
                  '&:last-child': {
                    width: '60%',
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
                        textAlign: 'left',
                      },
                      '&:last-child': {},
                    },
                  },

                  '& > :nth-child(2)': {
                    paddingBottom: 8,
                  },


                },
              },
            },
          },

          '& > :last-child': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            position: 'sticky',
            zIndex: 100,

            right: '0vw',
            top: '0vh',

            // '& > div': {
            '& > section': {
              backgroundColor: ourKaistBlue,
            },
            // },
          },

          // make feedback for each semester
          '& > :nth-child(3)': {
            '& > section': {
              '& > div': {
                overflow: 'visible',

                '& > div': {
                  '& > :last-child': {
                    borderRadius: 0,
                    boxShadow: '0px 0px 0px 10px ' + warnColor,
                    float: 'left',
                    position: 'absolute',

                    top: '290px',

                    height: 'auto',

                    '& article': {
                      backgroundColor: warnColor,
                      border: '0px solid ' + warnColor,
                      color: 'white',
                      margin: '0px !important',

                      '& header': {
                        '& > span': {
                          '&:last-child': {},
                        },
                      },

                      '& div': {
                        color: 'white',
                      },
                    },
                  },
                },
              },
            },
          },

          // make feedback for each semester
          '& > :nth-child(4)': {
            '& > section': {
              '& > div': {
                overflow: 'visible',

                '& > div': {
                  '& > :last-child': {
                    borderRadius: 0,
                    boxShadow: '0px 0px 0px 10px ' + passColor,
                    float: 'left',
                    position: 'absolute',

                    top: '160px',

                    height: 'auto',

                    '& article': {
                      backgroundColor: passColor,
                      border: '0px solid ' + passColor,
                      color: 'white',
                      margin: '0px !important',

                      '& div': {
                        color: 'white',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },*/
  })
  .attach();
