import iassign from 'immutable-assign';
import { getType } from 'typesafe-actions';

import { ICourseDetail } from 'pathfinder';

import actions, { Action } from '../actions';

export type State = Readonly<IState>;

interface IState {
  year: number;
  term: string;
  division: string;
  courseNumber: string;
  subtitle: string;

  data: ICourseDetail | null;
  fetching: boolean;
}

export const initialState: IState = {
  courseNumber: '',
  division: '',
  subtitle: '',
  term: '',
  year: 123,

  data: null,
  fetching: false,
};

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case getType(actions.fetchDetailRequest): {
      return iassign(state, (prevState: IState) => {
        prevState.fetching = true;
        return prevState;
      });
    }
    case getType(actions.fetchDetailSuccess): {
      return iassign(state, (prevState: IState) => {
        prevState.data = action.payload;
        prevState.fetching = false;
        return prevState;
      });
    }
    case getType(actions.fetchDetailFailure): {
      return iassign(state, (prevState: IState) => {
        prevState.fetching = false;
        return prevState;
      });
    }
    case getType(actions.initDetail): {
      const { number: courseNumber, ...restData } = action.payload;
      return { ...state, ...restData, courseNumber };
    }
    case getType(actions.changeCourse): {
      const { number: courseNumber, subtitle } = action.payload;
      return iassign(state, (prevState: IState) => {
        prevState.courseNumber = courseNumber;
        prevState.subtitle = subtitle;
        return prevState;
      });
    }
    case getType(actions.changeLecture): {
      const { year, term, division } = action.payload;
      return iassign(state, (prevState: IState) => {
        prevState.division = division;
        prevState.term = term;
        prevState.year = year;
        return prevState;
      });
    }
    default:
      return state;
  }
}
