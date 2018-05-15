import * as React from 'react';

import Paper from '@material-ui/core/Paper';
import { Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import { /* ListItem, */ ClickItemHandler, ILectureListItem } from './ListItem';

interface IProps {
  data?: IQueryResult['courses'];
  onClickItem: ClickItemHandler;
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

export default class SearchList extends React.Component<IProps> {
  public handleClickItem = (d: ILectureListItem, i: number) => {
    const { onClickItem } = this.props;

    if (onClickItem) {
      onClickItem(d, i);
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
        <Item key={course.number} course={course} />
      ));
    }

    return <div className="list">{renderData}</div>;
  }
}

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
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
    backgroundColor: '#4481ff',
    color: 'white',
    textAlign: 'left' as 'left',

    paddingLeft: theme.spacing.unit * 3,
    paddingTop: theme.spacing.unit * 3,
  },
});

interface ITableProps extends WithStyles<'root' | 'table' | 'row' | 'typo'> {
  course: ICourse;
}

function CustomizedTable(props: ITableProps) {
  const { classes, course } = props;
  const { lectures } = course;

  return (
    <Paper className={classes.root}>
      <Typography className={classes.typo} variant="headline" component="h3">
        {`${course.name} (${course.number})`}
      </Typography>
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
                <CustomTableCell component="th" scope="row">
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
