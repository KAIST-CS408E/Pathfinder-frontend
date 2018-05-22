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

import { ICourse, IPinnedTable, IQueryResult } from 'pathfinder';
import { buildCourseKey } from '../../utils/index';

const ourKaistBlue = '#E3F2FD';
const ourKaistBlueD = '#1A237E';

interface IProps {
  data?: IQueryResult['courses'];
  pinnedList: IPinnedTable;
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

export default class SearchList extends React.Component<IProps> {
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
    const { data, pinnedList } = this.props;

    let renderData: JSX.Element | JSX.Element[] = (
      <span>{'Sorry! nothing to show... perhaps broken API again?'}</span>
    );

    if (data) {
      renderData = data.map(course => (
        <ListItem
          clickHandlerBuilder={this.handleClickEntry}
          clickPinHandlerBuilder={this.handleClickPin}
          course={course}
          key={course.number + course.lectures[0].division}
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
    > {
  course: ICourse;
  clickHandlerBuilder: ClickHandlerBuilder;
  clickPinHandlerBuilder: ClickPinHandlerBuilder;
  pinned: boolean;
}

function CustomizedTable(props: ITableProps) {
  const {
    classes,
    course,
    clickHandlerBuilder,
    clickPinHandlerBuilder,
    pinned,
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
        >
          {`${course.name} (${course.number})`}
        </Typography>
        <IconButton
          className={classes.btn}
          color="inherit"
          onClick={clickPinHandlerBuilder(course)}
        >
          <Icon>{pinned ? 'turned_in' : 'turned_in_not'}</Icon>
        </IconButton>
      </div>
      <Table className={classes.table}>
        <TableHead>
          <CustomTableRow>
            <CustomTableCell
              style={{ paddingLeft: 16 }}
              className={classes.head}
            >
              School of Computing
            </CustomTableCell>
            <CustomTableCell className={classes.head}>
              Major Elective
            </CustomTableCell>
            <CustomTableCell className={classes.head}>Bachelor</CustomTableCell>
            <CustomTableCell className={classes.head}>
              Credit. 3:0:3
            </CustomTableCell>
            <CustomTableCell />
            <CustomTableCell />
          </CustomTableRow>
        </TableHead>
        <TableBody>
          {lectures.map((n, i) => {
            return (
              // Key should be replaced later by uuid such as class ID
              <CustomTableRow className={classes.row} key={i}>
                <CustomTableCell
                  onClick={clickHandlerBuilder(course, i)}
                  component="th"
                  scope="row"
                  style={{
                    color: ourKaistBlueD,
                    overflow: 'hidden',
                    paddingLeft: 18,
                    width: 217,
                  }}
                >
                  {`Prof. ${n.professor || 'None'}`}
                </CustomTableCell>
                <CustomTableCell>
                  {n.division !== '' ? `Class. ${n.division}` : n.division}
                </CustomTableCell>
                <CustomTableCell>
                  {n.limit ? `0/${n.limit}` : '∞'}
                </CustomTableCell>
                <CustomTableCell>{`Load ${n.load}`}</CustomTableCell>
                <CustomTableCell>{`Grade ${n.grades}`}</CustomTableCell>
                <CustomTableCell numeric style={{ paddingRight: 4 }}>
                  Recommended
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