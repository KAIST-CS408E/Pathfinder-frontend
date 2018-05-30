import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

// import { Chip, Step, StepLabel, Stepper } from "@material-ui/core";
import { Chip, ListItemText } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Equalizer from '@material-ui/icons/Equalizer';
import Person from '@material-ui/icons/Person';

import * as ReactTooltip from 'react-tooltip';

import {
  IDisplayableCourse,
  INavigatableCourse,
  RelevantCourse,
} from 'pathfinder';

import { getRelevant, getStatistics } from '@src/api';
// import { buildCourseKey } from '@src/utils';
import { RootState } from '@src/redux';
import { actions, State } from '@src/redux/courseDiscovery';

import CourseItem from './CourseItem';

// import styles from './index.style'

// const { classes } = styles;

interface IProps {
  newCourses: State['newCourses'];
  newLectures: State['newLectures'];
  relevantCourses: State['relevantCourses'];

  onSetNewCourses: typeof actions.setNewCourses;
  onSetNewLectures: typeof actions.setNewLectures;
  onSetRelevantCourses: typeof actions.setRelevantCourses;

  push: typeof push;
}

interface IState {
  tabValue: number;
}

class Sidebar extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { tabValue: 0 };
  }

  public componentDidMount() {
    getStatistics().then(json => {
      this.props.onSetNewCourses(json.filter(course => course.isNewCourse));
      this.props.onSetNewLectures(json.filter(course => !course.isNewCourse));
    });
    getRelevant().then(json => {
      this.props.onSetRelevantCourses(json);
    });
  }

  public handleTabChange = (_: any, tabValue: number) => {
    this.setState({ tabValue });
  };

  public handleCourseClick = (course: INavigatableCourse) => {
    this.props.push(
      `/courses/d/2018/Fall/${course.courseNumber}/?subtitle=${
        course.subtitle
      }`,
      { modalDetail: true }
    );
  };

  public renderNewCourseItem = (
    course: INavigatableCourse & IDisplayableCourse
  ) => {
    return (
      <div
        data-for="courseItem"
        style={{ display: 'flex', alignItems: 'baseline' }}
      >
        <Chip label={course.courseNumber} />
        <ListItemText>
          {course.name}&nbsp;
          <span style={{ color: '#3f51b5', whiteSpace: 'nowrap' }}>
            {course.professor}
          </span>
        </ListItemText>
      </div>
    );
  };

  public renderRelevantItem = (course: RelevantCourse) => {
    return (
      <div
        data-for="relevantCourse"
        data-tip={String(course.count)}
        style={{ display: 'flex', alignItems: 'baseline' }}
      >
        <Chip label={course.courseNumber} />
        <ListItemText>{course.name}</ListItemText>
      </div>
    );
  };

  public renderRelevantTip = (data: string) => {
    return (
      <span>
        <b>{data}</b> people took this course in your upcoming semester
      </span>
    );
  };

  public render() {
    const newCourses = Object.values(this.props.newCourses);
    const newProfessor = Object.values(this.props.newLectures);
    const relevantCourses = Object.values(this.props.relevantCourses);

    const { tabValue } = this.state;

    return (
      <Card style={{ width: '100%', height: '100%' }}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="off"
          value={tabValue}
          onChange={this.handleTabChange}
        >
          <Tab label="new in 2018" icon={<Equalizer />} />
          <Tab label="Recommend" icon={<Person />} />
        </Tabs>
        <CardContent style={{ height: '90%', overflowY: 'scroll', padding: 0 }}>
          {tabValue === 0 && (
            <div>
              <CourseList
                title="New Courses"
                data={newCourses}
                onClick={this.handleCourseClick}
                render={this.renderNewCourseItem}
              />
              <CourseList
                title="New Lecturer of Courses"
                data={newProfessor}
                onClick={this.handleCourseClick}
                render={this.renderNewCourseItem}
              />
            </div>
          )}
          {tabValue === 1 && (
            <div>
              <CourseList
                title="Courses people took in your semester"
                data={relevantCourses}
                onClick={this.handleCourseClick}
                render={this.renderRelevantItem}
              />
              <ReactTooltip
                id="relevantCourse"
                effect="solid"
                getContent={this.renderRelevantTip}
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}

interface ICourseListProps<T = any> {
  title: string;
  data: T[];
  onClick: (course: INavigatableCourse) => void;
  render: (payload: T) => React.ReactNode;
}
type TCourseList = React.SFC<ICourseListProps>;
const CourseList: TCourseList = ({ title, data, onClick, render }) => (
  <List
    subheader={
      <ListSubheader style={{ backgroundColor: 'white', textAlign: 'left' }}>
        {title}
      </ListSubheader>
    }
  >
    {data.map((payload, index) => (
      <CourseItem
        key={index}
        payload={payload}
        onClick={onClick}
        render={render}
      />
    ))}
  </List>
);

export default connect(
  (state: RootState) => ({
    ...state.courseDiscovery,
  }),
  (dispatch: Dispatch) =>
    bindActionCreators(
      {
        onSetNewCourses: actions.setNewCourses,
        onSetNewLectures: actions.setNewLectures,
        onSetRelevantCourses: actions.setRelevantCourses,
        push,
      },
      dispatch
    )
)(Sidebar);
