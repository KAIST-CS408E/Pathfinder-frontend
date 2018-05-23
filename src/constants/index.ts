import { IBoardData } from "react-trello";

export const hello = "hello";

const profColorD = "#9E9E9E";
const profColorS = "#536DFE";

export const semesterBoards: IBoardData = {
  lanes: [
    {
      id: 'lane1',
      label: 'Load: 1.5 / Grade: 3.1',
      title: '1st semester',

      cards: [
        {
          id: '123',
          label: 'B+',
          title: 'Discrete Mathmatics',

          description: 'Load: 1.9  Grade: 2.6',

          tags: [
            {title: 'Sungwon Kang', color: 'white', bgcolor: profColorS},
            {title: 'Jina Park', color: 'white', bgcolor: profColorD },
            {title: 'Martin Giggler', color: 'white', bgcolor: profColorD },
          ],
        },
        {
          id: '234',
          label: 'A-',
          title: 'Problem Solving',

          description: 'Load: 2.4  Grade: 3.1',
          tags: [
            {title: 'Kyungryong Chwa', color: 'white', bgcolor: profColorS },
          ],
        },
        {
          id: '345',
          label: 'A+',
          title: 'Data Structure',

          description: 'Load: 2.1  Grade: 3.2',
          tags: [
            {title: 'Otfried Jung', color: 'white', bgcolor: profColorD },
            {title: 'Hyeyeon Oh', color: 'white', bgcolor: profColorS },
            {title: 'Deoksan Ryu', color: 'white', bgcolor: profColorD },
          ],
        },
      ],
    },
    {
      id: 'lane2',
      label: 'lane label',
      title: '2nd semester',

      cards: [
        {
          id: '123',
          label: 'A0',
          title: 'System Programing',

          description: 'Load: 3.4  Grade: 2.4',
          tags: [
            {title: 'John Dongjun Kim', color: 'white', bgcolor: profColorS},
          ],
        },
        {
          id: '234',
          label: 'A0',
          title: 'Introduction to Algorithm',

          description: 'Load: 2.1  Grade: 2.6',
          tags: [
            {title: 'Otfried Jung', color: 'white', bgcolor: profColorS },
            {title: 'Sunghui Choi', color: 'white', bgcolor: profColorD },
          ],
        },
        {
          id: '345',
          label: 'B+',
          title: 'Programming Language',

          description: 'Load: 3.2  Grade: 2.7',
          tags: [
            {title: 'Seokyoung Ryu', color: 'white', bgcolor: profColorS },
          ],
        },
      ],
    },
    {
      id: 'lane3',
      label: 'Load: 1.5 / Grade: 3.1',
      title: '3rd semester',

      cards: [

        {
          id: '123',
          label: '',
          title: 'Computer Science Projects',

          description: 'Load:4.1  Grade: 3.6',

          tags: [
            {title: 'Jongmoon Baik', color: 'white', bgcolor: profColorD},
            {title: 'Dongman Lee', color: 'white', bgcolor: profColorD },
            {title: 'Sung-Ju Lee', color: 'white', bgcolor: profColorS },
            {title: 'In-Young Ko', color: 'white', bgcolor: profColorD },
            {title: 'Okjoo Choi', color: 'white', bgcolor: profColorD },
          ],
        },
        {
          id: '345',
          label: '',
          title: 'Computer Organization',

          description: 'Load: 3.8  Grade: 3.1',

          tags: [
            {title: 'Jaehyuk Huh', color: 'white', bgcolor: profColorS},
          ],
        },
        {
          id: '123',
          label: 'feedback',
          title: 'prerequisite miss',

          description: "'computer Organization' should take after taking prerequisite 'system programming'",
        },
      ],
    },
    {
      id: 'lane4',
      label: 'lane label',
      title: '4th semester',

      cards: [

        {
          id: '234',
          label: '',
          title: 'Operating Systems and Lab',

          description: 'Load: -  Grade: -',

          tags: [
            {title: 'Junehwa Song', color: 'white', bgcolor: profColorD},
          ],
        },
        {
          id: '123',
          label: 'feedback',
          title: 'balanced',

          description: 'Load: the load is similar with the other semesters\n' +
          'Prerequisite: done',
        },
      ],
    },
    {
      id: 'lane5',
      label: 'Load: 1.5 / Grade: 3.1',
      title: '5th semester',

      cards: [
      ],
    },
    {
      id: 'lane6',
      label: 'lane label',
      title: '6th semester',

      cards: [
      ],
    },


    {
      id: 'lane7',
      label: 'Load: 1.5 / Grade: 3.1',
      title: '7th semester',

      cards: [
      ],
    },
    {
      id: 'lane8',
      label: 'lane label',
      title: '8th semester',

      cards: [
      ],
    },
    {
      id: 'lane9',
      label: 'Load: 1.5 / Grade: 3.1',
      title: '9th semester',

      cards: [
      ],
    },
    {
      id: 'lane10',
      label: 'lane label',
      title: '10th semester',

      cards: [
      ],
    },
    {
      id: 'lane11',
      label: 'Load: 1.5 / Grade: 3.1',
      title: '11th semester',

      cards: [
      ],
    },
    {
      id: 'lane12',
      label: 'lane label',
      title: '12th semester',

      cards: [
      ],
    },

    {
      id: 'pin lane',
      label: 'lane label',
      title: 'course pin',

      cards: [
        {
          id: '123',
          label: '',
          title: 'Computer Science Projects',

          description: 'Load: -  Grade: -',

          tags: [
            {title: 'Jongmoon Baik', color: 'white', bgcolor: profColorD},
            {title: 'Dongman Lee', color: 'white', bgcolor: profColorD },
            {title: 'Sung-Ju Lee', color: 'white', bgcolor: profColorD },
            {title: 'In-Young Ko', color: 'white', bgcolor: profColorD },
            {title: 'Okjoo Choi', color: 'white', bgcolor: profColorD },
          ],
        },
        {
          id: '234',
          label: '',
          title: 'Operating Systems and Lab',

          description: 'Load: -  Grade: -',

          tags: [
            {title: 'Junehwa Song', color: 'white', bgcolor: profColorD},
          ],
        },
        {
          id: '345',
          label: '',
          title: 'Computer Organization',

          description: 'Load: -  Grade: -',

          tags: [
            {title: 'Jaehyuk Huh', color: 'white', bgcolor: profColorD},
          ],
        },
        {
          id: '456',
          label: '',
          title: 'Special Topics in Computer Science<Crowdsourcing and Social Computing>',

          description: 'Load: -  Grade: -',

          tags: [
            {title: 'Juho Kim', color: 'white', bgcolor: profColorD},
          ],
        },
        {
          id: '567',
          label: '',
          title: 'Introduction to Software Engineering',

          description: 'Load: -  Grade: -',

          tags: [
            {title: 'Doo-Hwan Bae', color: 'white', bgcolor: profColorD},
          ],
        },
      ],
    },
  ],
};