import { ActionType, createAction } from 'typesafe-actions';

import { INewCourse, RelevantCourse } from 'pathfinder';

const actions = {
  setNewCourses: createAction(
    'courseDiscovery/setNewCourses',
    resolve => (newCourses: INewCourse[]) => resolve(newCourses)
  ),

  setNewLectures: createAction(
    'courseDiscovery/setNewLectures',
    resolve => (newCourses: INewCourse[]) => resolve(newCourses)
  ),

  setRelevantCourses: createAction(
    'courseDiscovery/setRelevantCourses',
    resolve => (relevantCourses: RelevantCourse[]) => resolve(relevantCourses)
  ),
};

export type Action = ActionType<typeof actions>;
export default actions;
