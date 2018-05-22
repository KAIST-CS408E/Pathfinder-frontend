import {
  LocationChangeAction,
  RouterAction,
  routerReducer,
  RouterState,
} from 'react-router-redux';
import { combineReducers } from 'redux';

import * as courseDetail from './courseDetail';
import * as courseSearch from './courseSearch';
import * as pinnedList from './pinnedList';

export const rootActions = {
  ...courseDetail.actions,
  ...courseSearch.actions,
  ...pinnedList.actions,
};

export type RootState = Readonly<{
  courseDetail: courseDetail.State;
  courseSearch: courseSearch.State;
  pinnedList: pinnedList.State;
  router: RouterState;
}>;

type ReactRouterActions = RouterAction | LocationChangeAction;
export type RootAction =
  | pinnedList.Action
  | courseDetail.Action
  | courseSearch.Action
  | ReactRouterActions;

export const rootReducer = combineReducers<RootState, RootAction>({
  courseDetail: courseDetail.reducer,
  courseSearch: courseSearch.reducer,
  pinnedList: pinnedList.reducer,
  router: routerReducer,
});
