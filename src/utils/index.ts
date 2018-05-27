
export const buildCourseKey = ({
                          courseNumber,
                          subtitle,
                        }: {
  courseNumber: string;
  subtitle: string;
}) => courseNumber + "|" + subtitle;

export const range = (n: number) => [...Array(n)].map((_, i) => i);