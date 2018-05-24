import * as React from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

import iassign from 'immutable-assign';

interface IState {
  data: ICourseList[];
}

interface ICourseList {
  id: string;
  courses: ICourse[];
  semester: number;
}

interface ICourse {
  id: string;

  name: string;
  number: string;
  subtitle: string;

  lectures: ILecture[];
  professor: string;
}

interface ILecture {
  professor: string;
}

export default class Planner extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [
        {
          id: 'sem1',
          semester: 1,

          courses: [
            {
              id: 'CS101|',

              name: 'Intro to Programming',
              number: 'CS101',
              subtitle: '',

              lectures: [{ professor: 'hello' }],
              professor: 'hello',
            },
            {
              id: 'CS204|',

              name: 'Discrete Mathematics',
              number: 'CS204',
              subtitle: '',

              lectures: [{ professor: 'hello' }],
              professor: 'hello',
            },
          ],
        },
        {
          id: 'sem2',
          semester: 1,

          courses: [
            {
              id: 'CS330|',

              name: 'Operating System',
              number: 'CS330',
              subtitle: '',

              lectures: [{ professor: 'hello' }],
              professor: 'hello',
            },
            {
              id: 'CS320|',

              name: 'Programming Languages',
              number: 'CS320',
              subtitle: '',

              lectures: [{ professor: 'hello' }],
              professor: 'hello',
            },
          ],
        }
      ],
    };
  }

  public onCardDrop = (semesterId: string) => (dropResult: any) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    console.log(semesterId, dropResult);
    const courseListIndex = this.state.data.findIndex(
      courseL => courseL.id === semesterId
    );

    this.setState(
      iassign(
        this.state,
        state => state.data[courseListIndex].courses,
        (courses: ICourse[]) => {
          if (removedIndex !== null) {
            courses.splice(removedIndex, 1);
          }

          if (addedIndex !== null) {
            courses.splice(addedIndex, 0, payload);
          }

          return courses;
        }
      )
    );
  };

  public getChildPayload = (semsterId: string) => (courseIndex: number) => {
    return this.state.data.filter(courseList => courseList.id === semsterId)[0]
      .courses[courseIndex];
  };

  public render() {
    return (
      <div>
        {this.state.data.map(semester => (
          <Container
            key={semester.id}
            className="courseContainer"
            style={{ marginTop: 30 }}
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
