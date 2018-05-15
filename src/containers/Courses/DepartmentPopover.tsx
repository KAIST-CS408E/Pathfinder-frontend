import * as React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Popover from '@material-ui/core/Popover';

export interface IProps {
  anchor?: HTMLElement;
  onClose: (index?: number) => void;
  data: IListItem[];
}

export interface IListItem {
  key: string;
  text: string;
}

export default class DepartmentPopover extends React.Component<IProps> {
  public handleClose = () => {
    this.props.onClose();
  };

  public handleListItemClick = (index: number) => () => {
    this.props.onClose(index);
  };

  public render() {
    const { anchor, data } = this.props;
    return (
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={this.handleClose}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'left',
          vertical: 'top',
        }}
      >
        <List>
          {data.map((d, i) => (
            <ListItem key={d.key} onClick={this.handleListItemClick(i)} button>
              {d.text}
            </ListItem>
          ))}
        </List>
      </Popover>
    );
  }
}
