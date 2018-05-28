import * as React from 'react';

import Avatar from "@material-ui/core/Avatar";
import ListItem /*, {ListItemProps}*/ from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText, {
  ListItemTextProps,
} from '@material-ui/core/ListItemText';
import withStyles, { WithStyles } from 'material-ui/es/styles/withStyles';

import styles from "./Detail.style";

const { classes } = styles;

const relPercent = 87;
const ourKaistBlue = "#E8EAF6";


const RcmListItemText = withStyles(theme => ({
  primary: {
    fontSize: '0.875em !important',
    position: "relative" as "relative",
  },
}))(ListItemText as React.ComponentType<
  ListItemTextProps & WithStyles<'primary'>
>);

interface IPeerCourseItemProps {
  className: string;
  courseName: string;
  courseNumber: string;
  icon: string;
  onClick: (courseNumber: string, subtitle: string) => void;
  subtitle: string;
}

export default class PeerCourseListItem extends React.Component<
  IPeerCourseItemProps
> {
  public handleClick = () => {
    const { courseNumber, subtitle } = this.props;
    this.props.onClick(courseNumber, subtitle);
  };

  public render() {
    const { className, courseName } = this.props;
    return (
      <ListItem button className={className} onClick={this.handleClick} style={{border: "1px solid " + ourKaistBlue}}>
        <ListItemIcon>
          <Avatar style={{backgroundColor: ourKaistBlue, fontSize: 10, marginRight:0, height: 26, width:26 }}>{relPercent}%</Avatar>
        </ListItemIcon>
        <RcmListItemText inset className={classes.recCourseList}>
          <div style={{ zIndex: -1, width: relPercent / 100 * 50}} className={classes.percentBar}>{/* give percentage bar width */}</div>
          {courseName}
        </RcmListItemText>
      </ListItem>
    );
  }
}




