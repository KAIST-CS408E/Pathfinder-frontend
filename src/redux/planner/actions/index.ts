import { ActionType, createAction } from 'typesafe-actions';

import { ICourseCard, ISemester } from 'pathfinder';

const actions = {
  initBoard: createAction(
    'planner/initBoard',
    resolve => (boardData: ISemester[], currentSemester: number) =>
      resolve({ boardData, currentSemester })
  ),

  addCourse: createAction(
    'planner/addCourse',
    resolve => (
      semesterId: string,
      courseIndex: number,
      courseCard: ICourseCard
    ) => resolve({ semesterId, courseIndex, courseCard })
  ),
  removeCourse: createAction(
    'planner/removeCourse',
    resolve => (semesterId: string, courseIndex: number) =>
      resolve({ semesterId, courseIndex })
  ),
};

export type Action = ActionType<typeof actions>;
export default actions;
