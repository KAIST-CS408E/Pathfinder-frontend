declare module 'react-trello' {
  export interface BoardData {
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
    data?: BoardData;
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
    draggable?: Boolean,
    collapsibleLanes?: Boolean,
    editable?: Boolean,
    hideCardDeleteIcon?: Boolean,
    handleDragStart?: Function,
    handleDragEnd?: Function,
    handleLaneDragStart?: Function,
    handleLaneDragEnd?: Function,
    customCardLayout?: Boolean,
    newCardTemplate?: any,
    customLaneHeader?: any,
    style?: object,
    tagStyle?: object
  }

  export default class Board extends React.Component<IBoardProps> {}
}
