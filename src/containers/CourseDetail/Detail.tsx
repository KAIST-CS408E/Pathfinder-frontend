import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { connect, Dispatch } from 'react-redux';
import { push, replace } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import { Location } from 'history';

import * as classNames from 'classnames';
import * as d3Array from 'd3-array';
import * as d3Coll from 'd3-collection';

import Card from '@material-ui/core/Card';
import CardContent, { CardContentProps } from '@material-ui/core/CardContent';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';

import List from '@material-ui/core/List';
import ListSubheader, {
  ListSubheaderProps,
} from '@material-ui/core/ListSubheader';

import { WithStyles, withStyles } from '@material-ui/core/styles';
import styles from './Detail.style';
import GradeChart from './GradeChart';
import PeerCourseListItem from './PeerCourseListItem';

import { pinCourse, unpinCourse } from '@src/api';
import { API_URL } from '@src/constants/api';
import { rootActions as actions, RootState } from '@src/redux';
import { actions as detailActions } from '@src/redux/courseDetail';
import { buildCourseKey } from '@src/utils';

import {
  ICourseDetail,
  ILectureDetail,
  ILectureKeys,
  IPinnedTable,
} from 'pathfinder';

const { classes } = styles;

const ourKaistBlue = '#E3F2FD';
const recommendColor = '#FFC107';

const doFirst = ' !important';

const CustomTableCellD = withStyles(theme => ({
  root: {
    borderBottom: '0px' + doFirst,
    borderRight: '2px solid ' + ourKaistBlue,
    padding: '4px 12px 4px !important',

    fontSize: '15px !important',
  },

  paddingDense: {
    padding: '12px !important',
  },
}))(TableCell as React.ComponentType<
  TableCellProps & WithStyles<'root' | 'paddingDense' | 'numeric'>
>);

const CustomTableRow = withStyles(theme => ({
  root: {
    borderRight: '5%',
  },
}))(TableRow as React.ComponentType<
  TableRowProps & WithStyles<'root' | 'paddingDense' | 'numeric'>
>);

const StatusChip = withStyles(theme => ({
  root: {
    height: '24px !important',
    margin: '0px 6px',
  },
}))(Chip as React.ComponentType<ChipProps & WithStyles<'root'>>);

const RcmSubHeader = withStyles(theme => ({
  root: {
    lineHeight: '1em',
    padding: '12px 24px',
  },
}))(ListSubheader as React.ComponentType<
  ListSubheaderProps & WithStyles<'root'>
>);

const ProfCardContent = withStyles(theme => ({
  root: {
    padding: '16px' + doFirst,
  },
}))(CardContent as React.ComponentType<CardContentProps & WithStyles<'root'>>);

const themeStyle = () => ({
  buttonPin: {
    height: 32,
    marginBottom: 6,
    marginLeft: 6,
    marginRight: 12,
    minHeight: 32,
    padding: '4px 16px 4px 16px' + doFirst,
  },

  chipRcm: {
    backgroundColor: recommendColor + doFirst,
    color: 'white' + doFirst,
  },

  pinIcon: {
    marginLeft: 8,
  },

  graphCard: {
    backgroundColor: 'white',
    display: 'flex',
    marginBottom: 12,
    padding: 0,
    paddingLeft: 24,
  },

  listItems: {
    padding: '8px 12px' + doFirst,
  },

  iconOfList: {
    fontSize: 20,
    marginRight: 0,
  },

  card: {
    backgroundColor: '#E3F2FD' + doFirst,
    color: '#757575' + doFirst,
    marginLeft: '1rem',
    maxWidth: 345,

    '& > div': {
      zIndex: 2,
    },
  },

  historyCard: {
    backgroundColor: 'white' + doFirst,
    color: 'white' + doFirst,
    marginLeft: '1rem',
    maxWidth: 345,
    zIndex: 10,

    '& h3': {
      color: 'black',
    },
    '& p': {
      color: 'black',
    },

    '& > div': {
      zIndex: 2,

      '&:last-child': {
        backgroundColor: 'white',
      },
    },
  },

  selectedCard: {
    border: '1px solid black',
    borderRadius: 4,

    backgroundColor: '#7986CB' + doFirst,
    color: 'white' + doFirst,
  },

  media: {
    border: '1px solid ' + ourKaistBlue,
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  labelIcon: {
    fontSize: '0.9em',
    paddingTop: 6,
  },
});

function isSameLecture(a: ILectureKeys, b: ILectureKeys) {
  return (
    String(a.year) === String(b.year) &&
    a.term === b.term &&
    a.division === b.division
  );
}

export interface ICourseQuery {
  year: string;
  term: string;
  division: string;
  courseNumber: string;
}

export interface IProps extends RouteComponentProps<ICourseQuery> {
  location: Location;

  pinnedList: IPinnedTable;

  year: string;
  term: string;
  division: string;
  courseNumber: string;
  subtitle: string;

  data: ICourseDetail | null;
  fetching: boolean;

  onFetchDetailRequest: typeof detailActions.fetchDetailRequest;
  onFetchDetailSuccess: typeof detailActions.fetchDetailSuccess;
  onFetchDetailFailure: typeof detailActions.fetchDetailFailure;

  onInitDetail: typeof detailActions.initDetail;
  onChangeLecture: typeof detailActions.changeLecture;
  onChangeCourse: typeof detailActions.changeCourse;

  onPinnedCourse: typeof actions.pinCourse;
  onUnpinCourse: typeof actions.unpinCourse;

  push: typeof push;
  replace: typeof replace;
}

export interface IState {
  selectedSemester: {
    year: number;
    term: string;
  };
}

class Detail extends React.Component<
  IProps &
    WithStyles<
      | 'buttonPin'
      | 'chipRcm'
      | 'pinIcon'
      | 'graphCard'
      | 'listItems'
      | 'iconOfList'
      | 'card'
      | 'historyCard'
      | 'media'
      | 'typo'
      | 'selectedCard'
      | 'labelIcon'
    >,
  IState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedSemester: { year: 0, term: '' },
    };
  }

  public componentDidMount() {
    const { onInitDetail } = this.props;
    const routeState = this.getRouteState();
    onInitDetail(routeState);
    this.fetchDetailedData(routeState.courseNumber, routeState.subtitle);
  }

  public componentDidUpdate(prevProps: IProps) {
    if (!this.props.data) {
      return;
    }
    const { data, location } = this.props;
    const {
      courseNumber: targetCourseNumber,
      subtitle: targetSubtitle,
      division,
      term,
      year,
    } = this.getRouteState();

    if (location !== prevProps.location) {
      const { courseNumber, subtitle } = data.course;
      if (
        !this.props.fetching &&
        (courseNumber !== targetCourseNumber || subtitle !== targetSubtitle)
      ) {
        console.log('Updating %s to %s', courseNumber, targetCourseNumber);
        this.fetchDetailedData(targetCourseNumber, targetSubtitle);
      }
    }

    if (data !== prevProps.data) {
      const thisLecture = data.lectures.find(lecture =>
        isSameLecture(lecture, { division, term, year })
      );
      if (data.lectures && data.lectures.length > 0 && !thisLecture) {
        this.redirectTo(
          this.getAnotherLectureURL(
            targetCourseNumber,
            targetSubtitle,
            data.lectures[0]
          )
        );
      }
    }
  }

  public getRouteState() {
    const { location, match } = this.props;
    const { year, term, courseNumber, division = '' } = match.params;
    const subtitle = new URLSearchParams(location.search).get('subtitle') || '';
    return {
      courseNumber,
      division,
      subtitle,
      term,
      year: Number(year),
    };
  }

  public fetchDetailedData(courseNumber: string, subtitle: string) {
    const {
      onFetchDetailRequest,
      onFetchDetailSuccess,
      onFetchDetailFailure,
    } = this.props;

    onFetchDetailRequest();
    fetch(`${API_URL}/course/${courseNumber}?subtitle=${subtitle}`)
      .then(r => r.json())
      .then(json => {
        // There should not be another request
        onFetchDetailSuccess(json);
      })
      .catch(e => {
        console.error(e);
        onFetchDetailFailure(e);
      });
  }

  public getAnotherLectureURL = (
    courseNumber: string,
    subtitle: string,
    lecture: ILectureKeys
  ) => {
    const [basePath] = this.props.match.url.split('/courses/d/');
    const paramPath = `${lecture.year}/${lecture.term}/${courseNumber}/${
      lecture.division
    }?subtitle=${subtitle}`;
    return `${basePath}/courses/d/${paramPath}`;
  };

  public gotoAnotherDetail = (url: string) => {
    this.props.push(url, { modalDetail: true });
  };

  public redirectTo = (url: string) => {
    this.props.replace(url, { modalDetail: true });
  };

  public handleLectureCardClick = (lecture: ILectureDetail) => () => {
    const { courseNumber, subtitle } = this.getRouteState();
    this.redirectTo(this.getAnotherLectureURL(courseNumber, subtitle, lecture));
    // this.props.onChangeLecture(lecture);
  };

  public handlePeerCourseClick = (courseNumber: string, subtitle: string) => {
    // TODO:: goBack 핸들링을 아직 구현 안해서 그냥 redirect로 대체
    console.log('Clicked %s<%s>', courseNumber, subtitle);
    this.redirectTo(
      this.getAnotherLectureURL(courseNumber, subtitle, {
        division: '',
        term: 'term',
        year: 123,
      })
    );
    // this.props.onChangeCourse({ subtitle, number: courseNumber });
  };

  public handlePinClick = () => {
    if (!this.props.data) {
      return;
    }

    const { course, lectures } = this.props.data;

    const latestYear = lectures[0].year;
    const latestTerm = lectures[0].term;
    // TODO:: data conversion은 서버에 맡겨야 할 텐데..
    const datum = {
      ...course,
      courseName: course.name,
      lectures: lectures
        .filter(
          lecture => lecture.year === latestYear && lecture.term === latestTerm
        )
        .map(lecture => ({
          classTime: lecture.classTime,
          division: lecture.division,
          grades: 3,
          limit: null,
          load: lecture.spendTime || '< 1',
          professor: lecture.professor,
        })),
    };

    if (!this.props.pinnedList[buildCourseKey(datum)]) {
      this.props.onPinnedCourse(datum);
      pinCourse(datum).then(response => {
        if (!response.success) {
          console.error('Failed to update pin', datum);
        }
      });
    } else {
      this.props.onUnpinCourse(datum);
      unpinCourse(datum).then(response => {
        if (!response.success) {
          console.error('Failed to update pin', datum);
        }
      });
    }
  };

  public render() {
    const customClass = this.props.classes;

    const { data, fetching, pinnedList } = this.props;
    const { division, year, term } = this.getRouteState();
    if (fetching) {
      return <>Fetching data</>;
    }

    if (!data || !data.course) {
      return <>NO DATA</>;
    }

    const course = data.course;
    const thisLecture = data.lectures.find(lecture =>
      isSameLecture(lecture, { division, term, year })
    );

    if (!thisLecture) {
      return <>REDIRECTING</>;
    }

    let globalMax = 0;
    const maxArray = data.lectures.map(
      lecture => (lecture.grades ? d3Array.max(lecture.grades) : undefined)
    );

    if (maxArray) {
      globalMax =
        d3Array.max(maxArray.filter(d => d !== undefined) as number[]) || 0;
    }

    const latestSemester = {
      term: data.lectures[0].term,
      year: data.lectures[0].year,
    };

    const isUpcomingCourse =
      latestSemester.year === 2018 && latestSemester.term === 'Fall';

    return (
      <div className="courseDetail">
        <Paper className={classes.paperCutting} elevation={4}>
          <Card className={classes.courseDetailCard}>
            {/* title for detail page(top of pop-up) */}
            <CardContent className={classes.detailCardTitle}>
              {/* left shifting */}
              <div className={classes.stickLeft}>
                <Typography component="p">
                  {/*<span>opera......</span>*/}
                </Typography>
              </div>
              {/* title */}
              <Typography
                className={classes.typoMiddleAlign}
                variant="headline"
                component="h3"
              >
                {course.name}
              </Typography>
              {/* right shifting */}
              <div className={classes.stickRight}>
                <Typography component="p">
                  {/*<span>Intoduction of.....</span>*/}
                </Typography>
              </div>
            </CardContent>

            <div>
              {/* course description title, reccommandation, pinned */}
              <Typography
                variant="headline"
                component="h3"
                style={{
                  display: 'flex',
                  padding: '12px 0px 12px 12px',
                  textAlign: 'left',
                }}
              >
                <div className={classes.sectionTitle}>
                  <Icon className={classes.labelIcon}>label</Icon>
                  Course Decription
                </div>
                {/* recommandation or student status */}
                <div
                  style={{
                    textAlign: 'right',
                    verticalAlign: 'bottom',
                    width: '40%',
                  }}
                >
                  {data.taken_lecture !== null ? (
                    <StatusChip label="already taken" />
                  ) : (
                    <Button
                      variant="raised"
                      color="default"
                      className={customClass.buttonPin}
                      onClick={this.handlePinClick}
                    >
                      {pinnedList[buildCourseKey(course)] ? 'Unpin' : 'Pin'}
                      <Icon className={customClass.pinIcon}>
                        {pinnedList[buildCourseKey(course)]
                          ? 'turned_in'
                          : 'turned_in_not'}
                      </Icon>
                    </Button>
                  )}
                  {/*<StatusChip*/}
                  {/*label="recommanded"*/}
                  {/*className={customClass.chipRcm}*/}
                  {/*/>*/}
                  {/* check pinnind or not */}
                </div>
              </Typography>
            </div>
            {/* 가장 최근 학기에 강의를 개설한 교수님들 */}
            <Typography
              variant="caption"
              style={{ display: 'flex', marginLeft: 24 }}
            >
              Lecturer of the {isUpcomingCourse ? 'upcoming' : 'latest'}
              &nbsp;semester ({latestSemester.year} {latestSemester.term})
            </Typography>
            <div className={classes.profSelect}>
              {data.lectures
                .concat()
                .filter(
                  lecture =>
                    lecture.year === latestSemester.year &&
                    lecture.term === latestSemester.term
                )
                .sort((a: ILectureDetail, b: ILectureDetail) =>
                  d3Array.ascending(a.division, b.division)
                )
                .map((lecture: ILectureDetail) => (
                  <Chip
                    key={lecture.division}
                    className={classNames({
                      [customClass.card]: true,
                      [customClass.selectedCard]: isSameLecture(
                        lecture,
                        thisLecture
                      ),
                    })}
                    label={`${lecture.professor} ${
                      lecture.division !== '' ? `(${lecture.division})` : ''
                    }`}
                    onClick={this.handleLectureCardClick(lecture)}
                  />
                ))}
            </div>
            {/* give detail information with table */}
            <div className={classes.tableContainer}>
              <Table
                style={{
                  margin: '0px 24px',
                  padding: '4px 12px',
                  width: 'auto',
                }}
                className={classes.descriptionTable}
              >
                <TableBody>
                  <CustomTableRow>
                    <CustomTableCellD>
                      School of computing<br />
                      {course.courseType}
                    </CustomTableCellD>
                    <CustomTableCellD>
                      {([] as React.ReactNode[])
                        .concat(
                          ...thisLecture.classTime.map(classTime => [
                            <br key={1} />,
                            `${classTime.timeType} ${classTime.day} ${
                              classTime.startTime
                            } ${classTime.endTime}`,
                          ])
                        )
                        .slice(1)}
                    </CustomTableCellD>
                    <CustomTableCellD>
                      Course Number: {course.courseNumber} <br />Course Code:{' '}
                      {course.code}
                    </CustomTableCellD>
                    <CustomTableCellD
                      style={{
                        borderBottom: '1px solid rgba(224, 224, 224, 1)',
                        borderWidth: 0,
                      }}
                    >
                      <br />More information
                    </CustomTableCellD>
                    <CustomTableCellD style={{ width: '3%' }} />
                  </CustomTableRow>
                </TableBody>
              </Table>
            </div>
            {/* section title "The subjects" */}
            <Typography
              variant="headline"
              component="h3"
              style={{
                display: 'flex',
                padding: '12px 0px 12px 12px',
                textAlign: 'left',
              }}
            >
              <div className={classes.sectionTitle}>
                <Icon className={classes.labelIcon}>label</Icon>
                The subjects that other students have taken
              </div>
            </Typography>
            {/* sanky graph with related courses */}
            <CardContent
              className={customClass.graphCard}
              style={{ padding: 0 }}
            >
              <div className={classes.besideSankyGraph}>
                <div className={classes.courseStepContainer}>
                  <Chip
                    label="before"
                    className={classes.courseStep}
                    avatar={
                      <Avatar className={classes.courseStepAva}>
                        <Icon>keyboard_arrow_left</Icon>
                      </Avatar>
                    }
                  />
                </div>
                <Paper>
                  <List
                    component="nav"
                    style={{ paddingBottom: 0 }}
                    subheader={
                      <ListSubheader
                        component="div"
                        style={{
                          backgroundColor: '#E8EAF6',
                          height: 12,
                          position: 'relative',
                        }}
                      >
                        {/* */}
                      </ListSubheader>
                    }
                  >
                    {/* TODO:: Prerequisite by college -> star_rate */}
                    {data.before
                      .filter(peerCourse => peerCourse[3] >= 5)
                      .map(
                        ([courseNumber, courseName, subtitle, percentage]) => (
                          <PeerCourseListItem
                            key={courseNumber}
                            className={customClass.listItems}
                            courseName={courseName}
                            courseNumber={courseNumber}
                            icon="equalizer"
                            onClick={this.handlePeerCourseClick}
                            subtitle={subtitle}
                            percentage={percentage}
                          />
                        )
                      )}
                    {/* TODO:: Prerequisite done -> done */}
                  </List>
                </Paper>
              </div>
              {/*<CardMedia className={classes.sankyGraphDiv}>*/}
              {/*<img*/}
              {/*style={{ maxHeight: '30vh' }}*/}
              {/*src={*/}
              {/*'https://csaladenes.files.wordpress.com/2014/11/clipboard01.png?w=720&h=488'*/}
              {/*}*/}
              {/*/>*/}
              {/*</CardMedia>*/}
              <div className={classes.besideSankyGraph}>
                <div className={classes.courseStepContainer}>
                  <Chip
                    label="with"
                    className={classes.courseStep}
                    avatar={
                      <Avatar className={classes.courseStepAva}>
                        <Icon>keyboard_arrow_down</Icon>
                      </Avatar>
                    }
                  />
                </div>
                <Paper>
                  <List
                    component="nav"
                    subheader={
                      <RcmSubHeader
                        component="div"
                        style={{
                          backgroundColor: '#E8EAF6',
                          height: 12,
                          padding: '0px 24px',
                          position: 'relative',
                        }}
                      >
                        {/* */}
                      </RcmSubHeader>
                    }
                  >
                    {data.with.map(
                      ([courseNumber, courseName, subtitle, percentage]) => (
                        <PeerCourseListItem
                          key={courseName}
                          className={customClass.listItems}
                          courseName={courseName}
                          courseNumber={courseNumber}
                          icon="equalizer"
                          onClick={this.handlePeerCourseClick}
                          subtitle={subtitle}
                          percentage={percentage}
                        />
                      )
                    )}
                    {/* TODO:: Taken with done -> done */}
                  </List>
                </Paper>
              </div>
              <div className={classes.besideSankyGraph}>
                <div className={classes.courseStepContainer}>
                  <Chip
                    label="after"
                    className={classes.courseStep}
                    avatar={
                      <Avatar className={classes.courseStepAva}>
                        <Icon>keyboard_arrow_right</Icon>
                      </Avatar>
                    }
                  />
                </div>
                <Paper>
                  <List
                    component="nav"
                    subheader={
                      <RcmSubHeader
                        component="div"
                        style={{
                          backgroundColor: '#E8EAF6',
                          height: 12,
                          padding: '0px 24px',
                          position: 'relative',
                        }}
                      >
                        {/* */}
                      </RcmSubHeader>
                    }
                  >
                    {data.after.map(
                      ([courseNumber, courseName, subtitle, percentage]) => (
                        <PeerCourseListItem
                          key={courseName}
                          className={customClass.listItems}
                          courseName={courseName}
                          courseNumber={courseNumber}
                          icon="equalizer"
                          onClick={this.handlePeerCourseClick}
                          subtitle={subtitle}
                          percentage={percentage}
                        />
                      )
                    )}
                    {/* TODO:: Taken with done -> done */}
                  </List>
                </Paper>
              </div>
            </CardContent>
            {/* information for each semester with professor */}
            <Typography
              variant="headline"
              component="h3"
              style={{
                display: 'flex',
                padding: '12px 0px 12px 12px',
                textAlign: 'left',
              }}
            >
              <div className={classes.sectionTitle}>
                <Icon className={classes.labelIcon}>label</Icon>
                Lecture history
              </div>
            </Typography>
            <CardContent className={classes.profContainer}>
              {d3Coll
                .nest()
                .key((d: ILectureDetail) => String(d.year))
                .sortKeys(d3Array.descending)
                .key((d: ILectureDetail) => d.term)
                .sortKeys(d3Array.ascending)
                .entries(data.lectures)
                .filter(yearEntry => yearEntry.key !== '2018')
                .map(lecturesInYear =>
                  lecturesInYear.values.map(
                    (lecturesInTerm: {
                      key: string;
                      values: ILectureDetail[];
                    }) => (
                      <div
                        key={lecturesInYear.key + lecturesInTerm.key}
                        className={classes.semesterDiv}
                      >
                        <Chip
                          className={classes.historyStep}
                          label={lecturesInYear.key + ' ' + lecturesInTerm.key}
                        >
                          {lecturesInYear.key} {lecturesInTerm.key}
                        </Chip>
                        {lecturesInTerm.values
                          .concat()
                          .sort((a: ILectureDetail, b: ILectureDetail) =>
                            d3Array.ascending(a.division, b.division)
                          )
                          .map((lecture: ILectureDetail) => (
                            <Card
                              key={lecture.division}
                              className={customClass.historyCard}
                              style={{ marginTop: 32 }}
                            >
                              <ProfCardContent>
                                <Typography
                                  variant="subheading"
                                  component="h3"
                                  align="left"
                                >
                                  {`${lecture.professor} ${
                                    lecture.division !== ''
                                      ? `(${lecture.division})`
                                      : ''
                                  }`}
                                </Typography>
                                <Typography component="p" align="left">
                                  Load: {lecture.spendTime}/ Grade:{' '}
                                  {lecture.averageGrade}
                                </Typography>
                              </ProfCardContent>
                              {lecture.grades ? (
                                <GradeChart
                                  width={200}
                                  height={130}
                                  globalMax={globalMax}
                                  grades={lecture.grades}
                                />
                              ) : (
                                'NO DATA'
                              )}
                            </Card>
                          ))}
                      </div>
                    )
                  )
                )}
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  ...state.courseDetail,
  pinnedList: state.pinnedList,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onInitDetail: detailActions.initDetail,

      onChangeCourse: detailActions.changeCourse,
      onChangeLecture: detailActions.changeLecture,

      onFetchDetailRequest: detailActions.fetchDetailRequest,

      onFetchDetailSuccess: detailActions.fetchDetailSuccess,

      onFetchDetailFailure: detailActions.fetchDetailFailure,

      onPinnedCourse: actions.pinCourse,
      onUnpinCourse: actions.unpinCourse,

      push,
      replace,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(themeStyle)(Detail)
);
