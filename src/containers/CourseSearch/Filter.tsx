import * as React from 'react';

// import * as cn from 'classnames';
import iassign from 'immutable-assign';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Add from '@material-ui/icons/Add';

import CourseLevelSelection from './CourseLevelSelection';
import DepartmentPopover from './DepartmentPopover';

import styles from './Search.style';

const { classes } = styles;

export interface IProps {
  filterOptions: IFilterOptions;
  onChangeOption: OnChangeOptionFunc;
}

interface IState {
  openAddDepartment?: EventTarget;
  openSelectCourseLevel?: EventTarget & HTMLElement;
}

export interface IFilterOptions {
  year: string;
  semester: string;
  department: IDepartmentSet;
  courseLevel: ICourseLevelSet;
  sortOrder: SortOrder;
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

export type FilterOption = string | IDepartmentSet | SortOrder;

export interface IDepartmentSet {
  [key: string]: boolean;
}

export interface ICourseLevelSet {
  [key: string]: boolean;
}

export type SortOrder = 'courseName' | 'courseNumber' | 'grade' | 'load';

export type OnChangeOptionFunc = (
  key: FilterKey,
  payload: IFilterOptions
) => void;

type BuildPayloadFunc = (key: FilterKey, value: FilterOption) => IFilterOptions;

export default class Filter extends React.Component<IProps, IState> {
  public yearItems = ['2018', '2017', '2016', '2015'];
  public semesterItems = ['Fall', 'Spring'];

  /* Actually it should be DeparmentPopover.IListItem */
  public departments: ICustomSelection[] = [
    { key: 'cs', text: 'Computer Science' },
    { key: 'ee', text: 'Electronical Engineering' },
    { key: 'hss', text: 'Humanities & Social Sciences' },
  ];

  public courseLevels: ICustomSelection[] = [
    { key: '100', text: '100' },
    { key: '200', text: '200' },
    { key: '300', text: '300' },
    { key: '400', text: '400' },
    { key: '500', text: '500+' },
  ];

  public sortItems: ICustomSelection[] = [
    { key: 'courseNumber', text: 'Sort by Course Number' },
    { key: 'courseName', text: 'Sort by Course Name' },
    { key: 'grade', text: 'Sort by Course Grade' },
    { key: 'load', text: 'Sort by Course Load' },
  ];

  public state = {
    openAddDepartment: undefined,
    openSelectCourseLevel: undefined,
  };

  public buildPayload: BuildPayloadFunc = (key, value) =>
    iassign(defaultValues, (v: IFilterOptions) => {
      v[key] = value;
      return v;
    });

  public updateDepartment = (key: string, addToSet: boolean) =>
    iassign(
      this.props.filterOptions,
      f => f.department,
      d => {
        d[key] = addToSet;
        return d;
      }
    );

  public handleChangeYear: ChangeEventFunc = e => {
    this.props.onChangeOption(
      'year',
      this.buildPayload('year', e.target.value)
    );
  };

  public handleChangeSemester: ChangeEventFunc = e => {
    this.props.onChangeOption(
      'semester',
      this.buildPayload('semester', e.target.value)
    );
  };

  public handleClickAddDepartment = (e: React.FormEvent<{}>) => {
    this.setState({ openAddDepartment: e.currentTarget });
  };

  public handleCloseAddDepartment = (index?: number) => {
    if (index !== undefined) {
      this.props.onChangeOption(
        'department',
        this.updateDepartment(this.departments[index].key, true)
      );
    }
    this.setState({ openAddDepartment: undefined });
  };

  public handleDeleteDepartment = (key: string) => () => {
    this.props.onChangeOption('department', this.updateDepartment(key, false));
  };

  public handleClickSelectCourseLevel = (e: React.MouseEvent<HTMLElement>) => {
    this.setState({ openSelectCourseLevel: e.currentTarget });
  };

  public handleCloseSelectCourseLevel = () => {
    this.setState({ openSelectCourseLevel: undefined });
  };

  public handleChangeSelectCourseLevel = (key: string, checked: boolean) => {
    this.props.onChangeOption(
      'courseLevel',
      iassign(
        this.props.filterOptions,
        f => f.courseLevel,
        c => {
          c[key] = checked;
          return c;
        }
      )
    );
  };

  public handleChangeSort: ChangeEventFunc = e => {
    this.props.onChangeOption(
      'sortOrder',
      this.buildPayload('sortOrder', e.target.value)
    );
  };

  public render() {
    const { filterOptions } = this.props;
    const { openAddDepartment, openSelectCourseLevel } = this.state;

    return (
      <div className={classes.searchFilter}>
        <Selection
          className="filterItem"
          data={this.yearItems}
          value={filterOptions.year}
          onChange={this.handleChangeYear}
        />
        <Selection
          className="filterItem"
          data={this.semesterItems}
          value={filterOptions.semester}
          onChange={this.handleChangeSemester}
        />

        <div className="filterItem department">
          <Chip
            label={Object.values(filterOptions.department).length}
            avatar={<Avatar style={{ backgroundColor: "rgba(0, 0, 0, 0.0)"}}><Add/></Avatar>}
            className={classes.addDepartmentBtn}
            onClick={this.handleClickAddDepartment}
          />
          <DepartmentPopover
            anchor={
              openAddDepartment ? (openAddDepartment as HTMLElement) : undefined
            }
            data={this.departments}
            onClose={this.handleCloseAddDepartment}
          />
          {this.departments
            .filter(d => filterOptions.department[d.key])
            .map(d => (
              <Chip
                className="chip"
                key={d.key}
                label={d.text}
                onDelete={this.handleDeleteDepartment(d.key)}
              />
            ))}
        </div>
        <div className="filterItem">
          {' '}
          <Button
            variant="outlined"
            color="primary"
            onClick={this.handleClickSelectCourseLevel}
          >
            Selected Course Levels -{' '}
            {Object.values(filterOptions.courseLevel).filter(b => b).length}
          </Button>
          <CourseLevelSelection
            anchor={
              openSelectCourseLevel
                ? (openSelectCourseLevel as HTMLElement)
                : undefined
            }
            data={this.courseLevels}
            selection={filterOptions.courseLevel}
            onClose={this.handleCloseSelectCourseLevel}
            onChange={this.handleChangeSelectCourseLevel}
          />
        </div>
        <Selection
          className="filterItem"
          customData={this.sortItems}
          value={filterOptions.sortOrder}
          onChange={this.handleChangeSort}
        />
      </div>
    );
  }
}

type ChangeEventFunc = (e: React.ChangeEvent<{ value: string }>) => void;

interface ICustomSelection {
  key: string;
  text: string;
}

interface ISelectionProps {
  onChange: ChangeEventFunc;
  data?: string[];
  customData?: ICustomSelection[];
  value: string;
  className?: string;
}

const customMenuItem = (data: ICustomSelection) => (
  <MenuItem key={data.key} value={data.key}>
    {data.text}
  </MenuItem>
);

const menuItem = (s: string) => (
  <MenuItem key={s} value={s}>
    {s}
  </MenuItem>
);

const Selection = ({
  onChange,
  data,
  customData,
  value,
  className,
}: ISelectionProps) => {
  let items: JSX.Element[] | undefined;
  if (customData) {
    items = customData.map(customMenuItem);
  } else if (data) {
    items = data.map(menuItem);
  }

  return (
    <Select value={value} onChange={onChange} className={className}>
      {items}
    </Select>
  );
};
