import {
  LocationChangeAction,
  RouterAction,
  routerReducer,
  RouterState,
} from 'react-router-redux';
import { combineReducers } from 'redux';

import * as courseDetail from './courseDetail';
import * as courseDiscovery from './courseDiscovery';
import * as courseSearch from './courseSearch';
import * as pinnedList from './pinnedList';
import * as planner from './planner';

export const rootActions = {
  ...courseDetail.actions,
  ...courseDiscovery.actions,
  ...courseSearch.actions,
  ...pinnedList.actions,
};

export type RootState = Readonly<{
  courseDetail: courseDetail.State;
  courseDiscovery: courseDiscovery.State;
  courseSearch: courseSearch.State;
  pinnedList: pinnedList.State;
  planner: planner.State;
  router: RouterState;
}>;

type ReactRouterActions = RouterAction | LocationChangeAction;
export type RootAction =
  | pinnedList.Action
  | planner.Action
  | courseDetail.Action
  | courseDiscovery.Action
  | courseSearch.Action
  | ReactRouterActions;

export const rootReducer = combineReducers<RootState, RootAction>({
  courseDetail: courseDetail.reducer,
  courseDiscovery: courseDiscovery.reducer,
  courseSearch: courseSearch.reducer,
  pinnedList: pinnedList.reducer,
  planner: planner.reducer,
  router: routerReducer,
});
