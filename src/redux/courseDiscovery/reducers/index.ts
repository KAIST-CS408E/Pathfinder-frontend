import iassign from 'immutable-assign';
import { getType } from 'typesafe-actions';

import { INewCourse, RelevantCourse } from 'pathfinder';

import { buildCourseKey } from '@src/utils';
import actions, { Action } from '../actions';

export type State = Readonly<IState>;

export interface IState {
  newCourses: Record<string, INewCourse>;
  newLectures: Record<string, INewCourse>;
  relevantCourses: Record<string, RelevantCourse>;
}

const initialState = {
  newCourses: {},
  newLectures: {},
  relevantCourses: {},
};

export default (state: IState = initialState, action: Action): State => {
  switch (action.type) {
    case getType(actions.setNewCourses): {
      const newCourses = action.payload;
      return iassign(state, prevState => {
        prevState.newCourses = {};
        newCourses.forEach(course => {
          prevState.newCourses[buildCourseKey(course)] = course;
        });
        return prevState;
      });
    }
    case getType(actions.setNewLectures): {
      const newLectures = action.payload;
      return iassign(state, prevState => {
        prevState.newLectures = {};
        newLectures.forEach(course => {
          prevState.newLectures[buildCourseKey(course)] = course;
        });
        return prevState;
      });
    }
    case getType(actions.setRelevantCourses): {
      const newCourses = action.payload;
      return iassign(state, prevState => {
        prevState.relevantCourses = {};
        newCourses.forEach(course => {
          prevState.relevantCourses[buildCourseKey(course)] = course;
        });
        return prevState;
      });
    }
    default:
      return state;
  }
};
