import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container, Draggable } from 'react-smooth-dnd';

import * as classNames from 'classnames';

import { RootState } from '@src/redux';
import { actions as plannerActions } from '@src/redux/planner';

import { ISemester } from 'pathfinder';

import styles from './Planner.style';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

// icons
// import Description from '@material-ui/icons/Description';

import { MoreHoriz, PlayCircleOutline, ThumbUp } from '@material-ui/icons';
import { getBoard } from '@src/api';

const { classes } = styles;

interface IProps {
  boardData: ISemester[];

  onInitBoard: typeof plannerActions.initBoard;
  onAddCourse: typeof plannerActions.addCourse;
  onRemoveCourse: typeof plannerActions.removeCourse;
}

const profColorD = '#9E9E9E';
// const profColorS = '#536DFE';

const warnColor = 'rgb(232, 113, 151)';
const passColor = 'rgb(153, 190, 221)';
const recommendColor = '#FFC107';
const ourKaistBlue = '#E3F2FD';

class Planner extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    getBoard().then(json => {
      const { boardData, currentSemester } = json;
      this.props.onInitBoard(
        Object.entries<any>(boardData).map(([semesterNumber, data]) => {
          return {
            courses: data.courses,
            feedback: data.feedback,
            id: String(semesterNumber),
            semester: Number(semesterNumber),
          };
        }),
        currentSemester
      );
    });
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

  public preventDragging = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
  };

  public preventOverlappedFromDrop = (semester?: ISemester) => (
    sourceContainerOptions: any,
    payload: any
  ) => {
    const pinnedListElem = document.querySelector(`.${classes.pinBoard}`);

    // pin list는 semester가 undefined이므로 source 찾아서 판단
    const selector = semester
      ? `.semesterBoard-_${semester.id}`
      : '.' + sourceContainerOptions.groupName;
    const elem = document.querySelector(selector);
    if (pinnedListElem && elem) {
      const pinRect = pinnedListElem.getBoundingClientRect();
      const rect = elem.getBoundingClientRect();

      if (rect.left + rect.width < pinRect.left) {
        return true;
      }
    }

    return false;
  };

  public renderPinnedCourse() {
    const { boardData } = this.props;

    if (boardData === undefined || boardData.length === 0) {
      return <>Loading</>;
    }
    const pinnedCourseLane = boardData[boardData.length - 1];

    return (
      <div className={classes.pinBoard}>
        <header
          className={classes.laneHeader}
          style={{ backgroundColor: ourKaistBlue }}
        >
          <div className={classes.laneTitle}>{pinnedCourseLane.id}</div>
          <div className={classes.laneLabel}>
            {pinnedCourseLane.label
              ? pinnedCourseLane.label
              : 'Load: -.- Grade: -.-'}
          </div>
        </header>
        <Container
          key={pinnedCourseLane.id}
          groupName="col"
          orientation="vertical"
          onDrop={this.onCardDrop(pinnedCourseLane.id)}
          getChildPayload={this.getChildPayload(pinnedCourseLane.id)}
          shouldAcceptDrop={this.preventOverlappedFromDrop()}
        >
          {pinnedCourseLane.courses.map(course => {
            return (
              <Draggable
                onClick={this.preventDragging}
                key={course.id}
                className={classes.card}
              >
                <header className={classes.cardHeader}>
                  <div style={{ width: '100%' }}>
                    {course.name}
                    <span style={{ fontSize: 12 }}>
                      {course.label ? course.label : ''}
                    </span>
                  </div>
                  <div style={{ height: 20 }}>
                    <MoreHoriz />
                  </div>
                </header>
                <div className={classes.cardMiddle}>
                  {course.description
                    ? course.description
                    : 'Load:-.- Grade:-.-'}
                </div>
                <div className={classes.cardProfs}>
                  <div style={{ backgroundColor: profColorD, color: 'white' }}>
                    {course.lectures[0].professor}
                  </div>
                </div>
              </Draggable>
            );
          })}
        </Container>
      </div>
    );
  }

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
            Plan my academic path, simulate, and get recommends based on real
            data.
            <br />* This system is helpful, but blind trust can be dangerous.
          </Typography>
        </div>

        <div className={classes.division}>{/* give division */}</div>
        <div style={{ textAlign: 'right', margin: '0vh 10vw 3vh 0vw' }}>
          <Chip
            style={{
              marginRight: '1vw',

              backgroundColor: '#FF9800',
              color: 'white',
            }}
            label="Course Recommendation"
            avatar={
              <Avatar style={{ backgroundColor: '#FF9800', color: 'white' }}>
                <ThumbUp />
              </Avatar>
            }
          />
          <Chip
            style={{
              marginRight: '1vw',

              backgroundColor: '#4CAF50',
              color: 'white',
            }}
            label="Course Simulation"
            avatar={
              <Avatar style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                <PlayCircleOutline />
              </Avatar>
            }
          />
        </div>

        {/* the kanban board */}
        <div>
          <div className={classes.boardContainer}>
            {boardData.slice(0, -1).map(semester => (
              <div
                className={classNames(
                  classes.semesterBoard,
                  `semesterBoard-_${semester.id}`
                )}
              >
                <header className={classes.laneHeader}>
                  <div className={classes.laneTitle}>{semester.id}</div>
                  <div className={classes.laneLabel}>
                    {semester.label ? semester.label : 'Load: -.- Grade: -.-'}
                  </div>
                </header>
                <Container
                  key={semester.id}
                  groupName={`semesterBoard-_${semester.id}`}
                  orientation="vertical"
                  onDrop={this.onCardDrop(semester.id)}
                  getChildPayload={this.getChildPayload(semester.id)}
                  shouldAcceptDrop={this.preventOverlappedFromDrop(semester)}
                >
                  {semester.courses.map(course => {
                    return (
                      <Draggable
                        onClick={this.preventDragging}
                        key={course.id}
                        className={
                          course.type === 'recommended'
                            ? classes.recCard
                            : classes.card
                        }
                      >
                        {course.type === 'recommended' ? (
                          <div className={classes.recCardTop}>
                            <Chip
                              label={course.subtitle}
                              style={{
                                backgroundColor: recommendColor,
                                color: 'white',
                                fontSize: 12,
                                height: 18,
                              }}
                            />
                          </div>
                        ) : (
                          ''
                        )}
                        <header className={classes.cardHeader}>
                          <div style={{ width: '100%' }}>
                            {course.name}
                            <span style={{ fontSize: 12 }}>
                              {course.label ? course.label : ''}
                            </span>
                          </div>
                          <div style={{ height: 20 }}>
                            <MoreHoriz />
                          </div>
                        </header>
                        <div className={classes.cardMiddle}>
                          {course.description
                            ? course.description
                            : 'Load:-.- Grade:-.-'}
                        </div>
                        <div className={classes.cardProfs}>
                          <div
                            style={{
                              backgroundColor: profColorD,
                              color: 'white',
                            }}
                          >
                            {course.lectures[0].professor}
                          </div>
                        </div>
                      </Draggable>
                    );
                  })}
                </Container>
                <div className={classes.feedback}>
                  {semester.feedback.map(feedback => {
                    return (
                      <div
                        key={feedback.type}
                        style={{
                          backgroundColor: feedback.ok ? passColor : warnColor,
                        }}
                      >
                        <div className={classes.feedbackTitle}>
                          {feedback.type}
                          {feedback.ok ? ' balanced' : ' error'}
                        </div>
                        <div className={classes.feedbackDetail}>
                          {feedback.reason}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            {/* 여기가 핀해놓은 강의 리스트 있는 곳임 !!*/}
            {this.renderPinnedCourse()}
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
