import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import * as iassign from 'immutable-assign';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';

import Filter, {
  defaultValues,
  FilterKey,
  IFilterOptions,
  OnChangeOptionFunc,
} from './Filter';
import SearchList, { IQueryResult } from './List';
import { ClickItemHandler } from './ListItem';
import styles from './Search.style';

const { classes } = styles;

interface IProps extends RouteComponentProps<{ keyword: string }> {}

interface ISearchState {
  showFilterMenu: boolean;
  filterSelection: FilterKey;
  filterOptions: IFilterOptions;
  queryKeyword: string;
  queryResult?: IQueryResult;
  nothing: string;
}

export default class Search extends React.Component<IProps, ISearchState> {
  constructor(props: IProps) {
    super(props);

    const filterOptions: IFilterOptions = defaultValues;

    if (props.location && props.location.search) {
      const params = new URLSearchParams(props.location.search);
      for (const [k, v] of params) {
        filterOptions[k] = v;
      }
    }

    let queryKeyword: string = '';

    if (props.match && props.match.params && props.match.params.keyword) {
      queryKeyword = props.match.params.keyword;
    }

    this.state = {
      filterOptions,
      filterSelection: 'year',
      nothing: '123',
      queryKeyword,
      queryResult: undefined,
      showFilterMenu: false,
    };
  }

  public componentDidMount() {
    this.fetchQueryResult(this.getSearchQuery());
  }

  public componentDidUpdate(prevProps: IProps, prevState: ISearchState) {
    const query = this.props.location.search;
    if (this.props.match !== prevProps.match) {
      this.fetchQueryResult(query);
    }
  }

  public getSearchQuery = () => {
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

    return `?year=${year}&semester=${semester}&department=${departmentStr}&courseLevel=${courseLevel}&sortOrder=${sortOrder}`;
  };

  public fetchQueryResult = (query: string) => {
    // const params = new URLSearchParams(query);
    console.group('courseQuery');
    console.log('Send course query');

    /* for (let [k, v] of params) {
     *   console.log(k, v);
     *   // do whatever..
     * } */

    const { year, semester: term } = this.state.filterOptions;

    fetch(
      `https://ny3acklsf2.execute-api.ap-northeast-2.amazonaws.com/api/courses/${year}/${term}/`
    )
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

  /* public handleFilterClick = (filterKey: FilterKey) => {
   *   if (this.state.filterSelection === filterKey) {
   *     this.setState({ showFilterMenu: !this.state.showFilterMenu });
   *   } else {
   *     this.setState({ filterSelection: filterKey, showFilterMenu: true });
   *   }
   * }; */

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
    this.gotoSearch(`/${keyword}${this.getSearchQuery()}`);
  };

  public handleClickItem: ClickItemHandler = (d, i) => {
    if (this.state.queryResult) {
      const { year, term } = this.state.queryResult;
      this.gotoDetail(`/${year}/${term}/${d.number}/${d.professor}`);
    } else {
      alert('you need to fetch in the first');
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

    return (
      <div className={classes.resultContainer}>
        <SearchList
          data={queryResult ? queryResult.courses : undefined}
          onClickItem={this.handleClickItem}
        />
        <div className="map">Map</div>
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
