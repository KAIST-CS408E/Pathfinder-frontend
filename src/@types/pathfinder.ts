export interface IPinnedTable {
  [courseNumber: string]: IPinnedCourse;
}

export interface IPinnedCourse {
  courseNumber: string;

  courseName: string;
  subtitle: string;
}

export interface IPinComponentProps {
  pinnedList: IPinnedTable;
  onPinnedCourse: PinnedCourseHandler;
  onUnpinCourse: PinnedCourseHandler;
}

export type PinnedCourseHandler = (course: IPinnedCourse) => void;

export interface IQueryResult {
  year: string;
  term: string;
  courses: ICourse[];
}

export interface ICourse {
  name: string;
  subtitle: string;
  number: string;
  lectures: ILecture[];
}

export interface ILecture {
  professor: string;

  division: string | '';
  classTime: string[];
  limit: number | null;

  load: number;
  grades: number;
}
