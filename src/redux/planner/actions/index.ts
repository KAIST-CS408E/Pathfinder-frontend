import { ActionType, createAction } from 'typesafe-actions';

import { ICourseCard, ISemester } from 'pathfinder';

import { ISimulateResponse } from '@src/api';

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

  setManyFeedbacks: createAction(
    'planner/setManyFeedbacks',
    resolve => (allFeedbacks: ISimulateResponse) => resolve(allFeedbacks)
  ),

  removeAllFeedback: createAction('planner/removeAllFeedback', resolve => () =>
    resolve()
  ),
  removeFeedback: createAction(
    'planner/removeFeedback',
    resolve => (semesterId: string) => resolve(semesterId)
  ),

  selectDivision: createAction(
    'planner/selectDivision',
    resolve => (semesterId: string, courseId: string, division: string) =>
      resolve({ semesterId, courseId, division })
  ),
};

export type Action = ActionType<typeof actions>;
export default actions;
