import iassign from 'immutable-assign';
import { getType } from 'typesafe-actions';

import { ICourseCard, ICourseCardLectureTable, ISemester } from 'pathfinder';

import { buildCourseKey } from '@src/utils';

import actions, { Action } from '../actions';

export type State = Readonly<IState>;

interface IState {
  boardData: ISemester[];
  cardLectureTable: ICourseCardLectureTable;
  currentSemester: number;
}

export const initialState: IState = {
  boardData: [],
  cardLectureTable: {},
  currentSemester: 1,
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case getType(actions.initBoard): {
      const { boardData, currentSemester } = action.payload;
      return iassign(state, (prevState: IState) => {
        prevState.boardData = boardData;
        prevState.currentSemester = currentSemester;
        return prevState;
      });
    }
    case getType(actions.setManyCourseCards): {
      const { semesterId, courses } = action.payload;
      const semesterIndex = state.boardData.findIndex(
        semester => semester.id === semesterId
      );
      return iassign(
        state,
        prevState => prevState.boardData[semesterIndex],
        (semester: ISemester) => {
          semester.courses = courses;
          return semester;
        }
      );
    }
    case getType(actions.addCourse): {
      const { semesterId, courseIndex, courseCard } = action.payload;
      const semesterIndex = state.boardData.findIndex(
        semester => semester.id === semesterId
      );
      return iassign(
        state,
        prevState => prevState.boardData[semesterIndex].courses,
        (courses: ICourseCard[]) => {
          courses.splice(courseIndex, 0, courseCard);
          return courses;
        }
      );
    }
    case getType(actions.removeCourse): {
      const { semesterId, courseIndex } = action.payload;
      const semesterIndex = state.boardData.findIndex(
        semester => semester.id === semesterId
      );
      return iassign(
        state,
        prevState => prevState.boardData[semesterIndex].courses,
        (courses: ICourseCard[]) => {
          courses.splice(courseIndex, 1);
          return courses;
        }
      );
    }
    case getType(actions.setCardLectures): {
      const cardLectures = action.payload;
      return iassign(
        state,
        prevState => prevState.cardLectureTable,
        (cardLectureTable: ICourseCardLectureTable) => {
          cardLectures.forEach(cardLecture => {
            cardLectureTable[buildCourseKey(cardLecture.course)] = cardLecture;
          });
          return cardLectureTable;
        }
      );
    }
    case getType(actions.addCardLectures): {
      const cardLecture = action.payload;
      return iassign(
        state,
        prevState => prevState.cardLectureTable,
        (cardLectureTable: ICourseCardLectureTable) => {
          cardLectureTable[buildCourseKey(cardLecture.course)] = cardLecture;
          return cardLectureTable;
        }
      );
    }

    case getType(actions.setRecommendedCourse): {
      const { semesterId, courses } = action.payload;

      const origin = {};
      courses.forEach(course => {
        origin[buildCourseKey(course)] = null;
      });

      state.boardData.forEach(semester => {
        semester.courses.forEach(course => {
          const courseKey = buildCourseKey(course);
          if (origin[courseKey] === null) {
            origin[courseKey] = semester.id;
          }
        });
      });

      return iassign(state, (prevState: IState) => {
        prevState.boardData = prevState.boardData.map(semester => {
          return iassign(semester, prevSemester => {
            prevSemester.courses = prevSemester.courses.filter(
              course => !origin[buildCourseKey(course)]
            );
            if (semesterId === semester.id) {
              prevSemester.courses = prevSemester.courses.concat(
                courses.map(courseCard => ({
                  ...courseCard,
                  takenFrom: origin[buildCourseKey(courseCard)],
                  type: 'recommended' as 'recommended',
                }))
              );
            }
            return prevSemester;
          });
        });
        return prevState;
      });
    }

    case getType(actions.setManyFeedbacks): {
      const allFeedbacks = action.payload;
      let reduction = state;
      Object.entries(allFeedbacks).forEach(([semesterId, feedbacks]) => {
        const semesterIndex = state.boardData.findIndex(
          semester => semester.id === semesterId
        );
        reduction = iassign(
          reduction,
          prevState => prevState.boardData[semesterIndex],
          (semester: ISemester) => {
            semester.feedback = feedbacks;
            return semester;
          }
        );
      });
      return reduction;
    }
    case getType(actions.removeAllFeedback): {
      let reduction = state;
      state.boardData.forEach((_, i) => {
        reduction = iassign(
          reduction,
          prevState => prevState.boardData[i],
          (semester: ISemester) => {
            semester.feedback = [];
            return semester;
          }
        );
      });
      return reduction;
    }
    case getType(actions.removeFeedback): {
      const semesterId = action.payload;
      const semesterIndex = state.boardData.findIndex(
        semester => semester.id === semesterId
      );
      return iassign(
        state,
        prevState => prevState.boardData[semesterIndex],
        (semester: ISemester) => {
          semester.feedback = [];
          return semester;
        }
      );
    }
    case getType(actions.selectDivision): {
      const { semesterId, courseId, professor, division } = action.payload;
      const semesterIndex = state.boardData.findIndex(
        semester => semester.id === semesterId
      );
      const courseIndex = state.boardData[semesterIndex].courses.findIndex(
        course => course.id === courseId
      );
      return iassign(
        state,
        prevState => prevState.boardData[semesterIndex].courses[courseIndex],
        course => {
          course.selectedDivision = division;
          course.selectedProfessor = professor;
          return course;
        }
      );
    }
    default:
      return state;
  }
};
