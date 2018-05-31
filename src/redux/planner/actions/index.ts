import { ActionType, createAction } from 'typesafe-actions';

import { ICourseCard, ICourseCardLecture, ISemester } from 'pathfinder';

import { ISimulateResponse } from '@src/api';

const actions = {
  initBoard: createAction(
    'planner/initBoard',
    resolve => (boardData: ISemester[], currentSemester: number) =>
      resolve({ boardData, currentSemester })
  ),
  setManyCourseCards: createAction(
    'planner/setManyCourseCards',
    resolve => (semesterId: string, courses: ICourseCard[]) =>
      resolve({ semesterId, courses })
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

  setRecommendedCourse: createAction(
    'planner/setRecommendedCourse',
    resolve => (semesterId: string, courses: ICourseCard[]) =>
      resolve({ semesterId, courses })
  ),
  setToNormalCourse: createAction(
    'planner/setToNormalCourse',
    resolve => (semesterId: string, courseIndex: number) =>
      resolve({ semesterId, courseIndex })
  ),

  setCardLectures: createAction(
    'planner/setCardLectures',
    resolve => (cardLectures: ICourseCardLecture[]) => resolve(cardLectures)
  ),

  addCardLectures: createAction(
    'planner/addCardLectures',
    resolve => (cardLecture: ICourseCardLecture) => resolve(cardLecture)
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
    resolve => (
      semesterId: string,
      courseId: string,
      professor: string,
      division: string
    ) => resolve({ semesterId, courseId, professor, division })
  ),
};

export type Action = ActionType<typeof actions>;
export default actions;
