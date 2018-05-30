import * as React from 'react';

import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';

import {
  Chip,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableHead,
  Typography,
} from '@material-ui/core';

import { ICourse, INewCourse, SpentTime } from 'pathfinder';
import * as ReactTooltip from 'react-tooltip';

import { convertSpentTime, convertSpentTimeToReadable } from '@src/utils';

// import ClassTime from './ClassTime';

const ourKaistBlue = '#E3F2FD';
const ourKaistBlueD = '#1A237E';

const CustomTableRow = withStyles(theme => ({
  root: {
    height: 32,
  },
}))(TableRow as React.ComponentType<TableRowProps & WithStyles<'root'>>);

const CustomTableCell = withStyles(theme => ({
  body: {
    border: ourKaistBlue,
    fontSize: 14,
    height: 32,

    '&:nth-child(1)': {
      color: '#008bff',
    },
    padding: '0px 0px 0px 12px',
  },
  head: {
    backgroundColor: ourKaistBlue,
    border: ourKaistBlue,
    color: theme.palette.common.white,
  },
  numeric: {
    border: ourKaistBlue,
    paddingRight: 0,
  },

  root: {
    border: ourKaistBlue,
    padding: 0,
  },
}))(TableCell as React.ComponentType<
  TableCellProps & WithStyles<'body' | 'head' | 'numeric'>
>);

const styles = (theme: Theme) => ({
  root: {
    width: '100%',

    border: ourKaistBlue,
    marginBottom: theme.spacing.unit * 2,
    overflowX: 'auto' as 'auto',
  },

  head: {
    color: ourKaistBlueD,
    fontSize: 14,
  },

  table: {
    minWidth: 700,
  },

  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
      border: ourKaistBlue,
      // padding: theme.spacing.unit.valueOf()[1],
      height: 36,
    },

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.07)',
      transition: 'background-color 300ms ease-in-out',
    },
  },

  typo: {
    display: 'flex' as 'flex',
    justifyContent: 'space-between' as 'space-between',

    backgroundColor: ourKaistBlue,
    color: ourKaistBlueD,
    height: 20,
    textAlign: 'left' as 'left',

    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit,
  },

  btn: {
    height: 24,
    width: 24,
  },

  title: {
    fontSize: 16,
  },

  levelBar: {
    display: 'flex',
    height: 34,
    margin: '1px 10px 1px 0px',
  },

  levelBlock: {
    backgroundColor: '#BDBDBD',
    color: 'white',
    fontSize: 14,
    textAlign: "right" as "right",

    height: 16,
    width: 20,

    margin: 1,
    marginTop: 8,

    '& span': {
    },

  },

  levelUnit: {
    // level bar
    color: "#BDBDBD",
    fontWeigth: 500,
    marginRight: 0,
    padding: 8,
    paddingLeft: 0,
  },

  statNum: {
    color: ourKaistBlueD,
    fontSize: 15,
    margin: 'auto',
    marginLeft: '4px',
  },

  timeTable: {
    height: '100%',
    width: '100%',

    '& th': {
      backgroundColor: ourKaistBlue,
      border: '1px solid rgba(0, 0, 0, 0)',
      fontSize: 0,
      padding: 0,
    },
  },

  classTimeCell: {
    backgroundColor: ourKaistBlueD + ' !important',
  },
});

interface ITableProps
  extends WithStyles<
      | 'root'
      | 'table'
      | 'row'
      | 'typo'
      | 'btn'
      | 'paddingNone'
      | 'title'
      | 'head'
      | 'timeTable'
      | 'classTimeCell'
      | 'statNum'
      | 'levelUnit'
      | 'levelBar'
      | 'levelBlock'
    > {
  course: ICourse;
  clickHandlerBuilder: ClickHandlerBuilder;
  clickPinHandlerBuilder: ClickPinHandlerBuilder;
  newCourse: boolean;
  newLecture?: INewCourse;
  pinned: boolean;
  recommended: boolean;
  taken?: boolean;
}

export type ClickHandlerBuilder = (
  course: ICourse,
  lectureIndex: number
) => ClickHandler;
export type ClickHandler = () => void;
export type ClickPinHandlerBuilder = (course: ICourse) => ClickHandler;

class CustomizedTable extends React.PureComponent<ITableProps> {
  public renderLoadTooltip = (load: string) => {
    const readable = convertSpentTimeToReadable(load as SpentTime);

    // TODO:: 2018일때만 지난 2년임
    return (
      <span>
        Students took this course over past 2 years <br />
        responded that it usually took &nbsp;
        <b>{readable}</b>&nbsp; a week
      </span>
    );
  };

  public renderGradeTooltip = (grade: string) => {
    return (
      <span>
        Students took this course over past 2 years <br />
        got the average grade of <b>{grade} of 4.3</b>
      </span>
    );
  };

  public render() {
    const {
      classes,
      course,
      clickHandlerBuilder,
      clickPinHandlerBuilder,
      newCourse,
      newLecture,
      pinned,
      recommended,
      taken,
    } = this.props;
    const { lectures } = course;

    return (
      <Paper className={classes.root}>
        <ReactTooltip
          id="courseLoad"
          effect="solid"
          getContent={this.renderLoadTooltip}
        />
        <ReactTooltip
          id="courseGrade"
          effect="solid"
          getContent={this.renderGradeTooltip}
        />
        <div className={classes.typo}>
          <Typography
            color="inherit"
            variant="headline"
            component="h3"
            className={classes.title}
            style={{ fontWeight: 500 }}
          >
            <Chip
              label={`${course.number}`}
              style={{
                backgroundColor: ourKaistBlueD,
                color: 'white',
                fontWeight: 400,
                height: '80%',
                margin: '0px 6px 0px -3px',
                padding: '0px 0px',
              }}
            />
            {`${course.name}`}
          </Typography>
          <div>
            {newCourse ? (
              <Chip
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid',
                  borderRadius: 4,
                  height: 20,
                  marginRight: 12,
                }}
                label="NEW"
              />
            ) : null}
            {recommended ? (
              <Chip
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid',
                  borderRadius: 4,
                  height: 20,
                  marginRight: 12,
                }}
                label="RECOMMENDED"
              />
            ) : null}
            <IconButton
              className={classes.btn}
              color="inherit"
              onClick={taken ? undefined : clickPinHandlerBuilder(course)}
            >
              <Icon>
                {taken ? 'done' : pinned ? 'turned_in' : 'turned_in_not'}
              </Icon>
            </IconButton>
          </div>
        </div>
        <Table className={classes.table}>
          <TableHead>
            <CustomTableRow>
              <CustomTableCell
                style={{ paddingLeft: 16, fontWeight: 400 }}
                className={classes.head}
              >
                School of Computing
              </CustomTableCell>
              <CustomTableCell
                className={classes.head}
                style={{ fontWeight: 400 }}
              >
                Major Elective
              </CustomTableCell>
              <CustomTableCell
                className={classes.head}
                style={{ fontWeight: 400 }}
              >
                Bachelor
              </CustomTableCell>
              <CustomTableCell
                className={classes.head}
                style={{ fontWeight: 400 }}
              >
                Credit. 3:0:3
              </CustomTableCell>
              <CustomTableCell />
              <CustomTableCell />
            </CustomTableRow>
          </TableHead>
          <TableBody>
            {lectures.map((n, i) => {
              const isNewLecture = newLecture
                ? newLecture.division === n.division
                : false;
              const loadLevel = convertSpentTime(n.load);
              return (
                <CustomTableRow
                  key={i}
                  className={classes.row}
                  onClick={clickHandlerBuilder(course, i)}
                >
                  <CustomTableCell
                    component="th"
                    scope="row"
                    style={{
                      color: ourKaistBlueD,
                      overflow: 'hidden',
                      paddingLeft: 18,
                      width: '20.9%',
                    }}
                  >
                    {n.professor || 'None'}

                    {isNewLecture ? (
                      <span
                        style={{
                          borderRadius: 2,
                          color: "white",
                          fontSize: 12,
                          fontWeight: 500,
                          padding: "1px 3px",
                        }}
                      >
                        NEW
                      </span>
                    ) : null}
                  </CustomTableCell>
                  <CustomTableCell style={{ width: '14.5%' }}>
                    {n.division !== '' ? `Class. ${n.division}` : 'No Class'}
                  </CustomTableCell>
                  <CustomTableCell style={{ width: '12.5%' }}>
                    {n.limit ? `0/${n.limit}` : '∞'}
                  </CustomTableCell>
                  <CustomTableCell style={{ width: '18.8%' }}>
                    <div
                      data-for="courseLoad"
                      data-tip={n.load}
                      className={classes.levelBar}
                    >
                      <div
                        style={{
                          backgroundColor: loadLevel > 1 ? '#7986CB' : '',
                        }}
                        className={classes.levelBlock}
                      ><span>1</span></div>
                      <div
                        style={{
                          backgroundColor: loadLevel > 3 ? '#3F51B5' : '',
                        }}
                        className={classes.levelBlock}
                      ><span>3</span></div>
                      <div
                        style={{
                          backgroundColor: loadLevel > 5 ? '#303F9F' : '',
                        }}
                        className={classes.levelBlock}
                      ><span>5</span></div>
                      <div
                        style={{
                          backgroundColor: loadLevel > 7 ? '#1A237E' : '',
                        }}
                        className={classes.levelBlock}
                      ><span>7</span></div>
                      <div style={{color: loadLevel > 7 ? '#1A237E' : ''}}
                        className={classes.levelUnit}>hrs</div>
                    </div>
                  </CustomTableCell>
                  <CustomTableCell style={{ width: '16%' }}>
                    <div
                      data-for="courseGrade"
                      data-tip={n.grades}
                      className={classes.levelBar}
                    >
                      <div
                        style={{
                          background: ourKaistBlueD,
                          position: 'relative',
                          width: 64,
                        }}
                        className={classes.levelBlock}
                      >
                        <div
                          style={{
                            color: 'white',
                            marginTop: 1,
                            position: 'absolute',
                            right: 0,
                            zIndex: 1,
                          }}
                        >
                          {n.grades ? n.grades : '-.-'}
                        </div>
                        <div
                          style={{
                            margin: 0,
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            width: n.grades
                              ? 64 - 64 * (n.grades - 2.5) / 1.8
                              : 64,
                          }}
                          className={classes.levelBlock}
                        >
                          {/* width: full grade - currunt grade */}
                        </div>
                      </div>
                      <div className={classes.levelUnit}>GPA</div>
                    </div>
                  </CustomTableCell>
                  <CustomTableCell
                    numeric
                    style={{
                      borderRight: '0px solid',
                      height: 30,
                      padding: '1px 0px',
                      width: '17.4%',
                    }}
                  >
                    {/* <ClassTime classTimes={n.classTime} /> */}
                    Mon.13:00~14:30<br/>
                    Tue.13:00~14:30
                  </CustomTableCell>
                </CustomTableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(CustomizedTable);
