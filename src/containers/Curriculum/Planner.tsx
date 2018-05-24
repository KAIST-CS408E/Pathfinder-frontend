import * as React from "react";
import { connect, Dispatch } from "react-redux";
import { bindActionCreators } from "redux";

import { Container, Draggable } from "react-smooth-dnd";

import { plannerBoardData } from "@src/constants";
import { RootState } from "@src/redux";
import { actions as plannerActions } from "@src/redux/planner";

import { ISemester } from "pathfinder";

import styles from "./Planner.style";

import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";

// icons
import Description from "@material-ui/icons/Description";

import { PlayCircleOutline, ThumbUp } from "@material-ui/icons";

const { classes } = styles;

interface IProps {
  boardData: ISemester[];

  onInitBoard: typeof plannerActions.initBoard;
  onAddCourse: typeof plannerActions.addCourse;
  onRemoveCourse: typeof plannerActions.removeCourse;
}

class Planner extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.onInitBoard(plannerBoardData);
  }

  public onCardDrop = (semesterId: string) => (dropResult: any) => {
    const { onAddCourse, onRemoveCourse } = this.props;
    const { removedIndex, addedIndex, payload } = dropResult;
    console.log(semesterId, dropResult);

    if (removedIndex !== null) {
      onRemoveCourse(semesterId, removedIndex);
    }
    if (addedIndex !== null) {
      onAddCourse(semesterId, addedIndex, payload);
    }
  };

  public getChildPayload = (semsterId: string) => (courseIndex: number) => {
    return this.props.boardData.filter(
      courseList => courseList.id === semsterId
    )[0].courses[courseIndex];
  };

  public render() {
    const { boardData } = this.props;

    if (boardData === undefined) {
      return <>Loading</>;
    }

    return (
      <div className="board">
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

        {/* the kanban board */}
      <div>
        <div className={classes.boardContainer}>
          {boardData.slice(0, -1).map(semester => (
            <Container
              key={semester.id}
              groupName="col"
              orientation="vertical"
              onDrop={this.onCardDrop(semester.id)}
              getChildPayload={this.getChildPayload(semester.id)}
            >
              <header className={classes.laneHeader}>
                <div className={classes.laneTitle}>{ semester.id }</div>
                <div className={classes.laneLabel}>{ semester.label ? semester.label : "Load: -.- Grade: -.-" }</div>
              </header>
              {semester.courses.map(course => {
                return (
                  <Draggable key={course.id} className={classes.card}>
                    <header className={classes.cardHeader}>
                      <div style={{ width: "100%" }}>{course.name}<span style={{fontSize: 12}}>{course.label ? course.label : ""}</span></div>
                      <div><Description/></div>
                    </header>
                    <div>{course.description ? course.description : "Load:-.- Grade:-.-"}</div>
                    <div><span style={{ color: "white" }}>{course.lectures[0].professor}</span></div>
                  </Draggable>
                );
              })}
            </Container>
          ))}
        </div>


        <div>
          {boardData.slice(-2, -1).map(courseList => (
            <Container
              key={courseList.id}
              className="courseContainer"
              style={{
                backgroundColor: 'steelblue',
                margin: 30,
                minHeight: 100,
                width: 300,
              }}
              groupName="col"
              orientation="vertical"
              onDrop={this.onCardDrop(courseList.id)}
              getChildPayload={this.getChildPayload(courseList.id)}
            >
              {courseList.courses.map(course => {
                return (
                  <Draggable key={course.id}>
                    <p>{course.name}</p>
                  </Draggable>
                );
              })}
            </Container>
          ))}
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state: RootState) => state.planner;
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onInitBoard: plannerActions.initBoard,

      onAddCourse: plannerActions.addCourse,
      onRemoveCourse: plannerActions.removeCourse,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Planner);
