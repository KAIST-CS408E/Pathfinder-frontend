import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { push } from 'react-router-redux';

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
  getCardLectures,
  moveCourse,
} from '@src/api';
import { RootState } from '@src/redux';
import { actions as plannerActions } from '@src/redux/planner';
import {
  buildCourseKey,
  convertSpentTime,
  getReadableSemester,
  precisionRound,
  range,
} from '@src/utils';

import {
  ICourseCard,
  ICourseCardLectureTable,
  ICourseKeys,
  IPinnedTable,
  ISemester,
  ISimpleLecture,
} from 'pathfinder';

import styles from './Planner.style';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
// icons
import {
  Check,
  Close as CloseIcon,
  MoreHoriz,
  PlayCircleOutline,
  ThumbUp,
} from '@material-ui/icons';
import * as ReactTooltip from 'react-tooltip';

const { classes } = styles;

interface IProps extends RouteComponentProps<{}> {
  boardData: ISemester[];
  cardLectureTable: ICourseCardLectureTable;
  currentSemester: number;

  pinnedList: IPinnedTable;

  location: Location;

  onInitBoard: typeof plannerActions.initBoard;
  onSetManyCourseCards: typeof plannerActions.setManyCourseCards;
  onAddCourse: typeof plannerActions.addCourse;
  onRemoveCourse: typeof plannerActions.removeCourse;
  onSetCardLectures: typeof plannerActions.setCardLectures;
  onSetManyFeedbacks: typeof plannerActions.setManyFeedbacks;
  onRemoveAllFeedback: typeof plannerActions.removeAllFeedback;
  onRemoveFeedback: typeof plannerActions.removeFeedback;
  onSetRecommendedCourse: typeof plannerActions.setRecommendedCourse;
  onSetToNormalCourse: typeof plannerActions.setToNormalCourse;

  onSelectDivision: typeof plannerActions.selectDivision;

  push: typeof push;
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

      const everyCourse = lodash.flatMap(
        boardData,
        semester => semester.courses
      );

      getCardLectures(everyCourse)
        .then(response => this.props.onSetCardLectures(response))
        .then(() => {
          this.handleClickSimulation();
        });

      let lastYear = 0;
      let lastTerm = 'Fall';
      let lastSemester = 0;
      this.props.onInitBoard(
        [
          ...this.additionalBoards(everyCourse),
          ...range(13)
            .slice(1)
            .map((n: number) => {
              const semesterId = String(n);

              const remoteData = boardData[semesterId];
              const readableSem = getReadableSemester(
                lastYear,
                lastTerm,
                n - lastSemester
              );

              const basicData = {
                id: semesterId,
                semester: n,
                ...readableSem,
              };

              if (remoteData) {
                if (n <= currentSemester) {
                  lastYear = remoteData.year;
                  lastTerm = remoteData.term;
                  lastSemester = n;
                }

                if (!remoteData.term) {
                  remoteData.term = readableSem.term;
                  remoteData.year = readableSem.year;
                }

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
                  feedback: [],
                  term: remoteData.term,
                  year: remoteData.year,
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

    getCardLectures(Object.values(pinnedList)).then(json =>
      this.props.onSetCardLectures(json)
    );

    const courses = Object.entries(pinnedList)
      .filter(([_, pin]) => !excludeList[buildCourseKey(pin)])
      .map(([key, pinnedCourse]): ICourseCard => ({
        id: key,
        type: 'pinned' as 'pinned',

        courseNumber: pinnedCourse.courseNumber,
        name: pinnedCourse.courseName,
        subtitle: pinnedCourse.subtitle,
      }));

    return {
      id: 'side_pinnedList',
      semester: 0,

      courses,
      feedback: [],
      term: 'none',
      year: 0,
    };
  };

  public calcRecentLectures = (course: ICourseKeys) => {
    const { cardLectureTable } = this.props;
    const lectureHistory = cardLectureTable[buildCourseKey(course)];
    const lectures =
      lectureHistory &&
      lodash.uniqBy(
        lectureHistory.previousLectures
          .filter(lecture => lecture.year !== 2018 || lecture.term !== 'Spring')
          .concat(lectureHistory.lectures, lectureHistory.previousLectures),
        lecture => lecture.professor
      );
    return lectures;
  };

  public onCardDrop = (semesterId: string) => (dropResult: any) => {
    // const { onAddCourse, onRemoveCourse } = this.props;
    const { removedIndex, addedIndex, payload } = dropResult;
    console.group('onCardDrop');
    console.log(semesterId, dropResult);
    console.groupEnd();

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
        if (!(from === to && from.startsWith('side'))) {
          this.moveCard(from, removedIndex, to, toIndex, payload);
        }
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
        if (!(from === to && from.startsWith('side'))) {
          this.moveCard(from, fromIndex, to, addedIndex, payload);
        }
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

  public deleteCard = (
    from: string,
    fromIndex: number,
    payload: ICourseCard
  ) => {
    const { onRemoveCourse } = this.props;
    onRemoveCourse(from, fromIndex);
    deleteCourse(payload.courseNumber, payload.subtitle).then(json => {
      if (json.success) {
        console.log('board update success');
      } else {
        console.error('board update failed', from, fromIndex, payload);
      }
    });

    this.handleClickSimulation();
  };

  public moveCard(
    from: string,
    fromIndex: number,
    to: string,
    toIndex: number,
    payload: ICourseCard
  ) {
    const { onAddCourse, onRemoveCourse } = this.props;
    onRemoveCourse(from, fromIndex);
    onAddCourse(to, toIndex, payload);
    // onRemoveFeedback(from);
    // onRemoveFeedback(to);

    (to.startsWith('side')
      ? deleteCourse(payload.courseNumber, payload.subtitle)
      : moveCourse(
          payload.courseNumber,
          payload.subtitle,
          to,
          payload.selectedProfessor,
          payload.selectedDivision
        )
    )
      .then(json => {
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
      })
      .then(() => {
        this.handleClickSimulation();
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
    const sourceId = sourceContainerOptions.groupName.startsWith(
      'semesterBoard'
    )
      ? sourceSelector.split('-_')[1]
      : 'side_pinnedlist';

    if (sourceId !== 'side_pinnedlist') {
      if (Number(sourceId) <= this.props.currentSemester) {
        return false;
      } else if (semester && sourceId === semester.id) {
        return true;
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
    doRecommendation().then(json => {
      this.props.onSetRecommendedCourse(
        String(this.props.currentSemester + 1),
        json.cf
      );
      getCardLectures(json.cf).then(response =>
        this.props.onSetCardLectures(response)
      );
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
    professor: string,
    division: string
  ) => () => {
    const { currentSemester } = this.props;
    if (Number(semesterId) <= currentSemester) {
      return;
    }
    this.props.onSelectDivision(semesterId, course.id, professor, division);
    if (!semesterId.startsWith('side')) {
      moveCourse(
        course.courseNumber,
        course.subtitle,
        semesterId,
        professor,
        division
      );
    }
  };

  public handleClickFixRecommend = (
    semesterId: string,
    course: ICourseCard,
    fix: boolean
  ) => () => {
    const { boardData } = this.props;
    const semesterIndex = boardData.findIndex(
      semester => semester.id === semesterId
    );
    const courseKey = buildCourseKey(course);
    const fromIndex = boardData[semesterIndex].courses.findIndex(
      card => buildCourseKey(card) === courseKey
    );

    if (fix) {
      // TODO: DELETE type and takenFrom
      this.moveCard(semesterId, fromIndex, semesterId, fromIndex, course);
    } else {
      // TODO: move to Pin or delete

      if (course.takenFrom && course.takenFrom !== semesterId) {
        if (semesterIndex !== -1) {
          this.moveCard(semesterId, fromIndex, course.takenFrom, 0, course);
        }
      } else {
        this.deleteCard(semesterId, fromIndex, course);
      }
    }
    // console.log('123')
  };

  public gotoDetail = (path: string) => {
    this.props.push(`/curriculum/d${path}`, { modalDetail: true });
  };

  public handleClickDetail = (
    year: number,
    term: string,
    course: ICourseCard
  ) => () => {
    this.gotoDetail(
      `/${year}/${term}/${course.courseNumber}/?subtitle=${course.subtitle}`
    );
  };

  public renderPinnedCourse() {
    const { boardData, cardLectureTable } = this.props;

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
          <div className={classes.laneTitle}>Pinned Courses</div>
          {/*<div className={classes.laneLabel}>*/}
          {/*{pinnedCourseLane.label*/}
          {/*? pinnedCourseLane.label*/}
          {/*: 'Load: -.- Grade: -.-'}*/}
          {/*</div>*/}
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
                lectures={
                  cardLectureTable[buildCourseKey(course)] &&
                  cardLectureTable[buildCourseKey(course)].lectures
                }
                preventDragging={this.preventDragging}
                onClickCourseDivision={this.handleClickCourseDivision}
                onClickFixRecommend={this.handleClickFixRecommend}
                onClickDetail={this.handleClickDetail(
                  pinnedCourseLane.year,
                  pinnedCourseLane.term,
                  course
                )}
              />
            );
          })}
        </Container>
      </div>
    );
  }

  public mapLecture = (semester: ISemester) => {
    const { currentSemester, cardLectureTable } = this.props;

    return semester.courses.map(course => {
      let lectures;
      let lectureIndex;
      if (semester.semester <= currentSemester) {
        const courseKey = buildCourseKey(course);
        const courseLectures = cardLectureTable[courseKey];
        if (courseLectures) {
          lectures = courseLectures.previousLectures.filter(
            lecture =>
              lecture.year === semester.year && lecture.term === semester.term
          );
          lectureIndex = lectures.findIndex(
            lecture => lecture.division === course.selectedDivision
          );
        }
      }

      lectures = lectures || this.calcRecentLectures(course);
      lectureIndex =
        lectureIndex !== undefined
          ? lectureIndex
          : lectures &&
            lectures.findIndex(
              lecture => lecture.professor === course.selectedProfessor
            );

      return { lectures, lectureIndex };
    });
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
            Plan my academic path, simulate, and get recommends based on course
            registration history.
            <br />* Use it as one of sources of information when you plan your
            semester
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
            {boardData.slice(1).map(semester => {
              const courseLectureMap = this.mapLecture(semester);
              const allLectures = courseLectureMap
                .map(
                  datum => datum.lectures && datum.lectures[datum.lectureIndex]
                )
                .filter(datum => datum);
              const loadSum = allLectures
                .map(
                  lecture => (lecture.load ? convertSpentTime(lecture.load) : 0)
                )
                .reduce((a, b) => a + b, 0);
              const allGrade = allLectures
                .filter(lecture => lecture.grade)
                .map(lecture => lecture.grade);
              const gradeSum =
                precisionRound(lodash.sum(allGrade) / allGrade.length, 2) ||
                'N/A';

              const hasBadFeedback = semester.feedback.some(
                feedback => !feedback.ok
              );
              const displayFeedback = hasBadFeedback
                ? semester.feedback.filter(feedback => !feedback.ok)
                : semester.feedback;

              return (
                <div
                  key={semester.id}
                  className={classNames(
                    classes.semesterBoard,
                    `semesterBoard-_${semester.id}`
                  )}
                >
                  <header className={classes.laneHeader}>
                    <div className={classes.laneTitle}>
                      {semester.id} ({semester.term} {semester.year})
                    </div>
                    <div className={classes.laneLabel}>
                      {semester.label
                        ? semester.label
                        : `Load: ${loadSum} Grade: ${gradeSum}`}
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
                    {semester.courses.map((course, courseIndex) => {
                      let lectures;
                      let lectureIndex;
                      if (courseLectureMap[courseIndex]) {
                        const lectureMap = courseLectureMap[courseIndex];
                        lectures = lectureMap.lectures;
                        lectureIndex = lectureMap.lectureIndex;
                      }
                      return (
                        <CourseCard
                          key={course.id}
                          semesterId={semester.id}
                          course={course}
                          lectures={lectures}
                          selectedLecture={lectureIndex}
                          preventDragging={this.preventDragging}
                          onClickCourseDivision={this.handleClickCourseDivision}
                          onClickFixRecommend={this.handleClickFixRecommend}
                          onClickDetail={this.handleClickDetail(
                            semester.year,
                            semester.term,
                            course
                          )}
                        />
                      );
                    })}
                  </Container>
                  <div className={classes.feedback}>
                    {displayFeedback.map(feedback => {
                      let readableType: string = feedback.type;
                      switch (feedback.type) {
                        case 'time':
                          readableType = 'Class time';
                          break;
                        case 'not_open':
                          readableType = 'Offered course';
                          break;
                        case 'prerequisite':
                          readableType = 'Prerequisite';
                          break;
                        default:
                          break;
                      }

                      let reason = '';

                      if (!feedback.ok) {
                        if (feedback.type === 'time') {
                          const errorCourses = feedback.reason[0];
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
                        } else if (feedback.type === 'not_open') {
                          reason = feedback.reason
                            .map((causeCourseNumber: string) => {
                              const causeCourse = semester.courses.find(
                                course =>
                                  course.courseNumber === causeCourseNumber
                              );
                              if (causeCourse) {
                                return `Selected lecture "${
                                  causeCourse.name
                                }" is not offered in this semester`;
                              } else {
                                return '';
                              }
                            })
                            .filter((reasonLine: string) => Boolean(reasonLine))
                            .join('\n');
                        }
                      }

                      return (
                        <div
                          key={feedback.type}
                          style={{
                            backgroundColor: feedback.ok
                              ? passColor
                              : warnColor,
                          }}
                        >
                          <div className={classes.feedbackTitle}>
                            {readableType}
                            {feedback.ok
                              ? ' condition is satisfied'
                              : ' condition not satisfied'}
                          </div>
                          <div className={classes.feedbackDetail}>{reason}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
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

      onSetCardLectures: plannerActions.setCardLectures,
      onSetRecommendedCourse: plannerActions.setRecommendedCourse,
      onSetToNormalCourse: plannerActions.setToNormalCourse,

      onRemoveAllFeedback: plannerActions.removeAllFeedback,
      onRemoveFeedback: plannerActions.removeFeedback,
      onSetManyFeedbacks: plannerActions.setManyFeedbacks,

      onSelectDivision: plannerActions.selectDivision,

      push,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Planner);

interface ICourseCardProps {
  semesterId: string;
  course: ICourseCard;
  lectures?: ISimpleLecture[];
  selectedLecture?: number;
  preventDragging: (e: React.MouseEvent<HTMLElement>) => void;
  onClickCourseDivision: (
    semesterId: string,
    course: ICourseCard,
    professor: string,
    division: string
  ) => () => void;
  onClickFixRecommend: (
    semesterId: string,
    course: ICourseCard,
    fix: boolean
  ) => () => void;
  onClickDetail: () => void;
}

const CourseCard: React.SFC<ICourseCardProps> = ({
  semesterId,
  course,
  lectures,
  selectedLecture,
  preventDragging,
  onClickCourseDivision,
  onClickFixRecommend,
  onClickDetail,
}) => {
  let loadGrade = 'Load: N/A Grade: N/A';
  if (lectures && selectedLecture !== undefined) {
    const selLecture = lectures[selectedLecture];
    if (selLecture) {
      loadGrade = `Load: ${selLecture.load ||
        'N/A'} Grade: ${selLecture.grade || 'N/A'}`;
    }
  }

  let recommendReason = '';
  if (course.special) {
    recommendReason = `${course.special.averageSemester}|${
      course.special.count
    }`;
  }

  return (
    <Draggable
      onClick={preventDragging}
      className={course.type === 'recommended' ? classes.recCard : classes.card}
    >
      <ReactTooltip
        id="courseCardRecommend"
        effect="solid"
        getContent={renderRecommendTooltip}
      />
      {course.type === 'recommended' ? (
        <div
          className={classes.recCardTop}
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Chip
            data-tip={recommendReason}
            data-for="courseCardRecommend"
            label="RECOMMENDED"
            style={{
              backgroundColor: recommendColor,
              color: 'white',
              fontSize: 12,
              height: 18,
            }}
          />
          <div style={{ display: 'flex' }}>
            <div onClick={onClickFixRecommend(semesterId, course, true)}>
              <Check />
            </div>
            <div onClick={onClickFixRecommend(semesterId, course, false)}>
              <CloseIcon />
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <header className={classes.cardHeader}>
        <div style={{ width: '100%' }}>
          {course.name}
          <span style={{ color: profColorS, fontSize: 12, marginLeft: 6 }}>
            {course.myGrade ? course.myGrade : ''}
          </span>
        </div>
        <div onClick={onClickDetail} style={{ height: 20 }}>
          <MoreHoriz />
        </div>
      </header>
      <div className={classes.cardMiddle}>{loadGrade}</div>
      <div className={classes.cardProfs}>
        {lectures &&
          lectures.map((lecture, index) => (
            <div
              key={lecture.professor + lecture.division}
              style={{
                backgroundColor:
                  selectedLecture === index ? profColorS : profColorD,
                color: 'white',
              }}
              onClick={onClickCourseDivision(
                semesterId,
                course,
                lecture.professor,
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

const renderRecommendTooltip = (data: string) => {
  if (!data) {
    return <>nothing</>;
  }
  const dataSplit = data.split('|');
  const averageSemester = dataSplit[0];
  const count = dataSplit[1];
  return (
    <span>
      <b>{count}</b> people took this course in the {averageSemester}th semester
    </span>
  );
};
