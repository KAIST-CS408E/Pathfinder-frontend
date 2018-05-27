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

import styles from './Search.style';

const { classes } = styles;

const value=0;

export default class Sidebar extends React.Component {
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
        <CardContent style={{padding:0}}>
          {value === 0 &&
            <div className={classes.sideBarStepBoard}>
              <Stepper orientation="vertical" activeStep={0}>
                <Step>
                  <StepLabel style={{ position: "relative", left:0, top: 0, }} className={classes.stepLabel} >
                    <Chip label="CS230" style={{ textAlign:"left", height: 26, position:"absolute", left:0, top:-13}}/>
                    <div className={classes.stepContent}>System Programming</div></StepLabel>
                </Step>
                <Step>
                  <StepLabel style={{ position: "relative", left:0, top: 0, }} className={classes.stepLabel} >
                    <Chip label="CS230" style={{ textAlign:"left", height: 26, position:"absolute", left:0, top:-13}}/>
                    <div className={classes.stepContent}>System Programming</div></StepLabel>
                </Step>
                <Step>
                  <StepLabel style={{ position: "relative", left:0, top: 0, }} className={classes.stepLabel} >
                    <Chip label="CS230" style={{ textAlign:"left", height: 26, position:"absolute", left:0, top:-13}}/>
                    <div className={classes.stepContent}>System Programming</div></StepLabel>
                </Step>
              </Stepper>
            </div>
          }
        </CardContent>
      </Card>
    );
  }
}
