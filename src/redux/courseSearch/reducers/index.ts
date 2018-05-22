import iassign from 'immutable-assign';
import { getType } from 'typesafe-actions';

import { IFilterOptions, IQueryResult } from 'pathfinder';

import actions, { Action } from '../actions';

export type State = Readonly<IRootState>;

interface IRootState {
  filterOptions: Readonly<IFilterOptions>;
  queryKeyword: string;
  queryResult?: Readonly<IQueryResult>;
}

export const initialState: State = {
  filterOptions: {
    courseLevel: {
      ['100']: true,
      ['200']: true,
      ['300']: true,
      ['400']: true,
      ['500']: true,
    },
    department: { cs: true },
    semester: 'Fall',
    sortOrder: 'courseName',
    year: '2017',
  },
  queryKeyword: '',
  queryResult: undefined,
};

export default function reducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case getType(actions.changeFilter): {
      const options = action.payload;
      return iassign(
        state,
        prevState => prevState.filterOptions,
        () => options
      );
    }
    case getType(actions.changeFilterOption): {
      const { key, payload } = action.payload;
      return iassign(
        state,
        prevState => prevState.filterOptions,
        (filterOptions: IFilterOptions) => {
          filterOptions[key] = payload[key];
          return filterOptions;
        }
      );
    }
    case getType(actions.changeQueryKeyword): {
      return iassign(
        state,
        (prevState: IRootState) => {
          prevState.queryKeyword = action.payload;
          return prevState;
        }
      )
    }
    case getType(actions.changeQueryResult): {
      const queryResult = action.payload;
      return iassign(
        state,
        prevState => prevState.queryResult,
        () => queryResult
      );
    }
    default:
      return state;
  }
}
