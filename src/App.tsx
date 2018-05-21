import * as React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
} from 'react-router-dom';

import iassign from 'immutable-assign';
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

import './App.css';

import { IPinnedCourse, IPinnedTable } from 'pathfinder';
import { buildCourseKey } from './utils';

const API_URL = 'https://ny3acklsf2.execute-api.ap-northeast-2.amazonaws.com/api';

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

interface IState {
  pinnedList: IPinnedTable;
  showPinned: boolean;
}

class App extends React.Component<{}, IState> {
  public state = { pinnedList: {}, showPinned: false };

  public pinnedListAnchor: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.pinnedListAnchor = React.createRef();
    this.state = {
      pinnedList: {},
      showPinned: false,
    };
  }

  public componentDidMount() {
    fetch(API_URL + '/pin')
      .then(r => r.json())
      .then(d => {
        const newPinnedList = iassign(this.state.pinnedList, pinnedList => {
          d.map((pinEntry: [string, string]) => {
            const datum = {
              courseName: pinEntry[1],
              courseNumber: pinEntry[0],
              subtitle: pinEntry[2],
            };
            pinnedList[buildCourseKey(datum)] = datum;
          });
          return pinnedList;
        });
        this.setState({ pinnedList: newPinnedList });
      });
  }

  public pinCourse = (course: IPinnedCourse) => {
    // only if it does not exist in list
    if (!this.state.pinnedList[buildCourseKey(course)]) {
      fetch(`${API_URL}/pin/${course.courseNumber}?subtitle=${course.subtitle}`, { method: 'POST'})
        .then(() => console.log('success'))
        .catch(e => console.error(e));

      this.setState(
        iassign(
          this.state,
          state => state.pinnedList || {},
          pinnedList => {
            pinnedList[buildCourseKey(course)] = course;
            return pinnedList;
          }
        )
      );
    }
  };

  public unpinCourse = (course: IPinnedCourse) => {
    if (this.state.pinnedList[buildCourseKey(course)]) {
      fetch(`${API_URL}/pin/${course.courseNumber}?subtitle=${course.subtitle}`, { method: 'DELETE'})
        .then(() => console.log('success'))
        .catch(e => console.error(e));

      this.setState(
        iassign(
          this.state,
          state => state.pinnedList,
          pinnedList => {
            delete pinnedList[buildCourseKey(course)];
            return pinnedList;
          }
        )
      );
    }
  };

  public resetPinned = () => {
    this.setState({ pinnedList: {} });
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
        pinnedList={this.state.pinnedList}
        onPinnedCourse={this.pinCourse}
        onUnpinCourse={this.unpinCourse}
      />
    );
  };

  public renderCurriculum = (props: RouteComponentProps<{}>) => {
    return <Curriculum {...props} />;
  };

  public render() {
    const { showPinned, pinnedList } = this.state;
    return (
      <Router>
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
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route path="/dashboard">
              <div>This is dashboard</div>
            </Route>
            <Route path="/courses" render={this.renderCourses} />
            <Route path="/curriculum" render={this.renderCurriculum} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
