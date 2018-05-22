import { ActionType, createAction } from 'typesafe-actions';

import { FilterKey, IFilterOptions, IQueryResult } from 'pathfinder';

const actions = {
  changeFilter: createAction(
    'courseSearch/changeFilter',
    resolve => (payload: IFilterOptions) => resolve(payload)
  ),
  changeFilterOption: createAction(
    'courseSearch/changeFilterOption',
    resolve => (key: FilterKey, payload: IFilterOptions) =>
      resolve({ key, payload })
  ),

  changeQueryKeyword: createAction(
    'courseSearch/changeQueryKeyword',
    resolve => (text: string) => resolve(text)
  ),
  changeQueryResult: createAction(
    'courseSearch/changeQueryResult',
    resolve => (queryResult: IQueryResult) => resolve(queryResult)
  )
};

export type Action = ActionType<typeof actions>;
export default actions;