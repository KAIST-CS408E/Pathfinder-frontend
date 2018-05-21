import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import * as classNames from 'classnames';
import * as d3Array from 'd3-array';
import * as d3Coll from 'd3-collection';

import Card from '@material-ui/core/Card';
import CardContent, { CardContentProps } from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Chip, { ChipProps } from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';

import List from '@material-ui/core/List';
import ListItem /*, {ListItemProps}*/ from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText, {
  ListItemTextProps,
} from '@material-ui/core/ListItemText';
import ListSubheader, {
  ListSubheaderProps,
} from 'material-ui/List/ListSubheader';

import withStyles, { WithStyles } from 'material-ui/es/styles/withStyles';
import styles from './Detail.style';

const { classes } = styles;

const ourKaistBlue = '#E3F2FD';
const recommendColor = '#FFC107';
const lightGrey1 = '#f5f5f5';

const doFirst = ' !important';
/* 로드, 그레이드 난수 함수! 실제 구현시에는 반드시 지울것 */
function gradeGen() {
  const factor = Math.pow(10, 2);
  return Math.round(Math.random() * 4 * factor) / factor;
}

const CustomTableCellD = withStyles(theme => ({
  root: {
    borderBottom: '0px' + doFirst,
    borderRight: '1px solid ' + ourKaistBlue,
    padding: '4px 0px 4px 12px !important',
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

const RcmListItemText = withStyles(theme => ({
  primary: {
    fontSize: '0.875em' + doFirst,
  },
}))(ListItemText as React.ComponentType<
  ListItemTextProps & WithStyles<'primary'>
>);

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
    backgroundColor: '#f5f5f5',
    display: 'flex',
    padding: 0,
  },

  listItems: {
    padding: '8px 18px' + doFirst,
  },

  iconOfList: {
    fontSize: 20,
    marginRight: 0,
  },

  card: {
    marginLeft: '1rem',
    marginTop: '1rem',
    maxWidth: 345,
  },
  media: {
    border: '1px solid ' + ourKaistBlue,
    height: 0,
    paddingTop: '56.25%', // 16:9
  },

  selectedCard: {
    border: '1px solid black',
    borderRadius: 4,
  },
});

interface ICourseDetail {
  course: ICourseBasic;
  lectures: ILectureDetail[];
  before: PeerCourse[];
  with: PeerCourse[];
  after: PeerCourse[];
}

interface ICourseBasic {
  number: string;
  code: string;
  subtitle: string;
  name: string;
  type: string;
}

interface ILectureKeys {
  year: string;
  term: string;
  division: string;
}

interface ILectureDetail extends ILectureKeys {
  // division: string;
  competitionRatio: '-';
  sizeChange: string[];
  professor: string;
  // year: string;
  // name: string;
  // term: string;
  grade: string[];
  dropChange: string[];
  classTime: string[];
  isEnglish: string;
}

function isSameLecture(a: ILectureKeys, b: ILectureKeys) {
  return a.year === b.year && a.term === b.term && a.division === b.division;
}

/* CourseNumber CourseName NumOfTaken */
type PeerCourse = [string, string, number];

export interface ICourseQuery {
  year: string;
  term: string;
  division: string;
  courseNumber: string;
}

export interface IProps extends RouteComponentProps<ICourseQuery> {}

export interface IState {
  /* number / division을 data 필요 여부에 대한 key로 사용함 
  *  year / term은 param에서 가져옴*/
  year: string;
  term: string;
  division: string;
  courseNumber: string;
  subtitle: string;

  data: ICourseDetail | null;
  fetching: boolean;
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
      | 'media'
      | 'typo'
      | 'selectedCard'
    >,
  IState
> {
  public static getDerivedStateFromProps(nextProps: IProps, prevState: IState) {
    const { year, term, courseNumber, division } = nextProps.match.params;

    return {
      term,
      year,

      courseNumber,
      division: division ? division : '',
      subtitle:
        new URLSearchParams(nextProps.location.search).get('subtitle') || '',
    };
  }

  public lastFetchId = 0;
  public division = '';
  public number = '';

  constructor(props: any) {
    super(props);
    this.state = {
      courseNumber: '',
      division: '',

      subtitle: '',
      term: '',
      year: '',

      data: null,
      fetching: false,
    };
  }

  public componentDidMount() {
    this.fetchDetailedData();
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const { courseNumber } = prevState;
    if (courseNumber !== this.state.courseNumber) {
      this.fetchDetailedData();
    }
  }

  public fetchDetailedData() {
    this.lastFetchId += 1;
    const oldFetchId = this.lastFetchId;
    // TODO:: Need to bring subtitle from somewhere!
    const { courseNumber, subtitle } = this.state;
    fetch(
      `https://ny3acklsf2.execute-api.ap-northeast-2.amazonaws.com/api/course/${courseNumber}?subtitle=${subtitle}`
    )
      .then(r => r.json())
      .then(json => {
        // There should not be another request
        if (oldFetchId === this.lastFetchId) {
          this.setState({ data: json, fetching: false });
        }
      })
      .catch(e => console.error(e));

    if (!this.state.fetching) {
      this.setState({ fetching: true });
    }
  }

  public handleLectureCardClick = (lecture: ILectureDetail) => () => {
    const { courseNumber, subtitle } = this.state;
    const [basePath] = this.props.match.url.split('/courses/d/');
    const paramPath = `${lecture.year}/${lecture.term}/${courseNumber}/${
      lecture.division
    }?subtitle=${subtitle}`;
    this.props.history.replace(`${basePath}/courses/d/${paramPath}`, { modalDetail: true });
  };

  public render() {
    const customClass = this.props.classes;

    const { division, data, year, term } = this.state;

    if (!data || !data.course) {
      return <>NO DATA</>;
    }

    const course = data.course;
    const thisLecture = data.lectures.find(lecture =>
      isSameLecture(lecture, { division, term, year })
    );

    /* Redirect if no division is chosen even if there is lecture data */
    if (!thisLecture && data.lectures && data.lectures.length > 0) {
      const divisionPathPosition = this.props.match.params.division
        ? -1
        : undefined;

      return (
        <Redirect
          to={this.props.match.url
            .split('/')
            .slice(0, divisionPathPosition)
            .concat(data.lectures[0].division)
            .join('/')}
        />
      );
    } else if (!thisLecture) {
      console.error('No lecture data found!');
      return <>NO LECTURE DATA</>;
    }

    return (
      <div className="courseDetail">
        <Paper className={classes.paperCutting} elevation={4}>
          <Card className={classes.courseDetailCard}>
            {/* title for detail page(top of pop-up) */}
            <CardContent className={classes.detailCardTitle}>
              {/* left shifting */}
              <div className={classes.stickLeft}>
                <Typography component="p">
                  <span>opera......</span>
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
                <Typography component="p">Intoduction of.....</Typography>
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
                <div style={{ width: '60%' }}>
                  Course Decription
                  <span style={{ fontSize: '0.7em' }}>(Syllabus)</span>
                </div>
                {/* recommandation or student status */}
                <div
                  style={{
                    textAlign: 'right',
                    verticalAlign: 'bottom',
                    width: '40%',
                  }}
                >
                  <StatusChip label="attended" />
                  <StatusChip
                    label="recommanded"
                    className={customClass.chipRcm}
                  />
                  {/* check pinnind or not */}
                  <Button
                    variant="raised"
                    color="default"
                    className={customClass.buttonPin}
                  >
                    Pin
                    <Icon className={customClass.pinIcon}>
                      turned_in_not
                    </Icon>{' '}
                  </Button>
                  {/* turned_in 은 꽉찬 깃발, turned_in_not을 입력하면 빗 깃발 출력 */}
                </div>
              </Typography>
            </div>
            {/* give detail information with table */}
            <div className={classes.tableContainer}>
              <Table style={{ marginRight: 100 }}>
                <TableBody>
                  <CustomTableRow>
                    <CustomTableCellD>
                      School of computing<br />
                      {course.type}
                    </CustomTableCellD>
                    <CustomTableCellD>
                      {thisLecture.classTime.map(text => (
                        <span key={text}>
                          {' '}
                          {text}
                          <br />
                        </span>
                      ))}
                      {/*Tue: 10:30-12:00<br />Tue: 10:30-12:00*/}
                    </CustomTableCellD>
                    <CustomTableCellD>
                      Course Number: {course.number} <br />Course Code:{' '}
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
            {/* sanky graph with related courses */}
            <CardContent
              className={customClass.graphCard}
              style={{ padding: 0 }}
            >
              <div className={classes.besideSankyGraph}>
                <List
                  component="nav"
                  subheader={
                    <ListSubheader
                      component="div"
                      style={{
                        backgroundColor: lightGrey1,
                        position: 'relative',
                      }}
                    >
                      Prerequisites
                    </ListSubheader>
                  }
                >
                  {/* TODO:: Prerequisite by college -> star_rate */}
                  {data.before.map(([courseNumber, courseName]) => (
                    <PeerCourseItem
                      key={courseNumber}
                      className={customClass.listItems}
                      courseName={courseName}
                      icon="equalizer"
                    />
                  ))}
                  {/* TODO:: Prerequisite done -> done */}
                </List>
              </div>
              <CardMedia className={classes.sankyGraphDiv}>
                <img
                  style={{ maxHeight: '30vh' }}
                  src={
                    'https://csaladenes.files.wordpress.com/2014/11/clipboard01.png?w=720&h=488'
                  }
                />
              </CardMedia>
              <div className={classes.besideSankyGraph}>
                <List
                  component="nav"
                  subheader={
                    <RcmSubHeader
                      component="div"
                      style={{
                        backgroundColor: lightGrey1,
                        position: 'relative',
                      }}
                    >
                      Other students takes<br />
                      <strong>Operation systems and labs</strong> with...
                    </RcmSubHeader>
                  }
                >
                  {data.with.map(([courseNumber, courseName]) => (
                    <PeerCourseItem
                      key={courseName}
                      className={customClass.listItems}
                      courseName={courseName}
                      icon="equalizer"
                    />
                  ))}
                  {/* TODO:: Taken with done -> done */}
                </List>
              </div>
            </CardContent>

            {/* information for each semester with professor */}
            <CardContent className={classes.profContainer}>
              {d3Coll
                .nest()
                .key((d: ILectureDetail) => d.year)
                .sortKeys(d3Array.descending)
                .key((d: ILectureDetail) => d.term)
                .sortKeys(d3Array.ascending)
                .entries(data.lectures)
                .map(lecturesInYear =>
                  lecturesInYear.values.map(
                    (lecturesInTerm: {
                      key: string;
                      values: ILectureDetail[];
                    }) => (
                      <div key={lecturesInYear.key} className={classes.testDiv}>
                        <Typography
                          gutterBottom
                          variant="subheading"
                          component="h3"
                          align="left"
                          className={classes.semesterTypo}
                        >
                          {lecturesInYear.key} {lecturesInTerm.key}
                        </Typography>
                        {lecturesInTerm.values
                          .concat()
                          .sort((a: ILectureDetail, b: ILectureDetail) =>
                            d3Array.ascending(a.division, b.division)
                          )
                          .map((lecture: ILectureDetail) => (
                            <Card
                              key={lecture.division}
                              className={classNames({
                                [customClass.card]: true,
                                [customClass.selectedCard]: isSameLecture(
                                  lecture,
                                  thisLecture
                                ),
                              })}
                              onClick={this.handleLectureCardClick(lecture)}
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
                                  Load: {gradeGen()}/ Grade: {gradeGen()}
                                </Typography>
                              </ProfCardContent>
                              <CardMedia
                                className={customClass.media}
                                image="https://www.mathsisfun.com/data/images/histogram.gif"
                              />
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

export default withStyles(themeStyle)(Detail);

interface IPeerCourseItemProps {
  className: string;
  courseName: string;
  icon: string;
}

const PeerCourseItem = ({
  className,
  courseName,
  icon,
}: IPeerCourseItemProps) => (
  <ListItem button className={className}>
    <ListItemIcon>
      <Icon style={{ fontSize: 18, marginRight: 0 }}>{icon}</Icon>
    </ListItemIcon>
    <RcmListItemText inset>{courseName}</RcmListItemText>
  </ListItem>
);
