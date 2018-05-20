import * as React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

// import iassign from 'immutable-assign';
import jss from 'jss';
import preset from 'jss-preset-default';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AccountBox from '@material-ui/icons/AccountBox';
import TurnedIn from '@material-ui/icons/TurnedIn';

import Courses from './containers/Courses';
import Curriculum from './containers/Curriculum';

import './App.css';

jss.setup(preset());
const { classes } = jss
  .createStyleSheet({
    label: {
      marginRight: 6,
    },
    typo: {
      marginRight: 'auto',
    },
  })
  .attach();

interface IState {
  pinnedList: IPinnedTable;
}

interface IPinnedTable {
  [courseNumber: string]: IPinnedCourse;
}

interface IPinnedCourse {
  courseName: string;
  courseNumber: string;
  class: string;
  professor: string;
  semester: string;
  year: string;
}

class App extends React.Component<{}, IState> {
  public state = { pinnedList: {} };

  public pinCourse = (course: IPinnedCourse) => {
    // if not exists in list
    if (!this.state.pinnedList[course.courseNumber]) {
      console.log('123');
    }
  };

  public unpinCourse = (courseNumber: IPinnedCourse['courseNumber']) => {
    console.log('fuckl');
  };

  public resetPinned = () => {
    this.setState({ pinnedList: {} });
  };

  public render() {
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
                <Button>
                  <span className={classes.label}>Pin List</span> <TurnedIn />
                </Button>
              </Toolbar>
            </div>
          </AppBar>
          <Switch>
            <Redirect exact from="/" to="/dashboard" />
            <Route path="/dashboard">
              <div>This is dashboard</div>
            </Route>
            <Route path="/courses" component={Courses} />
            <Route path="/curriculum" component={Curriculum} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
