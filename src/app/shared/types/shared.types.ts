import {IPercentPosition} from '../utils/position.util';

export interface DragMove<T> {
  event: PointerEvent;
  data: T;
  position: IPercentPosition;
}
