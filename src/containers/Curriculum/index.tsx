import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import ModalDetail from '@src/containers/CourseDetail/ModalDetail';

import Planner from './Planner';

interface IProps extends RouteComponentProps<{}> {}

export default class Curriculum extends React.Component<IProps> {
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

  public render() {
    const { match, location } = this.props;

    const isModal =
      this.previousLocation &&
      location.state &&
      location.state.modalDetail &&
      location !== this.previousLocation;

    return (
      <>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route path={`${match.url}/planner`} component={Planner} />
          <Route path={`${match.url}/explore`} />
        </Switch>
        {isModal ? (
          <Route
            location={location}
            path={`${match.url}/d/:year/:term/:courseNumber/:division?`}
            component={ModalDetail}
          />
        ) : null}
      </>
    );
  }
}
