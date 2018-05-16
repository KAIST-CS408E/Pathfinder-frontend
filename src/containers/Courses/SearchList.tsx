import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow, { TableRowProps } from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import Icon from '@material-ui/core/Icon';
// import { stackOrderInsideOut } from "d3-shape";

/* import ListItem, { ClickItemHandler, ILectureListItem } from './ListItem'; */
// const ourKaistBlue = '#4481ff';
const ourKaistBlue = '#E3F2FD';
const ourKaistBlueD = "#1A237E";


interface IProps {
  data?: IQueryResult['courses'];
  onClickEntry: ClickEntryHandler;
}

export interface IQueryResult {
  year: string;
  term: string;
  courses: ICourse[];
}

export interface ICourse {
  name: string;
  number: string;
  lectures: ILecture[];
}

export interface ILecture {
  professor: string;

  class: string;
  time: string;
  limit: number;

  load: number;
  grades: number;
}

export type ClickEntryHandler = (course: ICourse, lectureIndex: number) => void;
type ClickHandlerBuilder = (
  course: ICourse,
  lectureIndex: number
) => ClickHandler;
type ClickHandler = () => void;

export default class SearchList extends React.Component<IProps> {
  public handleClickEntry: ClickHandlerBuilder = (course, index) => () => {
    const { onClickEntry } = this.props;

    if (onClickEntry) {
      onClickEntry(course, index);
    }
  };

  public render() {
    const { data } = this.props;

    let renderData: JSX.Element | JSX.Element[] = (
      <span>{'Sorry! nothing to show... perhaps broken API again?'}</span>
    );

    if (data) {
      /* const flattenData = data
       *   .map(c => {
       *     const { name, number: courseNumber, lectures } = c;
       *     return lectures.map(l =>
       *       Object.assign({}, l, { name, number: courseNumber })
       *     );
       *   })
       *   .reduce((r, v) => r.concat(v));
       * renderData = flattenData.map((d, i) => (
       *   <ListItem key={i} d={d} index={i} onClick={this.handleClickItem} />
       * )); */
      renderData = data.map(course => (
        <Item
          clickHandlerBuilder={this.handleClickEntry}
          key={course.number}
          course={course}
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
}))(TableRow as React.ComponentType<
  TableRowProps & WithStyles<'root'>
  >);


const CustomTableCell = withStyles(theme => ({
  body: {
    border: ourKaistBlue,
    fontSize: 14,

    '&:nth-child(1)': {
      color: '#008bff',
    },
    padding: "0px 0px 0px 12px",
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
      height: 32,
    },
  },

  typo: {
    display: 'flex' as 'flex',
    justifyContent: 'space-between' as 'space-between',

    backgroundColor: ourKaistBlue,
    color: ourKaistBlueD,
    textAlign: 'left' as 'left',

    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 1.5,
  },

  btn: {
    height: 24,
    width: 24,
  },

  /*
  paddingNone: {
    backgroundColor: "blue",
    height: 20,
  },
  */

  title: {
    fontSize: 18,
  }
});

interface ITableProps
  extends WithStyles<'root' | 'table' | 'row' | 'typo' | 'btn' |
    'paddingNone' | 'title' | 'head' >
{
  course: ICourse;
  clickHandlerBuilder: ClickHandlerBuilder;
}

let x = 0;

function CustomizedTable(props: ITableProps) {
  const { classes, course, clickHandlerBuilder } = props;
  const { lectures } = course;

  return (
    <Paper className={classes.root}>
      <div className={classes.typo}>
        <Typography color="inherit" variant="headline" component="h3"
        className={classes.title}>
          {`${course.name} (${course.number})`}
        </Typography>
        <IconButton className={classes.btn} color="inherit">
          <Icon>{x++ % 2 === 1 ? 'turned_in' : 'turned_in_not'}</Icon>
        </IconButton>
      </div>
      <Table className={classes.table}>
        <TableHead>
          <CustomTableRow>
            <CustomTableCell style={{ paddingLeft: 16 }}
              className={ classes.head }>School of Computing</CustomTableCell>
            <CustomTableCell className={ classes.head }>Major Elective</CustomTableCell>
            <CustomTableCell className={ classes.head }>Bachelor</CustomTableCell>
            <CustomTableCell className={ classes.head }>Credit. 3:0:3</CustomTableCell>
            <CustomTableCell/><CustomTableCell />
          </CustomTableRow>
        </TableHead>
        <TableBody>
          {lectures.map((n, i) => {
            return (
              // Key should be replaced later by uuid such as class ID
              <TableRow className={classes.row} key={i}>
                <CustomTableCell
                  onClick={clickHandlerBuilder(course, i)}
                  component="th"
                  scope="row"
                  style={{ paddingLeft: 18, color: ourKaistBlueD }}
                >
                  {`Prof. ${n.professor || 'None'}`}
                </CustomTableCell>
                <CustomTableCell>
                  {`Class. ${n.class || 'None'}`}
                </CustomTableCell>
                <CustomTableCell>{`0/${n.limit}`}</CustomTableCell>
                <CustomTableCell>{`Load ${n.load}`}</CustomTableCell>
                <CustomTableCell>{`Grade ${n.grades}`}</CustomTableCell>
                <CustomTableCell numeric style={{ paddingRight: 4 }}>Recommanded</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

const Item = withStyles(styles)(CustomizedTable);
