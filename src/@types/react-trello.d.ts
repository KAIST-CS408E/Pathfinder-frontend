declare module 'react-trello' {
  export interface IBoardData {
    lanes: ILaneData[];
  }

  export interface ILaneData {
    id: string;
    title: string;
    label: string;
    cards: ICardData[];
  }

  export interface ICardData {
    id: string;
    title: string;
    description: string;
    label: string;
    metadata?: any;
    subtitle?: string; // get subtitle
    body?: string; // d
    tags?: any; // to get tag, temporary added
  }

  export interface IBoardProps {
    data?: IBoardData;
    actions?: object,
    reducerData?: object,
    onDataChange?: Function,
    eventBusHandle?: Function,
    onLaneScroll?: Function,
    onCardClick?: Function,
    onCardDelete?: Function,
    onCardAdd?: Function,
    addCardLink?: any,
    onLaneClick?: Function,
    laneSortFunction?: Function,
    draggable?: boolean,
    collapsibleLanes?: boolean,
    editable?: boolean,
    hideCardDeleteIcon?: boolean,
    handleDragStart?: Function,
    handleDragEnd?: Function,
    handleLaneDragStart?: Function,
    handleLaneDragEnd?: Function,
    customCardLayout?: boolean,
    newCardTemplate?: any,
    customLaneHeader?: any,
    style?: object,
    tagStyle?: object
  }

  export interface cardPropTypes {
    id?: string,
    title?: string,
    index?: number,
    description: string,
    label?: string,
    laneId?: string,
    removeCard?: Function,
    onClick: Function,
    onDelete: Function,
    metadata: object,
    cardStyle: object,
    tagStyle: object,
    customCardLayout: boolean,
    editable: boolean,
    cardColor?: string,
    name?: string,
    dueOn: string,
    subTitle: string,
    body: string,
    escalationText: string,

  }

  export default class Board extends React.Component<IBoardProps> {}
}
