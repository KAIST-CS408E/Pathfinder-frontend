import { ActionType, createAction } from 'typesafe-actions';

import { ICourseDetail, ICourseKeys, ILectureKeys } from 'pathfinder';

const actions = {
  fetchDetailRequest: createAction(
    'courseDetail/fetchDetailRequest',
    resolve => () => resolve()
  ),

  fetchDetailSuccess: createAction(
    'courseDetail/fetchDetailSuccess',
    resolve => (courseDetail: ICourseDetail) => resolve(courseDetail)
  ),

  fetchDetailFailure: createAction(
    'courseDetail/fetchDetailFailure',
    resolve => (error: Error) => resolve(error)
  ),

  initDetail: createAction(
    'courseDetail/initDetail',
    resolve => (data: ILectureKeys & ICourseKeys) => resolve(data)
  ),

  changeLecture: createAction(
    'courseDetail/changeLecture',
    resolve => (key: ILectureKeys) => resolve(key)
  ),

  changeCourse: createAction(
    'courseDetail/changeCourse',
    resolve => (key: ICourseKeys) => resolve(key)
  ),
};

export type Action = ActionType<typeof actions>;
export default actions;
