import { IPinnedCourse } from 'pathfinder';

import { API_URL } from '@src/constants/api';

export interface IPinCourseResponse {
  success: boolean;
}

export const getAllPin = () => fetch(API_URL + '/pin').then(r => r.json());

export const pinCourse = (course: IPinnedCourse): Promise<IPinCourseResponse> =>
  // only if it does not exist in list
  fetch(`${API_URL}/pin/${course.courseNumber}?subtitle=${course.subtitle}`, {
    method: 'POST',
  })
    .then(r => r.json())
    .catch(e => console.error(e));

export const unpinCourse = (
  course: IPinnedCourse
): Promise<IPinCourseResponse> =>
  fetch(`${API_URL}/pin/${course.courseNumber}?subtitle=${course.subtitle}`, {
    method: 'DELETE',
  })
    .then(r => r.json())
    .catch(e => console.error(e));

export const getBoard = () => fetch(API_URL + '/board').then(r => r.json());
