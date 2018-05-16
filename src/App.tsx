import * as React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import jss from 'jss';
import preset from 'jss-preset-default';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AccountBox from '@material-ui/icons/AccountBox';
import TurnedIn from '@material-ui/icons/TurnedIn';

import Courses from './containers/Courses';

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

class App extends React.Component {
  public render() {
    return (
      <div className="App">
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
          <Router>
            <Switch>
              <Redirect exact from="/" to="/dashboard" />
              <Route path="/dashboard">
                <div>This is dashboard</div>
              </Route>
              <Route path="/courses" component={Courses} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
