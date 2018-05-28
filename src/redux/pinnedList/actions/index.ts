import { ActionType, createAction } from 'typesafe-actions';

import { IPinnedCourse } from 'pathfinder';

const actions = {
  pinMultipleCourses: createAction(
    'pin/pinMultipleCourses',
    resolve => (entries: IPinnedCourse[]) => resolve(entries)
  ),

  pinCourse: createAction('pin/pinCourse', resolve => (course: IPinnedCourse) =>
    resolve(course)
  ),
  unpinCourse: createAction(
    'pin/unpinCourse',
    resolve => (course: IPinnedCourse) => resolve(course)
  ),
};

export type Action = ActionType<typeof actions>;
export default actions;
