import * as React from 'react';

import { ListItem } from '@material-ui/core';

interface ICourseListItemProps<T> {
  payload: T
  onClick: (payload: T) => void;
  render: (payload: T) => React.ReactNode;
}

export default class CourseItem<T> extends React.Component<ICourseListItemProps<T>> {
  public handleClick = () => {
    this.props.onClick(this.props.payload);
  };

  public render() {
    return (
      <ListItem
        style={{ paddingLeft: 12, paddingRight: 12 }}
        button
        onClick={this.handleClick}
      >
        {this.props.render(this.props.payload)}
      </ListItem>
    );
  }
}
