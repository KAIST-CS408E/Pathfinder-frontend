import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

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
        <header>{query.number}</header>
        <div className="content">
          <div className="detail">
            <div className="tab">tab here</div>
            <div className="tabContent" />
          </div>
          <div className="related">Related Courses</div>
        </div>
        <div className="selection">Choose Professor</div>
      </div>
    );
  }
}
