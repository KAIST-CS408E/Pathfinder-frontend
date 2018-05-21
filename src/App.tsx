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
      top: '2em'
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
  public state = { pinnedList: {}, showPinned: false };

  public pinnedListAnchor: React.RefObject<any>;

  constructor(props: any) {
    super(props);
    this.pinnedListAnchor = React.createRef();
  }

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

  public handleOpenPinnedList = () => {
    this.setState({ showPinned: true });
  };

  public handleClosePinnedList = () => {
    this.setState({ showPinned: false });
  };

  public render() {
    const { showPinned } = this.state;
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
                    <ListItem button>
                      <ListItemText>
                        CS408 - Computer Science Project
                      </ListItemText>
                    </ListItem>
                    <ListItem button>
                      <ListItemText>
                        {"CS492 - Special Topics in Computer Science<Digital Watermarking>"}
                      </ListItemText>
                    </ListItem>
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
            <Route path="/courses" component={Courses} />
            <Route path="/curriculum" component={Curriculum} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
