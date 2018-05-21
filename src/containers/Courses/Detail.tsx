import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';

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

// import { Theme } from "@material-ui/core/styles";
import withStyles, { WithStyles } from 'material-ui/es/styles/withStyles';
import styles from './Detail.style';

const { classes } = styles;

const ourKaistBlue = '#E3F2FD';
const recommendColor = '#FFC107';
const lightGrey1 = '#f5f5f5';

// const defaultBackColor = "white";
const courseR = 'System Programming';
const courseR2 = 'Network Programming';
const courseRA = 'Discrete Mathmatics';
const courseRA2 =
  'Human Centered Interface Design with ---(long long long class name)';

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

interface ILectureDetail {
  division: string;
  competitionRatio: '-';
  sizeChange: string[];
  professor: string;
  year: string;
  name: string;
  term: string;
  grade: string[];
  dropChange: string[];
  classTime: string[];
  isEnglish: string;
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
    fetch(
      `https://ny3acklsf2.execute-api.ap-northeast-2.amazonaws.com/api/course/${
        this.state.courseNumber
      }?subtitle=`
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

  public render() {
    const customClass = this.props.classes;

    const { division, data, year, term } = this.state;

    if (!data || !data.course) {
      return <>NO DATA</>;
    }

    const course = data.course;
    const thisLecture = data.lectures.find(
      lecture =>
        lecture.year === year &&
        lecture.term === term &&
        lecture.division === division
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
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>
                        star_rate
                      </Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseR} />
                  </ListItem>
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>
                        equalizer
                      </Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseRA} />
                  </ListItem>
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>
                        equalizer
                      </Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseRA2} />
                  </ListItem>
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseR} />
                  </ListItem>
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseR2} />
                  </ListItem>
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseR} />
                  </ListItem>
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseR2} />
                  </ListItem>
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
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>
                        star_rate
                      </Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseR} />
                  </ListItem>
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>
                        equalizer
                      </Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseRA} />
                  </ListItem>
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>
                        equalizer
                      </Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseRA2} />
                  </ListItem>
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseR} />
                  </ListItem>
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseR2} />
                  </ListItem>
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon>
                    </ListItemIcon>
                    <RcmListItemText inset primary={courseR} />
                  </ListItem>
                  <ListItem button className={customClass.listItems}>
                    <ListItemIcon>
                      <Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon>
                    </ListItemIcon>
                    <ListItemText inset primary={courseR2} />
                  </ListItem>
                </List>
              </div>
            </CardContent>

            {/* information for each semester with professor */}
            <CardContent className={classes.profContainer}>
              <div className={classes.testDiv}>
                <Typography
                  gutterBottom
                  variant="subheading"
                  component="h3"
                  align="left"
                  className={classes.semesterTypo}
                >
                  2018 spring
                </Typography>
                <Card className={customClass.card}>
                  <ProfCardContent>
                    <Typography
                      variant="subheading"
                      component="h3"
                      align="left"
                    >
                      Insik shin(A)
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
                <Card className={customClass.card}>
                  <ProfCardContent>
                    <Typography
                      variant="subheading"
                      component="h3"
                      align="left"
                    >
                      Junehwa Song(B)
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
              </div>
              <div className={classes.testDiv}>
                <Typography
                  gutterBottom
                  variant="subheading"
                  component="h3"
                  align="left"
                  className={classes.semesterTypo}
                >
                  2018 fall
                </Typography>
                <Card className={customClass.card}>
                  <ProfCardContent>
                    <Typography
                      variant="subheading"
                      component="h3"
                      align="left"
                    >
                      Insik shin(A)
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
              </div>
              <div className={classes.testDiv}>
                <Typography
                  gutterBottom
                  variant="subheading"
                  component="h3"
                  align="left"
                  className={classes.semesterTypo}
                >
                  2018 spring
                </Typography>
                <Card className={customClass.card}>
                  <ProfCardContent>
                    <Typography
                      variant="subheading"
                      component="h3"
                      align="left"
                    >
                      Insik shin(A)
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
                <Card className={customClass.card}>
                  <ProfCardContent>
                    <Typography
                      variant="subheading"
                      component="h3"
                      align="left"
                    >
                      Insik shin(A)
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
              </div>
              <div className={classes.testDiv}>
                <Typography
                  gutterBottom
                  variant="subheading"
                  component="h3"
                  align="left"
                  className={classes.semesterTypo}
                >
                  2018 fall
                </Typography>
                <Card className={customClass.card}>
                  <ProfCardContent>
                    <Typography
                      variant="subheading"
                      component="h3"
                      align="left"
                    >
                      Insik shin(A)
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
              </div>
              <div className={classes.testDiv}>
                <Typography
                  gutterBottom
                  variant="subheading"
                  component="h3"
                  align="left"
                  className={classes.semesterTypo}
                >
                  2018 spring
                </Typography>
                <Card className={customClass.card}>
                  <ProfCardContent>
                    <Typography
                      variant="subheading"
                      component="h3"
                      align="left"
                    >
                      Insik shin(A)
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
              </div>
              <div className={classes.testDiv}>
                <Typography
                  gutterBottom
                  variant="subheading"
                  component="h3"
                  align="left"
                  className={classes.semesterTypo}
                >
                  {2018} fall
                </Typography>
                <Card className={customClass.card}>
                  <ProfCardContent>
                    <Typography
                      variant="subheading"
                      component="h3"
                      align="left"
                    >
                      Insik shin(A)
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
              </div>
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

export default withStyles(themeStyle)(Detail);
