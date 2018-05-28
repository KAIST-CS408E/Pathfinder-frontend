import * as React from 'react';

import * as moment from 'moment';

import { Tooltip } from '@material-ui/core';

import { IClassTime } from 'pathfinder';

import styles from './ClassTime.style';

const { classes } = styles;

export interface IProps {
  classTimes: IClassTime[];
}

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const timeScheme = 'hh:mm';
const partition = [
  [moment('09:00', timeScheme), moment('10:30', timeScheme)],
  [moment('10:30', timeScheme), moment('12:00', timeScheme)],
  [moment('13:00', timeScheme), moment('14:30', timeScheme)],
  [moment('14:30', timeScheme), moment('16:00', timeScheme)],
  [moment('16:00', timeScheme), moment('17:30', timeScheme)],
  [moment('17:30', timeScheme), moment('22:00', timeScheme)],
];

interface IClassTimesInWeek {
  [key: string]: IClassTimeInDay[];
}

interface IClassTimeInDay {
  start: moment.Moment;
  end: moment.Moment;
}

export default class ClassTime extends React.Component<IProps> {
  public render() {
    const { classTimes } = this.props;
    const timeInWeek: IClassTimesInWeek = {};
    classTimes.forEach(classTime => {
      timeInWeek[classTime.day] = (timeInWeek[classTime.day] || []).concat([
        {
          end: moment(classTime.endTime, timeScheme),
          start: moment(classTime.startTime, timeScheme),
        },
      ]);
    });

    const tooltipString = classTimes
      .map(
        classTime =>
          `${classTime.timeType} ${classTime.day} ${classTime.startTime} ${
            classTime.endTime
          }`
      )
      .join(',\n');

    const weekMatrix = {};

    days.forEach(day => {
      weekMatrix[day] = {};
      partition.forEach((area, areaIndex) => {
        const highlight = (timeInWeek[day] || []).some(
          classTime =>
            area[0].isSameOrBefore(classTime.start) &&
            area[1].isSameOrAfter(classTime.end)
        );
        weekMatrix[day][areaIndex] = highlight;
      });
    });

    return (
      <Tooltip id="tooltip-icon" title={tooltipString} placement="bottom">
        <table className={classes.timeTable}>
          <tbody>
            {partition.map((area, areaIndex) => (
              <tr key={area[0].toISOString()}>
                {days.map(day => (
                  <th
                    key={day}
                    className={
                      weekMatrix[day][areaIndex]
                        ? classes.classTimeCell
                        : undefined
                    }
                  >
                    -
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Tooltip>
    );
  }
}
