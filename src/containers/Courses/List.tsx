import * as React from 'react';

import ListItem, { ClickItemHandler, ILectureListItem } from './ListItem';

interface IProps {
  data?: IQueryResult['courses'];
  onClickItem: ClickItemHandler;
}

export interface IQueryResult {
  year: string;
  term: string;
  courses: ICourse[];
}

export interface ICourse {
  name: string;
  number: string;
  lectures: ILecture[];
}

export interface ILecture {
  professor: string;

  time: string;
  limit: number;

  load: number;
  grades: number;
}

export default class SearchList extends React.Component<IProps> {
  public handleClickItem = (d: ILectureListItem, i: number) => {
    const { onClickItem } = this.props;

    if (onClickItem) {
      onClickItem(d, i);
    }
  };

  public render() {
    const { data } = this.props;

    let renderData: JSX.Element | JSX.Element[] = (
      <span>{'Search for something'}</span>
    );

    if (data) {
      const flattenData = data
        .map(c => {
          const { name, number: courseNumber, lectures } = c;
          return lectures.map(l =>
            Object.assign({}, l, { name, number: courseNumber })
          );
        })
        .reduce((r, v) => r.concat(v));
      renderData = flattenData.map((d, i) => (
        <ListItem key={i} d={d} index={i} onClick={this.handleClickItem} />
      ));
    }

    return <div className="list">{renderData}</div>;
  }
}
