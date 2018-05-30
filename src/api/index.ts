import {
  ICourseCardLecture, INewCourse, IPinnedCourse, IPinnedCourseAPI, ISemesterFeedback, RelevantCourse,
} from 'pathfinder';

import { API_URL } from '@src/constants/api';

export interface IPinCourseResponse {
  success: boolean;
}

export const getAllPin = () =>
  fetch(API_URL + '/pin')
    .then<IPinnedCourseAPI[]>(r => r.json())
    .then<IPinnedCourse[]>(json =>
      json.map(course => {
        const { name, ...rest } = course;
        return {
          ...rest,
          courseName: name,
        };
      })
    );

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

export const moveCourse = (
  courseNumber: string,
  subtitle: string,
  boardId: string,
  division?: string
) =>
  fetch(
    API_URL +
      `/plan/${courseNumber}?subtitle=${subtitle}&to=${boardId}${
        division !== undefined ? `&division=${division}` : ''
      }`,
    { method: 'POST' }
  ).then(r => r.json());

export const deleteCourse = (courseNumber: string, subtitle: string) =>
  fetch(API_URL + `/plan/${courseNumber}?subtitle=${subtitle}`, {
    method: 'DELETE',
  }).then(r => r.json());

export interface IRecommendResponse {
  area: any;
  cf: Array<{
    course: {
      code: string;
      subtitle: string;
      name: string;
      courseNumber: string;
      courseType: string;
    };
    lectures: Array<{
      professor: string;
      division: string;
    }>;
  }>;
}

export const doRecommendation = () =>
  fetch(API_URL + '/board/recommend')
    .then<IRecommendResponse>(r => r.json())
    .then(json => {
      return {
        area: json.area,
        cf: json.cf.map(recommend => {
          return {
            ...recommend.course,
            lectures: recommend.lectures,
          };
        }),
      };
    });

export interface ISimulateResponse {
  [semesterId: string]: ISemesterFeedback[];
}

export const doSimulation = () =>
  fetch(API_URL + '/board/simulate').then<ISimulateResponse>(r => r.json());

export type StatisticsResponse = INewCourse[];

export const getStatistics = () =>
  fetch(API_URL + '/statistics').then<StatisticsResponse>(r => r.json());

export type RelevantResponse = RelevantCourse[];


// type RelevantEntry = [string, string, string, string, number];

export const getRelevant = () =>
  fetch(API_URL + '/relevance').then<RelevantResponse>(r => r.json());

export type CardLecturesResponse = ICourseCardLecture[]

export const getCardLectures = () =>
  fetch(API_URL + '/card/lectures').then<CardLecturesResponse>(r => r.json())