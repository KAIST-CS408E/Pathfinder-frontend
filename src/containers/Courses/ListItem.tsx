import * as React from 'react';

export interface ILectureListItem {
  name: string;
  professor: string;
  number: string;
  time: string;
  limit: number;
  grades: number;
  load: number;
}

export type ClickItemHandler = (d: ILectureListItem, i: number) => void;

export default class ListItem extends React.Component<{
  d: ILectureListItem;
  index: number;
  onClick: ClickItemHandler;
}> {
  public handleClick = () => {
    const { onClick, d, index } = this.props;
    onClick(d, index);
  };

  public render() {
    const { d, index } = this.props;
    return (
      <div
        key={d.name + d.number + (d.professor || index)}
        className="item"
        onClick={this.handleClick}
      >
        <header>
          <span className="name">{d.name}</span>
          <span className="id">{d.number}</span>
          <span className="pin">Pin</span>
        </header>
        <div className="detail">
          <div className="prof">Prof. {d.professor || 'Staff'}</div>
          <div className="date">
            <span>Thu: 10:30~12:00</span>
            <span>Thu: 10:30~12:00</span>
          </div>
          <div className="regState">{`${d.limit}/0`}</div>
          <div className="feature">
            <span>Grade: {d.grades}</span>
            <span>Load: {d.load}</span>
          </div>
        </div>
      </div>
    );
  }
}
