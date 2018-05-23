import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { semesterBoards } from '@src/constants';
import Board, { } from "react-trello";


import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Typography from '@material-ui/core/Typography';

import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import ThumbUp from "@material-ui/icons/ThumbUp";

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
        <div style={{ textAlign: "right", margin: "0vh 10vw 3vh 0vw" }}>
          <Chip
            style={{ marginRight: "1vw", backgroundColor: "#FF9800", color: "white"}}
            label="Course Recommendation"
            avatar={
              <Avatar
                style={{ backgroundColor: "#FF9800", color: "white"}}
              >
                <ThumbUp />
              </Avatar>
            }/>
          <Chip
            style={{ marginRight: "1vw", backgroundColor: "#4CAF50", color: "white"}}
          label="Course Simulation"
          avatar={
            <Avatar
              style={{ backgroundColor: "#4CAF50", color: "white"}}
            >
              <PlayCircleOutline />
            </Avatar>
          }/>
        </div>
        <div className={classes.boardContainer}>
          <Board draggable data={semesterBoards}
                 style={{ flex: "0 0 auto", padding: "0vh 0vw 0vh 10vw", backgroundColor: "white", marginRight: "10vw" }}
          />
        </div>
      </div>
    );
  }
}
