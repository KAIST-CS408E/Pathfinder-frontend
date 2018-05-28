import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Equalizer from '@material-ui/icons/Equalizer';
import Person from '@material-ui/icons/Person';

import { getStatistics, StatisticsResponse } from '@src/api';
import { buildCourseKey } from '@src/utils';

interface IProps {
  push: typeof push;
}

interface IState {
  statistics: StatisticsResponse;
  tabValue: number;
}

class Sidebar extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = { statistics: [], tabValue: 0 };
  }

  public componentDidMount() {
    getStatistics().then(json => {
      this.setState({ statistics: json });
    });
  }

  public handleTabChange = (_: any, tabValue: number) => {
    this.setState({ tabValue });
  };

  public render() {
    const newCourses = this.state.statistics.filter(
      course => course.isNewCourse
    );
    const newProfessor = this.state.statistics.filter(
      course => !course.isNewCourse
    );

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
          <Tab label="new courses" icon={<Equalizer />} />
          <Tab label="relevance" icon={<Person />} />
        </Tabs>
        <CardContent style={{ height: '90%', overflowY: 'scroll', padding: 0 }}>
          {tabValue === 0 && (
            <div>
              <CourseList
                title="New in 2018 Fall"
                courses={newCourses}
              />
              <CourseList
                title="New Lecturer of Courses"
                courses={newProfessor}
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}

const CourseList: React.SFC<{ title: string; courses: StatisticsResponse }> = ({
  title,
  courses,
}) => (
  <List
    subheader={
      <ListSubheader style={{ backgroundColor: 'white', textAlign: 'left' }}>
        {title}
      </ListSubheader>
    }
  >
    {courses.map(course => (
      <CourseItem
        key={buildCourseKey(course)}
        courseNumber={course.courseNumber}
        subtitle={course.subtitle}
        name={course.name}
        professor={course.professor}
      />
    ))}
  </List>
);

interface ICourseStepProps {
  courseNumber: string;
  subtitle: string;
  name: string;
  professor: string;
}

const CourseItem: React.SFC<ICourseStepProps> = ({
  courseNumber,
  subtitle,
  name,
  professor,
}) => {
  return (
    <ListItem button>
      <Chip label={courseNumber} />
      <ListItemText>
        {name}&nbsp;
        <span style={{ color: '#3f51b5', whiteSpace: 'nowrap' }}>
          {professor}
        </span>
      </ListItemText>
    </ListItem>
  );
};

export default connect(null, (dispatch: Dispatch) =>
  bindActionCreators({ push }, dispatch)
)(Sidebar);
