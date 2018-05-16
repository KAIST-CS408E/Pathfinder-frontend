import * as React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import Icon from '@material-ui/core/Icon';

/* import ListItem, { ClickItemHandler, ILectureListItem } from './ListItem'; */

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

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,

    '&:nth-child(1)': {
      color: '#008bff',
    },
  },
  head: {
    backgroundColor: '#4481ff',
    color: theme.palette.common.white,
  },
}))(TableCell as React.ComponentType<
  TableCellProps & WithStyles<'body' | 'head'>
>);

const styles = (theme: Theme) => ({
  root: {
    width: '100%',

    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto' as 'auto',
  },

  table: {
    minWidth: 700,
  },

  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },

  typo: {
    display: 'flex' as 'flex',
    justifyContent: 'space-between' as 'space-between',

    backgroundColor: '#4481ff',
    color: 'white',
    textAlign: 'left' as 'left',

    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3,
  },

  btn: {
    height: 24,
    width: 24,
  },
});

interface ITableProps
  extends WithStyles<'root' | 'table' | 'row' | 'typo' | 'btn'> {
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
        <Typography color="inherit" variant="headline" component="h3">
          {`${course.name} (${course.number})`}
        </Typography>
        <IconButton className={classes.btn} color="inherit">
          <Icon>{x++ % 2 === 1 ? 'turned_in' : 'turned_in_not'}</Icon>
        </IconButton>
      </div>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>School of Computing</CustomTableCell>
            <CustomTableCell numeric>Major Elective</CustomTableCell>
            <CustomTableCell numeric>Bachelor</CustomTableCell>
            <CustomTableCell numeric>Credit. 3:0:3</CustomTableCell>
            <CustomTableCell numeric />
          </TableRow>
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
                >
                  {`Prof. ${n.professor || 'None'}`}
                </CustomTableCell>
                <CustomTableCell numeric>
                  {`Class. ${n.class || 'None'}`}
                </CustomTableCell>
                <CustomTableCell numeric>{`0/${n.limit}`}</CustomTableCell>
                <CustomTableCell numeric>{`Load ${n.load}`}</CustomTableCell>
                <CustomTableCell numeric>{`Grade ${n.grades}`}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

const Item = withStyles(styles)(CustomizedTable);
