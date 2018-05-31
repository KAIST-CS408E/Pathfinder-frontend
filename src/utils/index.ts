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

export const convertSpentTimeToReadable = (timeStr: SpentTime) => {
  switch (timeStr) {
    case '< 1':
      return 'less than 1 hour';
    case '> 7':
      return 'more than 7 hours';
    default:
      return `${timeStr} hours`;
  }
}

export const getReadableSemester = (baseYear: number, baseTerm: string, semester: number) => {
  let year = baseYear;
  const termRest = baseTerm === 'Fall' ? 1 : 0;
  const termAdd = (termRest + semester % 2);
  year += Math.floor(semester / 2) + Math.floor(termAdd / 2)
  return {
    term: termAdd % 2 === 1 ? 'Fall' : 'Spring',
    year,
  }
}

export const range = (n: number) => [...Array(n)].map((_, i) => i);

export function precisionRound(n: number, precision: number) {
  const factor = Math.pow(10, precision);
  return Math.round(n * factor) / factor;
}