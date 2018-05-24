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
const ourKaistBlue = '#E3F2FD';
const ourKaistBlueD = '#1A237E';
const recommendColor = '#FFC107'; */
const lightGrey1 = '#f8f8f8';
const defaultGrey = "#757575";

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
    },
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

      height: '77vh',
      marginRight: '10vw',
      paddingLeft: '10vw',
      textAlign: 'left',

      '& > div': { // lane
        backgroundColor: lightGrey1,

        flex: '0 0 auto',
        maxHeight: '77vh',
        minWidth: 300,

        margin: '10px',
        padding: 10,
      },
    } as Style,

    card: {
      backgroundColor: "white",
      marginBottom: 7,
      padding: 10,

      width: 300,

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
    },

    cardMiddle: {

    },

    cardProfs: {
      '& span': {
        backgroundColor: defaultGrey,
        fontSize: "70%",
        height: 20,

        '&:hover': {
          backgroundColor: 'ourKaistBlueH',
        },
      },
    } as Style,

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
