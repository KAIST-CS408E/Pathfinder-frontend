import * as React from 'react';
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import Planner from './Planner';

export default class Curriculum extends React.Component<RouteComponentProps<{}>> {
  public render() {
    const { match } = this.props;

    return <>
      <Switch>
        <Route path={`${match.url}/planner`} component={Planner}/>
        <Route path={`${match.url}/explore`} />
      </Switch>
    </>;
  }
}