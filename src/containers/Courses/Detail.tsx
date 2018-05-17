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

import List from '@material-ui/core/List';
import ListItem/*, {ListItemProps}*/ from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText, {ListItemTextProps} from '@material-ui/core/ListItemText';
import ListSubheader,{ListSubheaderProps} from 'material-ui/List/ListSubheader';


// import { Theme } from "@material-ui/core/styles";
import withStyles, { WithStyles } from "material-ui/es/styles/withStyles";
import styles from './Detail.style';

const { classes } = styles;

const ourKaistBlue = '#E3F2FD';
const recommendColor = "#FFC107";
const lightGrey1 = "#f5f5f5";

// const defaultBackColor = "white";
const courseR = "System Programming";
const courseR2 = "Network Programming";
const courseRA = "Discrete Mathmatics";
const courseRA2 = "Human Centered Interface Design with ---(long long long class name)";

const doFirst = " !important";

const testPosX = 210;

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

/*
const RcmListItem = withStyles(theme =>({
  gutters:{
    padding: "6px 24px",
  },
}))(ListItem as React.ComponentType<
  ListItemProps & WithStyles<'root'>>); */

const RcmListItemText = withStyles(theme =>({
  primary:{
    fontSize: "0.875em"+doFirst,
  },
}))(ListItemText as React.ComponentType<
  ListItemTextProps & WithStyles<'primary'>>);


const RcmSubHeader = withStyles(theme =>({
  root:{
    lineHeight: "1em",
    padding: "12px 24px",
  },
}))(ListSubheader as React.ComponentType<
  ListSubheaderProps & WithStyles<'root'>>);


const themeStyle = () => ({
  buttonPin: {
    height: 32,
    marginBottom: 6,
    marginLeft: 6,
    marginRight: 12,
    minHeight: 32,
    padding: "4px 16px 4px 16px" + doFirst,
  },

  chipRcm: {
    backgroundColor: recommendColor + doFirst,
    color: "white" + doFirst,
  },

  pinIcon: {
    marginLeft: 8,
  },

  graphCard: {
    backgroundColor: "#f5f5f5",
    display: "flex",
    padding: 0,
  },

  listItems: {
    padding: "8px 18px"+doFirst,
  },

  iconOfList: {
    fontSize: 20,
    marginRight: 0,
  }

});

class Detail extends React.Component<IProps &
  WithStyles<"buttonPin" | "chipRcm" | 'pinIcon' | 'graphCard' | 'listItems' | 'iconOfList'
    >> {
  public render() {
    const query = this.props.match.params;
    const customClass = this.props.classes;

    return <div className="courseDetail">
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
            <Typography variant="headline" component="h3"
                        style={{ textAlign: "left", padding: "12px 0px 12px 12px", display: "flex" }}>
              <div style={{ width: "60%" }}>Course Decription
                <span style={{ fontSize: "0.7em" }}>(Syllabus)</span>
              </div>
              {/* recommandation or student status */}
              <div style={{ width: "40%", textAlign: "right", verticalAlign: "bottom" }}>
                <StatusChip label="attended"/>
                <StatusChip label="recommanded" className={customClass.chipRcm}/>
                {/* check pinnind or not */}
                <Button variant="raised" color="default" className={customClass.buttonPin}>
                  Pin
                  <Icon className={customClass.pinIcon}>turned_in_not</Icon> </Button>
                {/* turned_in 은 꽉찬 깃발, turned_in_not을 입력하면 빗 깃발 출력 */}
              </div>
            </Typography>
          </div>
          {/* give detail information with table */}
          <div className={"tableContainer"}>
            <Table style={{ marginRight: 100 }}>
              <TableBody>
                <CustomTableRow>
                  <CustomTableCellD>School of computing<br/>Major Reuquired</CustomTableCellD>
                  <CustomTableCellD>Tue: 10:30-12:00<br/>Tue: 10:30-12:00</CustomTableCellD>
                  <CustomTableCellD>Course Number: {query.number} <br/>Course Code: 36.220</CustomTableCellD>
                  <CustomTableCellD style={{ borderWidth: 0, borderBottom: "1px solid rgba(224, 224, 224, 1)" }}
                  ><br/>More information</CustomTableCellD>
                  <CustomTableCellD style={{ width: "3%" }}/>
                </CustomTableRow>
              </TableBody>
            </Table>
          </div>
          {/* sanky graph with related courses */}
          <CardContent className={customClass.graphCard} style={{ padding: 0 }}>
            <div className={classes.besideSankyGraph}>
              <List component="nav" subheader={
                <ListSubheader component="div"
                               style={{
                                 backgroundColor: lightGrey1,
                                 position: "relative"
                               }}>prerequisites</ListSubheader>}>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>star_rate</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseR}/>
                </ListItem>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>equalizer</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseRA}/>
                </ListItem>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>equalizer</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseRA2}/>
                </ListItem>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseR}/>
                </ListItem>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseR2}/>
                </ListItem>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseR}/>
                </ListItem>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseR2}/>
                </ListItem>
              </List>
            </div>
            <CardMedia className={classes.sankyGraphDiv}>
              <img style={{ maxHeight: "30vh" }}
                   src={"https://csaladenes.files.wordpress.com/2014/11/clipboard01.png?w=720&h=488"}/>
            </CardMedia>
            <div className={classes.besideSankyGraph}>
              <List component="nav" subheader={
                <RcmSubHeader component="div" style={{ backgroundColor: lightGrey1, position: "relative" }}>
                  Other students takes<br/><strong>Operation systems and labs</strong> with...</RcmSubHeader>}>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>star_rate</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseR}/>
                </ListItem>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>equalizer</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseRA}/>
                </ListItem>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>equalizer</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseRA2}/>
                </ListItem>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseR}/>
                </ListItem>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseR2}/>
                </ListItem>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon></ListItemIcon>
                  <RcmListItemText inset primary={courseR}/>
                </ListItem>
                <ListItem button className={customClass.listItems}>
                  <ListItemIcon><Icon style={{ fontSize: 18, marginRight: 0 }}>done</Icon></ListItemIcon>
                  <ListItemText inset primary={courseR2}/>
                </ListItem>
              </List>
            </div>
          </CardContent>
          {/* information for each semester with professor */}

          <CardContent>
            <div style={{ height: "25vh", overflow: "auto", whiteSpace: "nowrap" }}>
              <div className={classes.testDiv} style={{ left: testPosX * 0 }}>:</div>
              <div className={classes.testDiv} style={{ left: testPosX * 1 }}>:</div>
              <div className={classes.testDiv} style={{ left: testPosX * 2 }}>:</div>
              <div className={classes.testDiv} style={{ left: testPosX * 3 }}>:</div>
              <div className={classes.testDiv} style={{ left: testPosX * 4 }}>:</div>
              <div className={classes.testDiv} style={{ left: testPosX * 5 }}>:</div>
              <div className={classes.testDiv} style={{ left: testPosX * 6 }}>:</div>
              <div className={classes.testDiv} style={{ left: testPosX * 7 }}>:</div>
              <div className={classes.testDiv} style={{ left: testPosX * 8 }}>:</div>
              <div className={classes.testDiv} style={{ left: testPosX * 9 }}>:</div>
              <div className={classes.testDiv} style={{ left: testPosX * 10 }}>:</div>
            </div>
          </CardContent>
        </Card>
      </Paper>
    </div>;
  }
}

export default withStyles(themeStyle)(Detail);