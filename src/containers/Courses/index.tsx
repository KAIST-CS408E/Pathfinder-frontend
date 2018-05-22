import * as React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import Detail from '../CourseDetail/Detail';
import ModalDetail from '../CourseDetail/ModalDetail';
import Search, { RouteProps as SearchRouteProps } from '../CourseSearch/Search';

import { IPinComponentProps } from 'pathfinder';

import { RootState } from '@src/redux';

interface IProps extends RouteComponentProps<{}>, IPinComponentProps {}

class Courses extends React.Component<IProps> {
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
    return <Search {...props} />;
  };

  public render() {
    const { match, location } = this.props;

    const isModal =
      this.previousLocation &&
      location.state &&
      location.state.modalDetail &&
      location !== this.previousLocation;
    console.log(this.previousLocation);
    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route
            location={location}
            path={`${match.url}/s/:keyword?`}
            render={this.renderSearch}
          />
          <Route
            location={location}
            path={`${match.url}/d/:year/:term/:courseNumber/:division?`}
            component={Detail}
          />
        </Switch>
        {isModal ? (
          <Route
            location={location}
            path={`${match.url}/d/:year/:term/:courseNumber/:division?`}
            component={ModalDetail}
          />
        ) : null}
      </div>
    );
  }
}

export default connect((state: RootState) => ({
  location: state.router.location,
}))(Courses);
