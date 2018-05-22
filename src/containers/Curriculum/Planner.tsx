import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { semesterBoards } from '@src/constants';
import Board from 'react-trello';

import Typography from '@material-ui/core/Typography';


import styles from './Planner.style';

const { classes } = styles;
// const ourKaistBlue = '#E3F2FD';


export default class Planner extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <div className={classes.titleContainer}>
          <Typography align="left" variant="headline">
            My Academic Path Simulator
          </Typography>
          <Typography align="left" variant="subheading">
            Plan my academic path, simulate, and get recommends based on real data.
            <br/>* This system is helpful, but blind trust can be dangerous.
          </Typography>
        </div>
        <div className={classes.division}>{/* give division */}</div>
        <div className={classes.boardContainer}>
          <Board draggable data={semesterBoards}
                 style={{ flex: "0 0 auto", padding: "0vh 0vw 0vh 10vw", backgroundColor: "white", marginRight: "10vw" }}
          />
        </div>
      </div>
    );
  }
}
