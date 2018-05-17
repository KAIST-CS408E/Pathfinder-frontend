import * as React from 'react';
import { RouteComponentProps } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Chip, {ChipProps} from '@material-ui/core/Chip';
import Icon from '@material-ui/core/Icon';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell, { TableCellProps } from '@material-ui/core/TableCell';
import TableRow, {TableRowProps} from '@material-ui/core/TableRow';

// import { Theme } from "@material-ui/core/styles";
import withStyles, { WithStyles } from "material-ui/es/styles/withStyles";
import styles from './Detail.style';

const { classes } = styles;

const ourKaistBlue = '#E3F2FD';
const recommendColor = "#FFC107";
// const defaultBackColor = "white";

export interface ICourseQuery {
  year: string;
  term: string;
  number: string;
  class: string;
}

export interface IProps extends RouteComponentProps<ICourseQuery> {}


const CustomTableCellD = withStyles(theme =>({
  root:{
    borderBottom: "0px",
    borderRight: "1px solid " + ourKaistBlue,
    padding: '4px 0px 4px 12px !important',
  },

  paddingDense: {
    padding: "12px !important",
  },

}))(TableCell as React.ComponentType<
  TableCellProps & WithStyles<'root' | 'paddingDense' | 'numeric'>>);


const CustomTableRow = withStyles(theme =>({
  root:{
    borderRight: "5%",
  },

}))(TableRow as React.ComponentType<
  TableRowProps & WithStyles<'root' | 'paddingDense' | 'numeric'>>);


const StatusChip = withStyles(theme =>({
  root:{
    height: "24px !important",
    margin: "0px 6px",
  },
}))(Chip as React.ComponentType<
  ChipProps & WithStyles<'root'>>);


const themeStyle = () => ({
  root: {
    height: 32,
    marginBottom: 6,
    minHeight: 32,
  },
});

class Detail extends React.Component<IProps & WithStyles<"root">> {
  public render() {
    const query = this.props.match.params;
    const customClass = this.props.classes;

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
            <div>{/* course description title, reccommandation, pinned */}
              <Typography variant="headline" component="h3" style={{textAlign:"left", padding: "12px 0px 12px 12px", display: "flex"}}>
                <div style={{ width: "60%"}}>Course Decription(Syllabus)</div>
                {/* recommandation or student status */}
                <div style={{ width: "40%", textAlign: "right", verticalAlign: "bottom"}}>
                  <StatusChip label="attended"/>
                  <StatusChip label="recommanded"
                              style={{ backgroundColor: recommendColor, color: "white"}}/>
                  {/* check pinnind or not */}
                  <Button variant="raised" color="default" className={customClass.root}>
                    Send
                    <Icon style={{ margin: "0 0 0 6" }}>send</Icon> </Button>
                </div>
              </Typography>
            </div>
            <div className={"tableContainer"}>
              <Table style={{ marginRight: 100 }}>
                <TableBody>
                  <CustomTableRow>
                    <CustomTableCellD>School of computing<br/>Major Reuquired</CustomTableCellD>
                    <CustomTableCellD>Tue: 10:30-12:00<br/>Tue: 10:30-12:00</CustomTableCellD>
                    <CustomTableCellD>Course Number: CS311 <br/>Course Code: 36.220</CustomTableCellD>
                    <CustomTableCellD style={{ borderWidth: 0, borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                    ><br/>More information</CustomTableCellD>
                    <CustomTableCellD style={{width: "3%"}}/>
                  </CustomTableRow>
                </TableBody>
              </Table>
            </div>
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

export default withStyles(themeStyle)(Detail);