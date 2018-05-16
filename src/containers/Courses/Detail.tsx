import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import styles from './Detail.style';

const { classes } = styles;

export interface ICourseQuery {
  year: string;
  term: string;
  number: string;
  class: string;
}

export interface IProps extends RouteComponentProps<ICourseQuery> {}

export default class Detail extends React.Component<IProps> {
  public render() {
    const query = this.props.match.params;

    return (
      <div className="courseDetail">
        <Paper className={classes.paperCutting}
          elevation={4}>
          <Card className={classes.courseDetailCard}>
            {/* title for detail page(top of pop-up) */}
            <CardContent className={classes.detailCardTitle}>
              {/* left shifting */}
              <div className={classes.stickLeft}>
                <Typography component="p">
                  <span>opera......</span>
                </Typography>
              </div>
              {/* title */}
              <Typography className={classes.typoMiddleAlign}
                variant="headline" component="h3">
                Operation system and Labs
              </Typography>
              {/* right shifting */}
              <div className={classes.stickRight}>
                <Typography component="p">
                  Intoduction of.....
                </Typography>
              </div>
            </CardContent>
            <Typography variant="headline" component="h3" style={{textAlign:"left", padding: 12,}}>
              Course Decription(Syllabus)
            </Typography>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>School of computing<br/>Major Reuquired</TableCell>
                  <TableCell>Tue: 10:30-12:00<br/>Tue: 10:30-12:00</TableCell>
                  <TableCell>Course Number: CS311 <br/>Course Code: 36.220</TableCell>
                  <TableCell><br/>More information</TableCell>
                  <TableCell>{/* aa */}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            {/* sanky graph with related courses */}
            <CardContent className={classes.detailCardGraphDiv}>
              <div className={classes.besideSankyGraph}>
                prerequisites
              </div>
                <CardMedia className={classes.sankyGraphDiv}>
                  ss
                </CardMedia>
              <div className={classes.besideSankyGraph}>
                Other students takes the operation systems and labs with...
              </div>
            </CardContent>
            {/* information for each semester with professor */}
            <CardContent>
              ss
            </CardContent>
          </Card>
          <header>{query.number}</header>
          <div className="content">
            <div className="detail">
              <div className="tab">tab here</div>
              <div className="tabContent" />
            </div>
            <div className="related">Related Courses</div>
          </div>
          <div className="selection">Choose Professor</div>
        </Paper>
      </div>
    );
  }
}
