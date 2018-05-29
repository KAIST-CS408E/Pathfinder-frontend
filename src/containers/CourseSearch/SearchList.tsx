import * as React from 'react';

import { ICourse, IPinnedTable, IQueryResult, TakenCourses } from 'pathfinder';

import { State } from '@src/redux/courseDiscovery';
import { buildCourseKey } from '@src/utils';

import ListItem, {
  ClickHandlerBuilder,
  ClickPinHandlerBuilder,
} from './SearchListItem';

interface IProps {
  data?: IQueryResult['courses'];
  pinnedList: IPinnedTable;
  takenCourses?: TakenCourses;

  newCourses: State['newCourses'];
  newLectures: State['newLectures'];
  relevantCourses: State['relevantCourses'];

  onClickEntry: ClickEntryHandler;
  onClickPin: ClickPinHandler;
}

export type ClickEntryHandler = (course: ICourse, lectureIndex: number) => void;

export type ClickPinHandler = (course: ICourse) => void;

export default class SearchList extends React.Component<IProps> {
  public handleClickEntry: ClickHandlerBuilder = (course, index) => () => {
    const { onClickEntry } = this.props;

    if (onClickEntry) {
      onClickEntry(course, index);
    }
  };

  public handleClickPin: ClickPinHandlerBuilder = course => () => {
    const { onClickPin } = this.props;
    if (onClickPin) {
      onClickPin(course);
    }
  };

  public render() {
    const {
      data,
      pinnedList,
      takenCourses,
      newCourses,
      newLectures,
      relevantCourses,
    } = this.props;

    let renderData: JSX.Element | JSX.Element[] = (
      <span>{'Data is not loaded yet'}</span>
    );

    if (data && takenCourses) {
      renderData = data.map(course => {
        const courseKey = buildCourseKey({
          courseNumber: course.number,
          subtitle: course.subtitle,
        });
        return (
          <ListItem
            clickHandlerBuilder={this.handleClickEntry}
            clickPinHandlerBuilder={this.handleClickPin}
            course={course}
            key={courseKey}
            taken={takenCourses.some(
              courseArr =>
                courseArr[0] === course.number &&
                courseArr[1] === course.subtitle
            )}
            pinned={Boolean(pinnedList[courseKey])}
            newCourse={newCourses[courseKey] !== undefined}
            newLecture={newLectures[courseKey]}
            recommended={relevantCourses[courseKey] !== undefined}
          />
        );
      });
    }

    return <div className="list">{renderData}</div>;
  }
}
