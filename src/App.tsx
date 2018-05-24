import * as React from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { connect, Dispatch } from 'react-redux';
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

import { API_URL } from '@src/constants/api';
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
    fetch(API_URL + '/pin')
      .then(r => r.json())
      .then(d => {
        this.props.onPinMultipleCourses(d);
      });
  }

  public pinCourse = (course: IPinnedCourse) => {
    // only if it does not exist in list
    if (!this.props.pinnedList[buildCourseKey(course)]) {
      fetch(
        `${API_URL}/pin/${course.courseNumber}?subtitle=${course.subtitle}`,
        { method: 'POST' }
      )
        .then(r => r.json())
        .then((response: any) => {
          if (response.success) {
            this.props.onPinCourse(course);
          } else {
            console.error('FAILED to PIN');
          }
        })
        .catch(e => console.error(e));
    }
  };

  public unpinCourse = (course: IPinnedCourse) => {
    if (this.props.pinnedList[buildCourseKey(course)]) {
      fetch(
        `${API_URL}/pin/${course.courseNumber}?subtitle=${course.subtitle}`,
        { method: 'DELETE' }
      )
        .then(r => r.json())
        .then((response: any) => {
          if (response.success) {
            this.props.onUnpinCourse(course);
          } else {
            console.error('FAILED to UNPIN');
          }
        })
        .catch(e => console.error(e));
    }
  };

  public handleOpenPinnedList = () => {
    this.setState({ showPinned: true });
  };

  public handleClosePinnedList = () => {
    this.setState({ showPinned: false });
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
              <Button>
                <span className={classes.label}>My Page</span>
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
                  {Object.values<IPinnedCourse>(pinnedList).map(pinEntry => (
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(App);
