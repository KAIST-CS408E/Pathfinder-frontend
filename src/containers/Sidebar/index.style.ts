import jss from 'jss';
import preset from 'jss-preset-default';
import { Style } from "jss/css";

jss.setup(preset());

export default jss.createStyleSheet({

  sideBarStepBoard: {
    '& > div': {
      '& > div': {
        '&:nth-child(even)': {
          '& span': {
            marginBottom: -4,
            marginTop: 4,
            minHeight: "20px !important",
          },
        },
      },
    },
  } as Style,


  stepLabel: {
    '& > span': {
      '& > span': {
        position: "relative",
      },

      '& circle': {
        color: "#3f51b5",
      },

      '&:last-child': {
        '& > span': {
          color: "rgb(0, 0, 0, 0.87)",
          fontWeight: 500,
        },
      },
    },
  } as Style,

  stepContent: {
    position: "absolute",

    left: 70,
    top: -11,

    textAlign: "left"
  },
})