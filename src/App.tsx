import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import { Location } from 'history';

import jss from 'jss';
import preset from 'jss-preset-default';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AccountBox from '@material-ui/icons/AccountBox';
import TurnedIn from '@material-ui/icons/TurnedIn';

import Courses from './containers/Courses';
import Curriculum from './containers/Curriculum';
import Dashboard from './containers/Dashboard';

import './App.css';

import { IPinnedCourse, IPinnedTable, PinEntryAPI } from 'pathfinder';

import { getAllPin, pinCourse, unpinCourse } from '@src/api';
import { RootState } from '@src/redux';
import { actions as pinActions } from '@src/redux/pinnedList';
import { buildCourseKey } from '@src/utils';

jss.setup(preset());

const { classes } = jss
  .createStyleSheet({
    label: {
      marginRight: 6,
    },
    pinnedListAnchor: {
      height: '100%',
      position: 'relative' as 'relative',

      left: '-5em',
      top: '2em',
    },
    typo: {
      marginRight: 'auto',
    },
  })
  .attach();

interface IProps {
  location: Location;
  pinnedList: IPinnedTable;

  onPinMultipleCourses: (entries: PinEntryAPI[]) => any;

  onPinCourse: (course: IPinnedCourse) => any;
  onUnpinCourse: (course: IPinnedCourse) => any;

  push: typeof push;
}

interface IState {
  showPinned: boolean;
}

class App extends React.Component<IProps, IState> {
  public pinnedListAnchor: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.pinnedListAnchor = React.createRef();
    this.state = {
      showPinned: false,
    };
  }

  public componentDidMount() {
    getAllPin().then(d => {
      this.props.onPinMultipleCourses(d);
    });
  }

  public pinCourse = (course: IPinnedCourse) => {
    // only if it does not exist in list
    if (!this.props.pinnedList[buildCourseKey(course)]) {
      pinCourse(course).then((response: any) => {
        if (response.success) {
          this.props.onPinCourse(course);
        } else {
          console.error('FAILED to PIN');
        }
      });
    }
  };

  public unpinCourse = (course: IPinnedCourse) => {
    if (this.props.pinnedList[buildCourseKey(course)]) {
      unpinCourse(course).then((response: any) => {
        if (response.success) {
          this.props.onUnpinCourse(course);
        } else {
          console.error('FAILED to UNPIN');
        }
      });
    }
  };

  public handleOpenPinnedList = () => {
    this.setState({ showPinned: true });
  };

  public handleClosePinnedList = () => {
    this.setState({ showPinned: false });
  };

  public handleMyCurriculumClick = () => {
    this.props.push('/curriculum/planner');
  };

  public renderCourses = (props: RouteComponentProps<{}>) => {
    return (
      <Courses
        {...props}
        pinnedList={this.props.pinnedList}
        onPinnedCourse={this.pinCourse}
        onUnpinCourse={this.unpinCourse}
      />
    );
  };

  public renderCurriculum = (props: RouteComponentProps<{}>) => {
    return <Curriculum {...props} />;
  };

  public render() {
    const { showPinned } = this.state;
    const { pinnedList, location } = this.props;

    const pinnedCourses = Object.values<IPinnedCourse>(pinnedList);

    return (
      <div className="App">
        <AppBar position="sticky" color="default">
          <div className="icon-container">
            <Toolbar>
              <Typography
                className={classes.typo}
                variant="title"
                color="inherit"
              >
                KAIST Pathfinder
              </Typography>
              <Button onClick={this.handleMyCurriculumClick}>
                <span className={classes.label}>My Curriculum</span>
                <AccountBox />
              </Button>
              <Button onClick={this.handleOpenPinnedList}>
                <span className={classes.label}>Pin List</span>
                <TurnedIn />
              </Button>
              <div
                className={classes.pinnedListAnchor}
                ref={this.pinnedListAnchor}
              />
              <Popover
                open={showPinned}
                anchorEl={
                  this.pinnedListAnchor.current
                    ? this.pinnedListAnchor.current
                    : undefined
                }
                onClose={this.handleClosePinnedList}
                anchorOrigin={{
                  horizontal: 'center',
                  vertical: 'bottom',
                }}
                transformOrigin={{
                  horizontal: 'left',
                  vertical: 'top',
                }}
              >
                <List>
                  {pinnedCourses.map(pinEntry => (
                    <ListItem key={buildCourseKey(pinEntry)} button>
                      <ListItemText>
                        {pinEntry.courseNumber}
                        {' - '}
                        {pinEntry.courseName}
                        {pinEntry.subtitle !== ''
                          ? `<${pinEntry.subtitle}>`
                          : ''}
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
                {pinnedCourses.length === 0 ? (
                  <>Nothing has been pinned</>
                ) : null}
                <Typography variant="title">HelloHello!</Typography>
              </Popover>
            </Toolbar>
          </div>
        </AppBar>
        <Switch location={location}>
          <Redirect exact from="/" to="/dashboard" />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/courses" render={this.renderCourses} />
          <Route path="/curriculum" render={this.renderCurriculum} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  location: state.router.location,
  pinnedList: state.pinnedList,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onPinMultipleCourses: pinActions.pinMultipleCourses,

      onPinCourse: pinActions.pinCourse,
      onUnpinCourse: pinActions.unpinCourse,

      push,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
