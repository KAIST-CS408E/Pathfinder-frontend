import * as React from 'react';

import Avatar from "@material-ui/core/Avatar"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import Equalizer from '@material-ui/icons/Equalizer';
import Person from '@material-ui/icons/Person';

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
          <div>
            <List
              component="nav"
              subheader={
                <ListSubheader component="div"
                               style={{ height: 30, fontSize: 15, backgroundColor: "#E1F5FE", margin: "10px 0px", lineHeight:"28px" }}>
                  trends
                </ListSubheader>}>
              <ListItem button>
                <ListItemIcon>
                  <Avatar> 1 </Avatar>
                </ListItemIcon>
                <ListItemText inset primary="Operation systems and Labs" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <Avatar> 2 </Avatar>
                </ListItemIcon>
                <ListItemText inset primary="System programming" />
              </ListItem>
            </List>
            <List
              component="nav"
              subheader={
                <ListSubheader component="div"
                               style={{ height: 30, fontSize: 15, backgroundColor: "#E1F5FE", margin: "10px 0px", lineHeight:"28px" }}>
                  trends
                </ListSubheader>}>
              <ListItem button>
              <ListItemIcon>
              <Avatar> 1 </Avatar>
              </ListItemIcon>
              <ListItemText inset primary="Operation systems and Labs" />
              </ListItem>
              <ListItem button>
              <ListItemIcon>
                  <Avatar> 2 </Avatar>
                  </ListItemIcon>
                    <ListItemText inset primary="System programming" />
                  </ListItem>
                </List>
            </div>
          }
        </CardContent>
      </Card>
    );
  }
}
