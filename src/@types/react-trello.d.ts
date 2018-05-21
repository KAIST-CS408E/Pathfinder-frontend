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

  export default class Board extends React.Component<IBoardProps> {}
}
