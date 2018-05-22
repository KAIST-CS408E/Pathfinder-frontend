import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import Detail from '../CourseDetail/Detail';
import ModalDetail from '../CourseDetail/ModalDetail';
import Search, { RouteProps as SearchRouteProps } from '../CourseSearch/Search';

import { IPinComponentProps } from 'pathfinder';

interface IProps extends RouteComponentProps<{}>, IPinComponentProps {}

export default class Courses extends React.Component<IProps> {
  public previousLocation?: IProps['location'] = undefined;

  public componentWillUpdate(nextProps: IProps) {
    const { location } = this.props;

    if (
      nextProps.history.action !== 'POP' &&
      (!location.state || !location.state.modalDetail)
    ) {
      this.previousLocation = location;
    }
  }

  public renderSearch = (props: SearchRouteProps) => {
    return (
      <Search
        {...props}
        pinnedList={this.props.pinnedList}
        onPinnedCourse={this.props.onPinnedCourse}
        onUnpinCourse={this.props.onUnpinCourse}
      />
    );
  };

  public render() {
    const { match, location } = this.props;

    const isModal =
      this.previousLocation &&
      location.state &&
      location.state.modalDetail &&
      location !== this.previousLocation;

    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path={`${match.url}/s/:keyword?`} render={this.renderSearch} />
          <Route
            path={`${match.url}/d/:year/:term/:courseNumber/:division?`}
            component={Detail}
          />
        </Switch>
        {isModal ? (
          <Route
            path={`${match.url}/d/:year/:term/:courseNumber/:division?`}
            component={ModalDetail}
          />
        ) : null}
      </div>
    );
  }
}
