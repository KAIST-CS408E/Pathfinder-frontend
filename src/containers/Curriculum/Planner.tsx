import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Board from 'react-trello';

import { semesterBoards } from '@src/constants';

export default class Planner extends React.Component<RouteComponentProps<{}>> {
  public render() {
    return (
      <div>
        <Board draggable editable data={semesterBoards} />
      </div>
    );
  }
}
