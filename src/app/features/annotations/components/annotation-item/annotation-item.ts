import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TDocumentAnnotation } from '../../models/annotation.model';
import {Drag} from '../../../../shared/directives/drag/drag';
import {DragMove} from '../../../../shared/types/shared.types';

@Component({
  selector: 'app-annotation-item',
  imports: [Drag],
  templateUrl: './annotation-item.html',
  styleUrl: './annotation-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationItem {
  readonly dragItem = input.required<HTMLElement>();
  readonly annotation = input.required<TDocumentAnnotation>();

  readonly moved = output<{
    id: string;
    x: number;
    y: number;
  }>();

  readonly deleted = output<string>();

  onMoved(event: DragMove<TDocumentAnnotation>) {
    this.moved.emit({
      id: event.data.id,
      x: event.position.x,
      y: event.position.y
    })
  }

  onDelete(event: MouseEvent) {
    event.stopPropagation();
    this.deleted.emit(this.annotation().id)
  }
}
