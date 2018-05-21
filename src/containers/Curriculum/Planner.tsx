import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Board, { IBoardData } from 'react-trello';

const dummyData: IBoardData = {
  lanes: [
    {
      id: 'lane1',
      label: 'lane label',
      title: 'Hello',

      cards: [
        {
          id: '123',
          label: 'this is label',
          title: 'world',

          description: 'this is description',
        },
      ],
    },
    {
      id: 'lane2',
      label: 'lane label',
      title: 'Lane 2',

      cards: [
        {
          id: '123',
          label: 'this is label',
          title: 'world',

          description: 'this is description',
        },
      ],
    },
  ],
};

export default class Planner extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <Board draggable data={dummyData} />
      </div>
    );
  }
}
