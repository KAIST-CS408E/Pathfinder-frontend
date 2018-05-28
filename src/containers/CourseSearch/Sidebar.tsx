import * as React from 'react';

// import Avatar from "@material-ui/core/Avatar"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
// import ListItemIcon from '@material-ui/core/ListItemIcon';

// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import Stepper from '@material-ui/core/Stepper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Equalizer from '@material-ui/icons/Equalizer';
import Person from '@material-ui/icons/Person';

import { getStatistics, StatisticsResponse } from '@src/api';
import { buildCourseKey } from '@src/utils';

import styles from './Search.style';

const { classes } = styles;

const value = 0;

interface IState {
  statistics: StatisticsResponse;
}

export default class Sidebar extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = { statistics: [] };
  }

  public componentDidMount() {
    getStatistics().then(json => {
      this.setState({ statistics: json });
    });
  }

  public render() {
    return (
      <Card style={{ width: '100%', height: '100%' }}>
        <Tabs
          value={0}
          indicatorColor="primary"
          textColor="primary"
          scrollable
          scrollButtons="off"
        >
          <Tab label="statistics" icon={<Equalizer />} />
          <Tab label="relevance" icon={<Person />} />
        </Tabs>
        <CardContent style={{ padding: 0 }}>
          {value === 0 && (
            <div className={classes.sideBarStepBoard}>
              <List
                subheader={
                  <ListSubheader style={{ textAlign: 'left' }}>
                    New lectures
                  </ListSubheader>
                }
              >
                {this.state.statistics.map(course => (
                  <CourseStep
                    key={buildCourseKey(course)}
                    courseNumber={course.courseNumber}
                    subtitle={course.subtitle}
                    name={course.name}
                  />
                ))}
              </List>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
}

interface ICourseStepProps {
  courseNumber: string;
  subtitle: string;
  name: string;
}

const CourseStep: React.SFC<ICourseStepProps> = ({
  courseNumber,
  subtitle,
  name,
}) => {
  return (
    <ListItem button>
      <Chip label={courseNumber} />
      <ListItemText>{name}</ListItemText>
    </ListItem>
  );
};
