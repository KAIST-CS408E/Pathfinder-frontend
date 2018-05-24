declare module 'react-trello' {
  export interface IBoardData<T = ICardData> {
    lanes: Array<ILaneData<T>>;
  }

  export interface ILaneData<T> {
    id: string;
    title: string;
    label?: string;
    cards: T[];
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
    data?: any;
    actions?: object,
    reducerData?: object,
    onDataChange?: (newData: any) => void,
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

  export default class Board extends React.Component<IBoardProps> {}
}
