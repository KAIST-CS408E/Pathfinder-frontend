import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators } from 'redux';

import { Container, Draggable } from 'react-smooth-dnd';

import * as classNames from 'classnames';
import { Location } from 'history';
import * as lodash from 'lodash';

import {
  deleteCourse,
  doRecommendation,
  doSimulation,
  getBoard,
  moveCourse,
} from '@src/api';
import { RootState } from '@src/redux';
import { actions as plannerActions } from '@src/redux/planner';
import { buildCourseKey, convertSpentTime, range } from '@src/utils';

import { ICourseCard, IPinnedTable, ISemester } from 'pathfinder';

import styles from './Planner.style';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
// icons
import { MoreHoriz, PlayCircleOutline, ThumbUp } from '@material-ui/icons';

const { classes } = styles;

interface IProps extends RouteComponentProps<{}> {
  boardData: ISemester[];
  currentSemester: number;

  pinnedList: IPinnedTable;

  location: Location;

  onInitBoard: typeof plannerActions.initBoard;
  onSetManyCourseCards: typeof plannerActions.setManyCourseCards;
  onAddCourse: typeof plannerActions.addCourse;
  onRemoveCourse: typeof plannerActions.removeCourse;
  onSetManyFeedbacks: typeof plannerActions.setManyFeedbacks;
  onRemoveAllFeedback: typeof plannerActions.removeAllFeedback;
  onRemoveFeedback: typeof plannerActions.removeFeedback;

  onSelectDivision: typeof plannerActions.selectDivision;
}

const profColorD = '#9E9E9E';
const profColorS = '#536DFE';

const warnColor = 'rgb(232, 113, 151)';
const passColor = 'rgb(153, 190, 221)';
const recommendColor = '#FFC107';
const ourKaistBlue = '#E3F2FD';

class Planner extends React.Component<IProps> {
  public dropQueue: Array<{
    from: string;
    fromIndex: number;
    to: string;
    toIndex: number;
    payload: ICourseCard;
  }> = [];

  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    getBoard().then(json => {
      const { boardData, currentSemester } = json;

      this.props.onInitBoard(
        [
          ...this.additionalBoards(
            lodash.flatMap(boardData, semester => semester.courses)
          ),
          ...range(13)
            .slice(1)
            .map((n: number) => {
              const semesterId = String(n);
              const basicData = { id: semesterId, semester: n };
              const remoteData = boardData[semesterId];
              if (remoteData) {
                return {
                  ...basicData,
                  courses: remoteData.courses.map((course: any) => ({
                    ...course,
                    id: buildCourseKey(course),
                    selectedDivision:
                      course.selectedDivision !== null
                        ? course.selectedDivision
                        : undefined,
                  })),
                  feedback: remoteData.feedback,
                };
              }
              return { ...basicData, courses: [], feedback: [] };
            }),
        ],
        currentSemester
      );
      setTimeout(() => {
        this.alignToNextSemester();
      }, 0);
    });
  }

  public componentDidUpdate(prevProps: IProps) {
    // When the board data is initialized, align
    if (prevProps.boardData.length === 0 && this.props.boardData.length !== 0) {
      this.alignToNextSemester();
    }

    if (
      this.props.boardData.length > 0 &&
      prevProps.pinnedList !== this.props.pinnedList
    ) {
      this.updatePinnedList();
    }
  }

  public updatePinnedList() {
    this.props.onSetManyCourseCards(
      'side_pinnedList',
      this.pinnedCourseBoard(
        this.getExcludeList(
          lodash.flatMap(this.props.boardData, semester => semester.courses)
        )
      ).courses
    );
  }

  public alignToNextSemester() {
    const { currentSemester } = this.props;
    const board = document.querySelector(`.${classes.boardContainer}`);
    const lane = document.querySelector(
      `.semesterBoard-_${currentSemester + 1}`
    );
    const paddingLeft =
      (document.scrollingElement || document.body).getBoundingClientRect()
        .width * 0.1;
    if (board && lane) {
      board.scrollLeft += lane.getBoundingClientRect().left - paddingLeft;
    }
  }

  public getExcludeList = (exclude: ICourseCard[]) => {
    const excludeList = {};
    exclude.forEach(card => {
      excludeList[buildCourseKey(card)] = true;
    });
    return excludeList;
  };

  public additionalBoards = (exclude: ICourseCard[]): ISemester[] => {
    return [this.pinnedCourseBoard(this.getExcludeList(exclude))];
  };

  public pinnedCourseBoard = (excludeList: { [key: string]: boolean }) => {
    const { pinnedList } = this.props;

    const courses = Object.entries(pinnedList)
      .filter(([_, pin]) => !excludeList[buildCourseKey(pin)])
      .map(([key, pinnedCourse]): ICourseCard => ({
        id: key,
        type: 'pinned' as 'pinned',

        courseNumber: pinnedCourse.courseNumber,
        name: pinnedCourse.courseName,
        subtitle: pinnedCourse.subtitle,

        lectures: pinnedCourse.lectures,
      }));

    return {
      id: 'side_pinnedList',
      semester: 0,

      courses,
      feedback: [],
    };
  };

  public calcLoadSum(courses: ICourseCard[]) {
    return courses
      .map(course => {
        if (course.selectedDivision !== undefined) {
          const selectedLecture = course.lectures.find(
            lecture => lecture.division === course.selectedDivision
          );
          if (!selectedLecture) {
            return 0;
          }
          const load = selectedLecture.load;
          return convertSpentTime(load !== undefined ? load : '3 to 5');
        } else {
          return 0;
        }
      })
      .reduce((a, b) => a + b, 0);
  }

  public calcGradeAverage(courses: ICourseCard[]) {
    return (
      courses
        .map(course => {
          if (course.selectedDivision !== undefined) {
            const selectedLecture = course.lectures.find(
              lecture => lecture.division === course.selectedDivision
            );
            if (!selectedLecture) {
              return 0;
            }
            const grades = selectedLecture.grades;
            return Number(grades);
          } else {
            return 0;
          }
        })
        .reduce((a, b) => a + b, 0) / courses.length
    );
  }

  public onCardDrop = (semesterId: string) => (dropResult: any) => {
    // const { onAddCourse, onRemoveCourse } = this.props;
    const { removedIndex, addedIndex, payload } = dropResult;
    // console.group('onCardDrop');
    // console.log(semesterId, dropResult);
    // console.groupEnd();

    if (removedIndex !== null) {
      const dropEventIndex = this.dropQueue.findIndex(
        obj => obj.payload === payload
      );
      const from = semesterId;
      if (dropEventIndex !== -1) {
        const { to, toIndex } = this.dropQueue[dropEventIndex];
        if (to === 'none') {
          console.error('hum..');
        }
        this.dropQueue.splice(dropEventIndex, 1);
        this.moveCard(from, removedIndex, to, toIndex, payload);
      } else {
        this.dropQueue.push({
          from,
          fromIndex: removedIndex,
          to: 'none',
          toIndex: 0,

          payload,
        });
      }
    }
    if (addedIndex !== null) {
      const dropEventIndex = this.dropQueue.findIndex(
        obj => obj.payload === payload
      );
      const to = semesterId;
      if (dropEventIndex !== -1) {
        const { from, fromIndex } = this.dropQueue[dropEventIndex];
        this.dropQueue.splice(dropEventIndex, 1);
        this.moveCard(from, fromIndex, to, addedIndex, payload);
      } else {
        this.dropQueue.push({
          from: 'none',
          fromIndex: 0,
          to,
          toIndex: addedIndex,

          payload,
        });
      }
    }
  };

  public moveCard(
    from: string,
    fromIndex: number,
    to: string,
    toIndex: number,
    payload: ICourseCard
  ) {
    const { onAddCourse, onRemoveCourse, onRemoveFeedback } = this.props;
    onRemoveCourse(from, fromIndex);
    onAddCourse(to, toIndex, payload);
    onRemoveFeedback(from);
    onRemoveFeedback(to);
    (to.startsWith('side')
      ? deleteCourse(payload.courseNumber, payload.subtitle)
      : moveCourse(
          payload.courseNumber,
          payload.subtitle,
          to,
          payload.selectedDivision
        )
    ).then(json => {
      if (json.success) {
        console.log('board update success');
      } else {
        console.error(
          'board update failed',
          from,
          fromIndex,
          to,
          toIndex,
          payload
        );
      }
    });
  }

  public getChildPayload = (semesterId: string) => (courseIndex: number) => {
    return this.props.boardData.filter(
      courseList => courseList.id === semesterId
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

    // If target container is not the future container
    if (semester && semester.semester <= this.props.currentSemester) {
      return false;
    }

    // if the source container is not the future semester
    const sourceSelector = `.${sourceContainerOptions.groupName}`;
    if (sourceContainerOptions.groupName.startsWith('semesterBoard')) {
      if (Number(sourceSelector.split('-_')[1]) <= this.props.currentSemester) {
        return false;
      }
    }

    // See if target or source container is properly positioned away from pin list
    // Find source container only if the function is called by the pin list
    const selector = semester
      ? `.semesterBoard-_${semester.id}`
      : sourceSelector;
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

  public handleClickRecommendation = () => {
    doRecommendation().then(response => {
      const { boardData, currentSemester } = this.props;
      const nextSemester = String(currentSemester + 1);
      const currentLane = boardData.find(
        semester => semester.id === nextSemester
      );
      if (!currentLane) {
        return;
      }
      // drop every cards
      currentLane.courses.forEach(course => {
        this.moveCard(nextSemester, 0, 'side_pinnedList', 0, course);
      });

      response.cf.forEach(recommend => {
        let found = false;
        boardData.forEach(semester => {
          const index = semester.courses.findIndex(
            course => buildCourseKey(course) === buildCourseKey(recommend)
          );
          if (index !== -1) {
            found = true;
            this.moveCard(semester.id, index, nextSemester, 0, {
              ...semester.courses[index],
              type: 'recommended' as 'recommended',
            });
          }
        });
        if (!found) {
          const card = {
            ...recommend,
            id: buildCourseKey(recommend),
            type: 'recommended' as 'recommended',
          };
          this.props.onAddCourse(nextSemester, 0, card);
          this.moveCard(nextSemester, 0, nextSemester, 0, card);
        }
      });
      setTimeout(() => this.updatePinnedList(), 0);
    });
  };

  public handleClickSimulation = () => {
    this.props.onRemoveAllFeedback();
    doSimulation()
      .then(json => this.props.onSetManyFeedbacks(json))
      .catch(e => {
        console.error(e);
      });
  };

  public handleClickCourseDivision = (
    semesterId: string,
    course: ICourseCard,
    division: string
  ) => () => {
    this.props.onSelectDivision(semesterId, course.id, division);
    if (!semesterId.startsWith('side')) {
      moveCourse(course.courseNumber, course.subtitle, semesterId, division);
    }
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
              <CourseCard
                key={course.id}
                semesterId={pinnedCourseLane.id}
                course={course}
                preventDragging={this.preventDragging}
                onClickCourseDivision={this.handleClickCourseDivision}
              />
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
            onClick={this.handleClickRecommendation}
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
            onClick={this.handleClickSimulation}
          />
        </div>

        {/* the kanban board */}
        <div style={{ display: 'flex' }}>
          <div className={classes.boardContainer}>
            {boardData.slice(1).map(semester => (
              <div
                key={semester.id}
                className={classNames(
                  classes.semesterBoard,
                  `semesterBoard-_${semester.id}`
                )}
              >
                <header className={classes.laneHeader}>
                  <div className={classes.laneTitle}>{semester.id}</div>
                  <div className={classes.laneLabel}>
                    {semester.label
                      ? semester.label
                      : `Load: ${this.calcLoadSum(
                          semester.courses
                        )} Grade: ${this.calcGradeAverage(semester.courses)}`}
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
                      <CourseCard
                        key={course.id}
                        semesterId={semester.id}
                        course={course}
                        preventDragging={this.preventDragging}
                        onClickCourseDivision={this.handleClickCourseDivision}
                      />
                    );
                  })}
                </Container>
                <div className={classes.feedback}>
                  {semester.feedback.map(feedback => {
                    let reason = '';
                    if (!feedback.ok) {
                      if (feedback.type === 'time') {
                        const errorCourses = Object.entries(feedback.reason)[0];
                        const a = errorCourses[0];
                        const b = errorCourses[1];
                        const aC = semester.courses.find(
                          course => course.courseNumber === a
                        );
                        const bC = semester.courses.find(
                          course => course.courseNumber === b
                        );
                        if (aC && bC) {
                          reason = `the class time of "${aC.name}" and "${
                            bC.name
                          }" overlap`;
                        }
                      }
                    }

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
                        <div className={classes.feedbackDetail}>{reason}</div>
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

const mapStateToProps = (state: RootState) => ({
  ...state.planner,
  pinnedList: state.pinnedList,

  location: state.router.location,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onInitBoard: plannerActions.initBoard,
      onSetManyCourseCards: plannerActions.setManyCourseCards,

      onAddCourse: plannerActions.addCourse,
      onRemoveCourse: plannerActions.removeCourse,

      onRemoveAllFeedback: plannerActions.removeAllFeedback,
      onRemoveFeedback: plannerActions.removeFeedback,
      onSetManyFeedbacks: plannerActions.setManyFeedbacks,

      onSelectDivision: plannerActions.selectDivision,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Planner);

interface ICourseCardProps {
  semesterId: string;
  course: ICourseCard;
  preventDragging: (e: React.MouseEvent<HTMLElement>) => void;
  onClickCourseDivision: (
    semesterId: string,
    course: ICourseCard,
    division: string
  ) => () => void;
}

const CourseCard: React.SFC<ICourseCardProps> = ({
  semesterId,
  course,
  preventDragging,
  onClickCourseDivision,
}) => {
  return (
    <Draggable
      onClick={preventDragging}
      className={course.type === 'recommended' ? classes.recCard : classes.card}
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
          <span
            style={{
              color: profColorS,
              fontSize: 12,
              marginLeft: 6,
            }}
          >
            {course.myGrade ? course.myGrade : ''}
          </span>
        </div>
        <div style={{ height: 20 }}>
          <MoreHoriz />
        </div>
      </header>
      <div className={classes.cardMiddle}>
        {course.description ? course.description : 'Load:-.- Grade:-.-'}
      </div>
      <div className={classes.cardProfs}>
        {course.lectures.map(lecture => (
          <div
            style={{
              backgroundColor:
                course.selectedDivision !== undefined &&
                lecture.division === course.selectedDivision
                  ? profColorS
                  : profColorD,
              color: 'white',
            }}
            onClick={onClickCourseDivision(
              semesterId,
              course,
              lecture.division || ''
            )}
          >
            {lecture.professor}
          </div>
        ))}
      </div>
    </Draggable>
  );
};
