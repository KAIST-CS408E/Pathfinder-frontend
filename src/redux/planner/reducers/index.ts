import iassign from 'immutable-assign';
import { getType } from 'typesafe-actions';

import { ICourseCard, ISemester } from 'pathfinder';

import actions, { Action } from '../actions';

export type State = Readonly<IState>;

interface IState {
  boardData: ISemester[];
  currentSemester: number;
}

export const initialState: IState = {
  boardData: [],
  currentSemester: 1
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
    default:
      return state;
  }
};
