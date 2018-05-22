import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import * as iassign from 'immutable-assign';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import { IPinComponentProps, IQueryResult } from 'pathfinder';

import Filter, {
  defaultValues,
  FilterKey,
  IFilterOptions,
  OnChangeOptionFunc,
} from './Filter';
import SearchList, { ClickEntryHandler, ClickPinHandler } from './SearchList';
import Sidebar from './Sidebar';

import { buildCourseKey } from '../../utils/index';
import styles from './Search.style';

const { classes } = styles;

export type RouteProps = RouteComponentProps<{ keyword: string }>;

export interface IProps extends RouteProps, IPinComponentProps {}

interface ISearchState {
  showFilterMenu: boolean;
  filterSelection: FilterKey;
  filterOptions: IFilterOptions;
  queryKeyword: string;
  queryResult?: IQueryResult;
  // pinnedList: IPinnedTable;
  nothing: string;
}

export default class Search extends React.Component<IProps, ISearchState> {

  constructor(props: IProps) {
    super(props);

    const filterOptions: IFilterOptions = defaultValues;

    if (props.location && props.location.search) {
      const params = new URLSearchParams(props.location.search);
      for (const [k, v] of params) {
        switch (k) {
          case 'courseLevel':
          case 'department':
            filterOptions[k] = decodeURI(v)
              .split(',')
              .reduce(
                (r: object, key) => Object.assign(r, { [key]: true }),
                {}
              );
            break;
          default:
            filterOptions[k] = decodeURI(v);
        }
      }
    }

    let queryKeyword: string = '';

    if (props.match && props.match.params && props.match.params.keyword) {
      queryKeyword = decodeURI(props.match.params.keyword);
    }

    this.state = {
      filterOptions,
      filterSelection: 'year',
      nothing: '123',
      // pinnedList: {},
      queryKeyword,
      queryResult: undefined,
      showFilterMenu: false,
    };
  }

  public componentDidMount() {
    this.fetchQueryResult(this.getStateQuery());
  }

  public componentDidUpdate(prevProps: IProps, prevState: ISearchState) {
    const query = this.props.location.search;
    if (this.props.match !== prevProps.match) {
      this.fetchQueryResult(query);
    }
  }

  public getStateQuery = () => {
    const { filterOptions } = this.state;
    const {
      year,
      semester,
      department,
      courseLevel,
      sortOrder,
    } = filterOptions;

    const departmentStr = Object.entries(department)
      .reduce((r: string[], [k, v]) => (v ? [...r, k] : r), [])
      .join(',');

    const courseLevelStr = Object.entries(courseLevel)
      .reduce((r: string[], [k, v]) => (v ? [...r, k] : r), [])
      .join(',');

    const urls = new URLSearchParams();
    const data = {
      courseLevel: courseLevelStr,
      department: departmentStr,
      semester,
      sortOrder,
      year,
    };

    for (const [k, v] of Object.entries(data)) {
      urls.set(k, v);
    }

    return `?${urls.toString()}`;
  };

  public getSearchQuery = () => {
    const { filterOptions, queryKeyword } = this.state;
    const { department, courseLevel, sortOrder } = filterOptions;

    const departmentStr = Object.entries(department)
      .reduce((r: string[], [k, v]) => (v ? [...r, k] : r), [])
      .join(',');

    const courseLevelStr = Object.entries(courseLevel)
      .reduce((r: string[], [k, v]) => (v ? [...r, k] : r), [])
      .join(',');

    const urls = new URLSearchParams();
    const data = {
      courseLevel: courseLevelStr,
      department: departmentStr,
      keyword: queryKeyword,
      sortOrder,
    };

    for (const [k, v] of Object.entries(data)) {
      urls.set(k, v);
    }

    return `?${urls.toString()}`;
  };

  public fetchQueryResult = (query: string) => {
    console.group('courseQuery');
    console.log('Send course query');

    const { year, semester: term } = this.state.filterOptions;
    const url =
      'https://ny3acklsf2.execute-api.ap-northeast-2.amazonaws.com/api/courses/';

    fetch(`${url}${year}/${term}/${this.getSearchQuery()}`)
      .then(r => r.json())
      .then(d => {

        this.setState({ queryResult: d });
      })
      .catch(e => {
        console.log(e);
      });

    console.groupEnd();
  };

  public gotoSearch = (query: string) => {
    if (this.props.history) {
      this.props.history.push(`/courses/s${query}`);
    }
  };

  public gotoDetail = (path: string) => {
    if (this.props.history) {
      this.props.history.push(`/courses/d${path}`, { modalDetail: true });
    }
  };

  public handleChangeKeyword = (e: React.FormEvent<{ value: string }>) => {
    this.setState({ queryKeyword: e.currentTarget.value });
  };

  public handleChangeOption: OnChangeOptionFunc = (filterKey, payload) => {
    this.setState(
      iassign(
        this.state,
        s => s.filterOptions,
        (filterOptions: IFilterOptions) => {
          filterOptions[filterKey] = payload[filterKey];
          return filterOptions;
        }
      )
    );
  };

  public handleClickSearch = () => {
    const keyword = this.state.queryKeyword;
    this.gotoSearch(`/${encodeURIComponent(keyword)}${this.getStateQuery()}`);
  };

  public handleClickEntry: ClickEntryHandler = (course, i) => {
    if (this.state.queryResult) {
      const { year, term } = this.state.queryResult;
      const lecture = course.lectures[i];
      this.gotoDetail(
        `/${year}/${term}/${course.number}/${lecture.division}?subtitle=${
          course.subtitle
        }`
      );
    } else {
      alert('you need to fetch in the first');
    }
  };

  public handleClickPin: ClickPinHandler = course => {
    // TODO:: DO API POST
    console.log(course);
    const datum = {
      courseName: course.name,
      courseNumber: course.number,
      subtitle: course.subtitle,
    };
    if (!this.props.pinnedList[buildCourseKey(datum)]) {
      this.props.onPinnedCourse(datum);
    } else {
      this.props.onUnpinCourse(datum);
    }
  };

  public renderHeader() {
    const { filterOptions, queryKeyword } = this.state;

    return (
      <Card className={classes.searchCard}>
        <CardContent>
          <div className={classes.searchBox}>
            <div className={classes.optionContainer}>
              <TextField
                placeholder="search for course name, number or instructor."
                className={classes.searchInput}
                value={queryKeyword}
                onChange={this.handleChangeKeyword}
              />
              <Filter
                filterOptions={filterOptions}
                onChangeOption={this.handleChangeOption}
              />
            </div>
            <Button
              className={classes.searchBtn}
              variant="raised"
              color="primary"
              onClick={this.handleClickSearch}
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  public renderResult() {
    const { queryResult } = this.state;
    const { pinnedList } = this.props;

    return (
      <div className={classes.resultContainer}>
        <SearchList
          data={queryResult ? queryResult.courses : undefined}
          pinnedList={pinnedList || {}}
          onClickEntry={this.handleClickEntry}
          onClickPin={this.handleClickPin}
        />
        <div className="map">
          <Sidebar />
        </div>
      </div>
    );
  }

  public render() {
    return (
      <div className={classes.search}>
        {this.renderHeader()}
        {this.renderResult()}
      </div>
    );
  }
}
