import * as React from 'react';

import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import Icon from '@material-ui/core/Icon';

import { ICourse, IPinnedTable, IQueryResult, TakenCourses } from 'pathfinder';
import { buildCourseKey, convertSpentTime } from '../../utils/index';

const ourKaistBlue = '#E3F2FD';
const ourKaistBlueD = '#1A237E';

interface IProps {
  data?: IQueryResult['courses'];
  pinnedList: IPinnedTable;
  takenCourses?: TakenCourses;
  onClickEntry: ClickEntryHandler;
  onClickPin: ClickPinHandler;
}

export type ClickEntryHandler = (course: ICourse, lectureIndex: number) => void;
type ClickHandlerBuilder = (
  course: ICourse,
  lectureIndex: number
) => ClickHandler;
type ClickHandler = () => void;

export type ClickPinHandler = (course: ICourse) => void;
type ClickPinHandlerBuilder = (course: ICourse) => ClickHandler;

export default class SearchList extends React.PureComponent<IProps> {
  public handleClickEntry: ClickHandlerBuilder = (course, index) => () => {
    const { onClickEntry } = this.props;

    if (onClickEntry) {
      onClickEntry(course, index);
    }
  };

  public handleClickPin: ClickPinHandlerBuilder = course => () => {
    const { onClickPin } = this.props;
    if (onClickPin) {
      onClickPin(course);
    }
  };

  public render() {
    const { data, pinnedList, takenCourses } = this.props;

    let renderData: JSX.Element | JSX.Element[] = (
      <span>{'Sorry! nothing to show... perhaps broken API again?'}</span>
    );

    if (data && takenCourses) {
      renderData = data.map(course => (
        <ListItem
          clickHandlerBuilder={this.handleClickEntry}
          clickPinHandlerBuilder={this.handleClickPin}
          course={course}
          key={course.number + course.lectures[0].division}
          taken={takenCourses.some(
            courseArr =>
              courseArr[0] === course.number && courseArr[1] === course.subtitle
          )}
          pinned={Boolean(
            pinnedList[
              buildCourseKey({
                courseNumber: course.number,
                subtitle: course.subtitle,
              })
            ]
          )}
        />
      ));
    }

    return <div className="list">{renderData}</div>;
  }
}

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
    fontSize: 8,
    height: 16,
    width: 16,

    margin: 1,
    marginTop: 8,
  },

  levelTitle: {
    // level bar
    color: ourKaistBlueD,
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
      | 'levelTitle'
      | 'levelBar'
      | 'levelBlock'
    > {
  course: ICourse;
  clickHandlerBuilder: ClickHandlerBuilder;
  clickPinHandlerBuilder: ClickPinHandlerBuilder;
  pinned: boolean;
  taken?: boolean;
}

function CustomizedTable(props: ITableProps) {
  const {
    classes,
    course,
    clickHandlerBuilder,
    clickPinHandlerBuilder,
    pinned,
    taken,
  } = props;
  const { lectures } = course;

  return (
    <Paper className={classes.root}>
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
        <IconButton
          className={classes.btn}
          color="inherit"
          onClick={taken ? undefined : clickPinHandlerBuilder(course)}
        >
          <Icon>{taken ? 'done' : pinned ? 'turned_in' : 'turned_in_not'}</Icon>
        </IconButton>
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
                    width: "20.9%",
                  }}
                >
                  {`Prof. ${n.professor || 'None'}`}
                </CustomTableCell>
                <CustomTableCell style={{ width: "14.5%" }}>
                  {n.division !== '' ? `Class. ${n.division}` : 'No Class'}
                </CustomTableCell>
                <CustomTableCell style={{ width: "12.5%" }}>
                  {n.limit ? `0/${n.limit}` : '∞'}
                </CustomTableCell>
                <CustomTableCell style={{ width: "18.8%"}}>
                  <div className={classes.levelBar}>
                    <div className={classes.levelTitle}>Load: </div>
                    <div
                      style={{
                        backgroundColor: loadLevel > 1 ? '#7986CB' : '',
                      }}
                      className={classes.levelBlock}
                    >{`1hr`}</div>
                    <div
                      style={{
                        backgroundColor: loadLevel > 3 ? '#3F51B5' : '',
                      }}
                      className={classes.levelBlock}
                    >{`3hr`}</div>
                    <div
                      style={{
                        backgroundColor: loadLevel > 5 ? '#303F9F' : '',
                      }}
                      className={classes.levelBlock}
                    >{`5hr`}</div>
                    <div
                      style={{
                        backgroundColor: loadLevel > 7 ? '#1A237E' : '',
                      }}
                      className={classes.levelBlock}
                    >{`7hr`}</div>
                    <div
                      className={classes.statNum}
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        marginLeft: 0,
                        paddingBottom: 1,
                      }}
                    >
                      {n.load}
                    </div>
                  </div>
                </CustomTableCell>
                <CustomTableCell style={{ width: "16%"}}>
                  <div className={classes.levelBar}>
                    <div className={classes.levelTitle}>Grade: </div>
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
                          zIndex: 10,
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
                  </div>
                </CustomTableCell>
                <CustomTableCell numeric style={{ border: "1px solid " + ourKaistBlue, borderRight: "0px solid",  padding:"1px 0px", height: 30, width:"17.4%" }}>
                  <Tooltip id="tooltip-icon" title={n.classTime} placement="bottom">
                    <table className={classes.timeTable}>
                      <tr>
                        <th className={classes.classTimeCell}>-</th> <th>-</th>{' '}
                        <th className={classes.classTimeCell}>-</th> <th>-</th>{' '}
                        <th>-</th>
                      </tr>
                      <tr>
                        <th>-</th> <th>-</th> <th>-</th> <th>-</th> <th>-</th>
                      </tr>
                      <tr>
                        <th>-</th> <th>-</th> <th>-</th> <th>-</th> <th>-</th>
                      </tr>
                      <tr>
                        <th>-</th> <th>-</th> <th>-</th> <th>-</th> <th>-</th>
                      </tr>
                      <tr>
                        <th>-</th> <th>-</th> <th>-</th> <th>-</th> <th>-</th>
                      </tr>
                      <tr>
                        <th>-</th> <th>-</th> <th>-</th> <th>-</th> <th>-</th>
                      </tr>
                    </table>
                  </Tooltip>
                </CustomTableCell>
              </CustomTableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

const ListItem = withStyles(styles)(CustomizedTable);
