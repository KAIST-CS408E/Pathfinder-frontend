import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

// import { semesterBoards } from '@src/constants';
import Board, { IBoardData } from 'react-trello';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import PlayCircleOutline from '@material-ui/icons/PlayCircleOutline';
import ThumbUp from '@material-ui/icons/ThumbUp';

import styles from './Planner.style';

const { classes } = styles;
// const ourKaistBlue = '#E3F2FD';

export default class Planner extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <div className={classes.titleContainer}>
          <Typography align="left" variant="headline">
            My Academic Path Simulator
          </Typography>
          <Typography align="left" variant="subheading">
            Plan my academic path, simulate, and get recommends based on real
            data.
            <br />* This system is helpful, but blind trust can be dangerous.
          </Typography>
        </div>

        <div className={classes.division}>{/* give division */}</div>
        <div style={{ textAlign: 'right', margin: '0vh 10vw 3vh 0vw' }}>
          <Chip
            style={{
              backgroundColor: '#FF9800',
              color: 'white',
              marginRight: '1vw',
            }}
            label="Course Recommendation"
            avatar={
              <Avatar style={{ backgroundColor: '#FF9800', color: 'white' }}>
                <ThumbUp />
              </Avatar>
            }
          />
          <Chip
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              marginRight: '1vw',
            }}
            label="Course Simulation"
            avatar={
              <Avatar style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                <PlayCircleOutline />
              </Avatar>
            }
          />
        </div>
        <div className={classes.boardContainer}>
          <Board
            customCardLayout
            draggable
            data={data}
            style={{
              backgroundColor: 'white',
              flex: '0 0 auto',
              marginRight: '10vw',
              padding: '0vh 0vw 0vh 10vw',
            }}
          >
            <CustomCard />
          </Board>
        </div>
      </div>
    );
  }
}

interface ICustomCardProps {
  dueOn: string,
  id: string,
  name: string,

  subTitle: string,

  body: string,

  escalationText: string,

  cardColor: any,
  cardStyle: any,
}

const CustomCard = (props: any) => {
  return (
    <div>
      <header
        style={{
          borderBottom: '1px solid #eee',
          color: props.cardColor,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          paddingBottom: 6,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 'bold' }}>{props.name}</div>
        <div style={{ fontSize: 11 }}>{props.dueOn}</div>
      </header>
      <div style={{ fontSize: 12, color: '#BD3B36' }}>
        <div style={{ color: '#4C4C4C', fontWeight: 'bold' }}>
          {props.subTitle}
        </div>
        <div style={{ padding: '5px 0px' }}>
          <i>{props.body}</i>
        </div>
        <div
          style={{
            color: props.cardColor,
            fontSize: 15,
            fontWeight: 'bold',
            marginTop: 10,
            textAlign: 'center',
          }}
        >
          {props.escalationText}
        </div>
      </div>
    </div>
  );
};

const data: IBoardData<ICustomCardProps> = {
  lanes: [
    {
      id: 'lane1',
      title: 'Planned Tasks',

      cards: [
        {
          dueOn: 'due in a day',
          id: 'Card1',
          name: 'John Smith',

          subTitle: 'SMS received at 12:13pm today',

          body: 'Thanks. Please schedule me for an estimate on Monday.',

          escalationText: 'Escalated to OPS-ESCALATIONS!',

          cardColor: '#BD3B36',
          cardStyle: {
            borderRadius: 6,
            boxShadow: '0 0 6px 1px #BD3B36',
            marginBottom: 15,
          },
        },
        {
          dueOn: 'due now',
          id: 'Card2',
          name: 'Card Weathers',

          subTitle: 'Email received at 1:14pm',

          body: 'Is the estimate free, and can someone call me soon?',

          escalationText: 'Escalated to Admin',

          cardColor: '#E08521',
          cardStyle: {
            borderRadius: 6,
            boxShadow: '0 0 6px 1px #E08521',
            marginBottom: 15,
          },
        },
      ],
    },
  ],
};
