
export const buildCourseKey = ({
                          courseNumber,
                          subtitle,
                        }: {
  courseNumber: string;
  subtitle: string;
}) => courseNumber + "|" + subtitle;
