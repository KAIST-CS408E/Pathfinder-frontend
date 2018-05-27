import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container, Draggable } from 'react-smooth-dnd';

import * as classNames from 'classnames';

import { deleteCourse, getBoard, moveCourse } from '@src/api';
import { RootState } from '@src/redux';
import { actions as plannerActions } from '@src/redux/planner';
import { range } from '@src/utils';

import { ICourseCard, ISemester } from 'pathfinder';

import styles from './Planner.style';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

// icons
import { MoreHoriz, PlayCircleOutline, ThumbUp } from '@material-ui/icons';

const { classes } = styles;

interface IProps {
  boardData: ISemester[];
  currentSemester: number;

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
  public dropQueue: Array<{
    from: string;
    to: string;
    payload: ICourseCard;
  }> = [];

  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    getBoard().then(json => {
      const { boardData, currentSemester } = json;
      this.props.onInitBoard(
        range(13).map((n: number) => {
          const semesterId = String(n);
          const basicData = { id: semesterId, semester: n };
          const remoteData = boardData[semesterId];
          if (remoteData) {
            return {
              ...basicData,
              courses: remoteData.courses,
              feedback: remoteData.feedback,
            };
          }
          return { ...basicData, courses: [], feedback: [] };
        }),
        currentSemester
      );
    });
  }

  public onCardDrop = (semesterId: string) => (dropResult: any) => {
    const { onAddCourse, onRemoveCourse } = this.props;
    const { removedIndex, addedIndex, payload } = dropResult;
    console.log(semesterId, dropResult, this.dropQueue[0]);

    if (removedIndex !== null) {
      const dropEventIndex = this.dropQueue.findIndex(
        obj => obj.payload === payload
      );
      const from = semesterId;
      if (dropEventIndex !== -1) {
        const { to } = this.dropQueue[dropEventIndex];
        if (to === 'none') {
          console.error('hum..');
        }
        this.dropQueue.splice(dropEventIndex, 1);
        (to === '0'
          ? deleteCourse(payload.courseNumber, payload.subtitle)
          : moveCourse(payload.courseNumber, payload.subtitle, to)
        ).then(json => {
          if (json.success) {
            onRemoveCourse(from, removedIndex);
            onAddCourse(to, addedIndex, payload);
            console.log('success');
          }
        });
      } else {
        this.dropQueue.push({ from, to: 'none', payload });
      }
    }
    if (addedIndex !== null) {
      const dropEventIndex = this.dropQueue.findIndex(
        obj => obj.payload === payload
      );
      const to = semesterId;
      if (dropEventIndex !== -1) {
        const { from } = this.dropQueue[dropEventIndex];
        this.dropQueue.splice(dropEventIndex, 1);
        (to === '0'
          ? deleteCourse(payload.courseNumber, payload.subtitle)
          : moveCourse(payload.courseNumber, payload.subtitle, to)
        ).then(json => {
          if (json.success) {
            onRemoveCourse(from, removedIndex);
            onAddCourse(to, addedIndex, payload);
            console.log('success');
          }
        });
      } else {
        this.dropQueue.push({ from: 'none', to, payload });
      }
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

    if (sourceContainerOptions.groupName === 'pinnedCourse' && !semester) {
      return true;
    }

    if (semester && semester.semester <= this.props.currentSemester) {
      return false;
    }

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
    const pinnedCourseLane = boardData[0];

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
          groupName="pinnedCourse"
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
        <div style={{ display:"flex"}}>
          <div className={classes.boardContainer}>
            {boardData.slice(1).map(semester => (
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
            <div style={{ minWidth: '30vh' }} />
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
