import * as React from 'react';

import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { push } from 'react-router-redux';

import { bindActionCreators } from 'redux';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import { IFilterOptions, IPinComponentProps, IQueryResult } from 'pathfinder';

import { API_URL } from '@src/constants/api';
import { RootState } from '@src/redux';
import { rootActions as actions } from '@src/redux';
import { buildCourseKey } from '@src/utils';

import Filter, { defaultValues, OnChangeOptionFunc } from './Filter';
import SearchList, { ClickEntryHandler, ClickPinHandler } from './SearchList';
import Sidebar from './Sidebar';

import styles from './Search.style';

const { classes } = styles;

export type RouteProps = RouteComponentProps<{ keyword: string }>;

export interface IProps extends RouteProps, IPinComponentProps {
  filterOptions: IFilterOptions;
  queryKeyword: string;
  queryResult?: IQueryResult;

  onChangeFilter: typeof actions.changeFilter;
  onChangeFilterOption: typeof actions.changeFilterOption;
  onChangeQueryKeyword: typeof actions.changeQueryKeyword;
  onChangeQueryResult: typeof actions.changeQueryResult;

  onPinnedCourse: typeof actions.pinCourse;
  onUnpinCourse: typeof actions.unpinCourse;

  push: typeof push;
}

class Search extends React.Component<IProps> {
  public componentDidMount() {
    const {
      location,
      match,
      onChangeFilter,
      onChangeQueryKeyword,
    } = this.props;
    const filterOptions: IFilterOptions = defaultValues;

    if (location && location.search) {
      const params = new URLSearchParams(location.search);
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

    if (match && match.params && match.params.keyword) {
      queryKeyword = decodeURI(match.params.keyword);
    }

    onChangeFilter(filterOptions);
    onChangeQueryKeyword(queryKeyword);
    this.fetchQueryResult(this.getSearchQuery());
  }

  public commaSeperated = (obj: object) =>
    Object.entries(obj)
      .reduce((r: string[], [k, v]) => (v ? [...r, k] : r), [])
      .join(',');

  public getURLSearchParams = (data: object) => {
    const urls = new URLSearchParams();
    for (const [k, v] of Object.entries(data)) {
      urls.set(k, v);
    }
    return urls;
  };

  /* Get a query string that save the state of the filter */
  public getStateQuery = () => {
    const {
      year,
      semester,
      department,
      courseLevel,
      sortOrder,
    } = this.props.filterOptions;

    const departmentStr = this.commaSeperated(department);
    const courseLevelStr = this.commaSeperated(courseLevel);

    const urls = this.getURLSearchParams({
      courseLevel: courseLevelStr,
      department: departmentStr,
      semester,
      sortOrder,
      year,
    });

    return `?${urls.toString()}`;
  };

  public getSearchQuery = () => {
    const { filterOptions, queryKeyword } = this.props;
    const { department, courseLevel, sortOrder } = filterOptions;

    const courseLevelStr = this.commaSeperated(courseLevel);
    const departmentStr = this.commaSeperated(department);

    const urls = this.getURLSearchParams({
      courseLevel: courseLevelStr,
      department: departmentStr,
      keyword: queryKeyword,
      sortOrder,
    });

    return `?${urls.toString()}`;
  };

  public fetchQueryResult = (query: string) => {
    console.group('courseQuery');
    console.log('Send course query');

    const { year, semester: term } = this.props.filterOptions;
    const url = API_URL + '/courses/';

    fetch(`${url}${year}/${term}/${this.getSearchQuery()}`)
      .then(r => r.json())
      .then(d => {
        this.props.onChangeQueryResult(d);
      })
      .catch(e => {
        console.log(e);
      });

    console.groupEnd();
  };

  public gotoSearch = (query: string) => {
    this.props.push(`/courses/s${query}`);
  };

  public gotoDetail = (path: string) => {
    this.props.push(`/courses/d${path}`, { modalDetail: true });
  };

  public handleChangeKeyword = (e: React.FormEvent<{ value: string }>) => {
    this.props.onChangeQueryKeyword(e.currentTarget.value);
  };

  public handleChangeOption: OnChangeOptionFunc = (filterKey, payload) => {
    this.props.onChangeFilterOption(filterKey, payload);
  };

  public handleClickSearch = () => {
    const keyword = this.props.queryKeyword;
    this.gotoSearch(`/${encodeURIComponent(keyword)}${this.getStateQuery()}`);
    this.fetchQueryResult(this.getSearchQuery());
  };

  public handleClickEntry: ClickEntryHandler = (course, i) => {
    if (this.props.queryResult) {
      const { year, term } = this.props.queryResult;
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
    const { filterOptions, queryKeyword } = this.props;

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
    const { pinnedList, queryResult } = this.props;

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

function mapStateToProps(state: RootState) {
  return { ...state.courseSearch, pinnedList: state.pinnedList };
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChangeFilter: actions.changeFilter,
      onChangeFilterOption: actions.changeFilterOption,
      onChangeQueryKeyword: actions.changeQueryKeyword,
      onChangeQueryResult: actions.changeQueryResult,

      onPinnedCourse: actions.pinCourse,
      onUnpinCourse: actions.unpinCourse,

      push,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Search);
