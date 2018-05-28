import * as React from 'react';

// import Avatar from "@material-ui/core/Avatar"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';

import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
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
              <p
                style={{
                  fontSize: '1.1rem',
                  paddingLeft: 12,
                  textAlign: 'left',
                }}
              >
                New courses
              </p>
              <Stepper orientation="vertical" activeStep={0}>
                {this.state.statistics.map(course => (
                  <Step>
                    <StepLabel
                      style={{ position: 'relative', left: 0, top: 0 }}
                      className={classes.stepLabel}
                    >
                      <CourseStep
                        key={buildCourseKey(course)}
                        courseNumber={course.courseNumber}
                        subtitle={course.subtitle}
                        name={course.name}
                      />
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
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
    <div>
      <Chip
        label={courseNumber}
        style={{
          height: 26,

          left: 0,
          top: -13,

          position: 'absolute',
          textAlign: 'left',
        }}
      />
      <div className={classes.stepContent}>{name}</div>
    </div>
  );
};
