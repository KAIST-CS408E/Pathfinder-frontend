/* Data structures for pinning */

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

type CourseNumber = string;
type CourseName = string;
type CourseSubtitle = string;

export type PinEntryAPI = [CourseNumber, CourseName, CourseSubtitle];

/* Data structures for kanban */

export interface IPlannerGetAll {
  boardData: ISemester[];
  currentSemester: number;
}

export interface ISemester {
  id: string;
  label?: string;
  semester: number;

  courses: ICourseCard[];

  feedback: ISemesterFeedback[]
}

export interface ICourseCard {
  id: string;
  label?: string;
  description?: string;

  type: 'pinned' | 'interested';

  name: string;
  courseNumber: string;
  subtitle: string;

  lectures: ILecture[];
  selectedProfessor: string;

  myGrade?: string; // undefined if not taken

  special: string; // Use for colored feedback on cards
}

export interface ISemesterFeedback {
  type: 'prerequisite' | 'time';
  ok: boolean;
  reason: any; // may be course number of colliding
}

export type RecommendedCourses = ICourseCard[]

/* Data structures for searching and displaying */

export interface IQueryResult {
  year: string;
  term: string;
  courses: ICourse[];
  take: TakenCourses
}

export type TakenCourses = Array<[CourseNumber, CourseSubtitle]>;

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
  sortOrder: 'courseName',
  year: '2017',
};

export type FilterKey = keyof IFilterOptions;

export type FilterOption = string | IDepartmentSet | ICourseLevelSet | CourseSortOrder;

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
  year: string;
  term: string;
  division: string;
}

export interface ILectureDetail extends ILectureKeys {
  competitionRatio: '-';
  sizeChange: string[];
  professor: string;
  grade: string[];
  dropChange: string[];
  classTime: string[];
  isEnglish: string;
}

/* CourseNumber CourseName NumOfTaken */
type PeerCourse = [CourseNumber, CourseName, CourseSubtitle, number];
