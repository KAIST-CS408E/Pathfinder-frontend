/* Data structures for pinning */

export interface IPinnedTable {
  [courseKey: string]: IPinnedCourse;
}

export interface IPinnedCourse {
  courseNumber: string;

  courseName: string;
  subtitle: string;

  lectures: ILecture[];
}

export interface IPinComponentProps {
  pinnedList: IPinnedTable;
  onPinnedCourse: PinnedCourseHandler;
  onUnpinCourse: PinnedCourseHandler;
}

export type PinnedCourseHandler = (course: IPinnedCourse) => void;

type CourseNumber = string;
type CourseName = string;
type CourseSubtitle = string;

export interface IPinnedCourseAPI {
  courseNumber: string;
  name: string;
  subtitle: string;
  lectures: ILecture[];
}

/* Data structures for kanban */

export interface IPlannerGetAll {
  boardData: Record<string, ISemester>;
  currentSemester: number;
}

export interface ISemester {
  id: string;
  label?: string;
  semester: number;

  courses: ICourseCard[];

  feedback: ISemesterFeedback[];
}

export interface ICourseCard {
  id: string;
  label?: string;
  description?: string;

  type: 'TAKE' | 'pinned' | 'interested' | 'recommended' | 'none';

  name: string;
  courseNumber: string;
  subtitle: string;

  lectures: ILecture[];
  selectedDivision?: string;

  myGrade?: string; // undefined if not taken

  special?: string; // Use for colored feedback on cards
}

export interface ISemesterFeedback {
  type: 'prerequisite' | 'time';
  ok: boolean;
  reason: any; // may be course number of colliding
}

export type RecommendedCourses = ICourseCard[];

/* Data structures for searching and displaying */

export interface IQueryResult {
  year: string;
  term: string;
  courses: ICourse[];
  take: TakenCourses;
}

export type TakenCourses = Array<[CourseNumber, CourseSubtitle]>;

export interface ICourse {
  name: string;
  subtitle: string;
  number: string;
  courseType: string;
  lectures: ILecture[];
}

export interface ILecture {
  professor: string;

  division: string;
  classTime: IClassTime[];
  limit: number | null;
  load: SpentTime;
  grades: number;
}

export type SpentTime = '< 1' | '1 to 3' | '3 to 5' | '5 to 7' | '> 7';

export interface IClassTime {
  timeType: 'Class' | 'Lab';
  day: 'Mon'| 'Tue'| 'Wed'| 'Thu'| 'Fri';
  startTime: string;
  endTime: string;
}

/* Data structures for the filter */
export interface IFilterOptions {
  year: string;
  semester: string;
  department: IDepartmentSet;
  courseLevel: ICourseLevelSet;
  sortOrder: CourseSortOrder;
}

export const defaultValues: IFilterOptions = {
  courseLevel: {
    ['100']: true,
    ['200']: true,
    ['300']: true,
    ['400']: true,
    ['500']: true,
  },
  department: { cs: true },
  semester: 'Fall',
  sortOrder: 'courseNumber',
  year: '2018',
};

export type FilterKey = keyof IFilterOptions;

export type FilterOption =
  | string
  | IDepartmentSet
  | ICourseLevelSet
  | CourseSortOrder;

export interface IDepartmentSet {
  [key: string]: boolean;
}

export interface ICourseLevelSet {
  [key: string]: boolean;
}

export type CourseSortOrder = 'courseName' | 'courseNumber' | 'grade' | 'load';

/* Course Detail */

export interface ICourseDetail {
  course: ICourseBasic;
  lectures: ILectureDetail[];
  before: PeerCourse[];
  with: PeerCourse[];
  after: PeerCourse[];
}

export interface ICourseKeys {
  number: string;
  subtitle: string;
}

export interface ICourseBasic extends ICourseKeys {
  number: string;
  code: string;
  subtitle: string;
  name: string;
  type: string;
}

export interface ILectureKeys {
  year: number;
  term: string;
  division: string;
}

export interface ILectureDetail extends ILectureKeys {
  professor: string;
  classTime: string[];
  isEnglish: string;

  // Statistics
  abandonmentRate?: number;
  averageGrade?: number;
  competitionRatio?: number;
  dropChange?: [number, number];
  grades?: number[];
  sizeChange?: number[];
  spendTime?: SpentTime;
}

/* CourseNumber CourseName NumOfTaken */
type PeerCourse = [CourseNumber, CourseName, CourseSubtitle, number];
