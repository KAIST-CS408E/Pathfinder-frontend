import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

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
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
        <CardContent />
      </Card>
    );
  }
}
