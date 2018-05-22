import iassign from 'immutable-assign';
import { getType } from 'typesafe-actions';

import { IPinnedTable, PinEntryAPI } from 'pathfinder';

import { buildCourseKey } from '@src/utils';
import actions, { Action } from '../actions';

export type State = Readonly<IPinnedTable>;

export default (state: State = {}, action: Action): State => {
  switch (action.type) {
    case getType(actions.pinMultipleCourses): {
      const entries = action.payload;
      return iassign(state, (pinnedList: IPinnedTable) => {
        entries.map((pinEntry: PinEntryAPI) => {
          const datum = {
            courseName: pinEntry[1],
            courseNumber: pinEntry[0],
            subtitle: pinEntry[2],
          };
          pinnedList[buildCourseKey(datum)] = datum;
        });
        return pinnedList;
      });
    }
    case getType(actions.pinCourse): {
      const course = action.payload;

      return iassign(
        state,
        pinnedList => pinnedList,
        (pinnedList: IPinnedTable) => {
          pinnedList[buildCourseKey(course)] = course;
          return pinnedList;
        }
      );
    }
    case getType(actions.unpinCourse): {
      const course = action.payload;

      return iassign(
        state,
        pinnedList => pinnedList,
        (pinnedList: IPinnedTable) => {
          delete pinnedList[buildCourseKey(course)];
          return pinnedList;
        }
      );
    }
    default:
      return state;
  }
};
