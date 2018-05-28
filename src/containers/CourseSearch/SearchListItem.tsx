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

import { ICourse } from 'pathfinder';

import { convertSpentTime } from '@src/utils';

import ClassTime from './ClassTime';

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

export type ClickHandlerBuilder = (
  course: ICourse,
  lectureIndex: number
) => ClickHandler;
export type ClickHandler = () => void;
export type ClickPinHandlerBuilder = (course: ICourse) => ClickHandler;

class CustomizedTable extends React.PureComponent<ITableProps> {
  public render() {
    const {
      classes,
      course,
      clickHandlerBuilder,
      clickPinHandlerBuilder,
      pinned,
      taken,
    } = this.props;
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
          <div>
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
                    {`Prof. ${n.professor || 'None'}`}
                  </CustomTableCell>
                  <CustomTableCell style={{ width: '14.5%' }}>
                    {n.division !== '' ? `Class. ${n.division}` : 'No Class'}
                  </CustomTableCell>
                  <CustomTableCell style={{ width: '12.5%' }}>
                    {n.limit ? `0/${n.limit}` : '∞'}
                  </CustomTableCell>
                  <CustomTableCell style={{ width: '18.8%' }}>
                    <div className={classes.levelBar}>
                      <div className={classes.levelTitle}>Load:</div>
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
                  <CustomTableCell style={{ width: '16%' }}>
                    <div className={classes.levelBar}>
                      <div className={classes.levelTitle}>Grade:</div>
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
                  <CustomTableCell
                    numeric
                    style={{
                      border: '1px solid ' + ourKaistBlue,
                      borderRight: '0px solid',
                      height: 30,
                      padding: '1px 0px',
                      width: '17.4%',
                    }}
                  >
                    <ClassTime classTimes={n.classTime} />
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
