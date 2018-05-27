import { SpentTime } from 'pathfinder';

export const buildCourseKey = ({
  courseNumber,
  subtitle,
}: {
  courseNumber: string;
  subtitle: string;
}) => courseNumber + '|' + subtitle;

export const convertSpentTime = (timeStr: SpentTime) => {
  switch (timeStr) {
    case '< 1':
      return 1;
    case '1 to 3':
      return 2;
    case '3 to 5':
      return 4;
    case '5 to 7':
      return 6;
    case '> 7':
      return 8;
    default:
      return 1;
  }
};

export const range = (n: number) => [...Array(n)].map((_, i) => i);
