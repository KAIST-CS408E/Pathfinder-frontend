import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Container, Draggable } from 'react-smooth-dnd';

import { plannerBoardData } from '@src/constants';
import { RootState } from '@src/redux';
import { actions as plannerActions } from '@src/redux/planner';

import { ISemester } from 'pathfinder';

interface IProps {
  boardData: ISemester[];

  onInitBoard: typeof plannerActions.initBoard;
  onAddCourse: typeof plannerActions.addCourse;
  onRemoveCourse: typeof plannerActions.removeCourse;
}

class Planner extends React.Component<IProps> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.onInitBoard(plannerBoardData);
  }

  public onCardDrop = (semesterId: string) => (dropResult: any) => {
    const { onAddCourse, onRemoveCourse } = this.props;
    const { removedIndex, addedIndex, payload } = dropResult;
    console.log(semesterId, dropResult);

    if (removedIndex !== null) {
      onRemoveCourse(semesterId, removedIndex);
    }
    if (addedIndex !== null) {
      onAddCourse(semesterId, addedIndex, payload);
    }
  };

  public getChildPayload = (semsterId: string) => (courseIndex: number) => {
    return this.props.boardData.filter(
      courseList => courseList.id === semsterId
    )[0].courses[courseIndex];
  };

  public render() {
    const { boardData } = this.props;

    if (boardData === undefined) {
      return <>Loading</>;
    }

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {boardData.map(semester => (
          <Container
            key={semester.id}
            className="courseContainer"
            style={{ marginTop: 30, width: 300 }}
            groupName="col"
            orientation="vertical"
            onDrop={this.onCardDrop(semester.id)}
            getChildPayload={this.getChildPayload(semester.id)}
          >
            {semester.courses.map(course => {
              return (
                <Draggable key={course.id}>
                  <p>{course.name}</p>
                </Draggable>
              );
            })}
          </Container>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => state.planner;
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onInitBoard: plannerActions.initBoard,

      onAddCourse: plannerActions.addCourse,
      onRemoveCourse: plannerActions.removeCourse,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Planner);
