import * as React from 'react';

import Icon from '@material-ui/core/Icon';
import ListItem /*, {ListItemProps}*/ from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText, {
  ListItemTextProps,
} from '@material-ui/core/ListItemText';
import withStyles, { WithStyles } from 'material-ui/es/styles/withStyles';

const RcmListItemText = withStyles(theme => ({
  primary: {
    fontSize: '0.875em !important',
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
}

export default class PeerCourseListItem extends React.Component<
  IPeerCourseItemProps
> {
  public handleClick = () => {
    const { courseNumber } = this.props;
    this.props.onClick(courseNumber, '');
  };

  public render() {
    const { className, courseName, icon } = this.props;
    return (
      <ListItem button className={className} onClick={this.handleClick}>
        <ListItemIcon>
          <Icon style={{ fontSize: 18, marginRight: 0 }}>{icon}</Icon>
        </ListItemIcon>
        <RcmListItemText inset>{courseName}</RcmListItemText>
      </ListItem>
    );
  }
}
