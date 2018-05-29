import * as React from 'react';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

class Dashboard extends React.Component<{ push: typeof push }> {
  public handleClickSearch = () => {
    this.props.push('/courses/s/');
  };

  public handleClickCurriculum = () => {
    this.props.push('/curriculum/planner');
  };

  public render() {
    return (
      <Grid container spacing={24}>
        <Grid item xs={6} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="headline" component="h2">
                Search the courses open in 2018
              </Typography>
              <Typography color="textSecondary">adjective</Typography>
              <Typography component="p">
                well meaning and kindly.<br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.handleClickSearch}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Card>
            <CardContent>
              <Typography variant="headline" component="h2">
                Plan your own curriculum
              </Typography>
              <Typography color="textSecondary">adjective</Typography>
              <Typography component="p">
                well meaning and kindly.<br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={this.handleClickCurriculum}>
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  () => ({}),
  (dispatch: Dispatch) =>
    bindActionCreators(
      {
        push,
      },
      dispatch
    )
)(Dashboard);
