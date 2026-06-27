import { Directive, ElementRef, HostListener, inject, input, OnDestroy, output } from '@angular/core';
import { getPercentPosition, IPercentPosition } from '../../utils/position.util';
import {DragMove} from '../../types/shared.types';

@Directive({
  selector: '[appDrag]',
})
export class Drag<T> implements OnDestroy {
  readonly dragBoundary = input.required<HTMLElement>();
  readonly dragPosition = input.required<IPercentPosition>();
  readonly dragData = input.required<T>();

  readonly dragMoved = output<DragMove<T>>();
  readonly dragEnded = output<DragMove<T>>();

  private readonly elementRef = inject(ElementRef<HTMLElement>);

  private pointerOffset = { x: 0, y: 0 };
  private isDragging = false;
  private pointerId: number | null = null;

  @HostListener('pointerdown', ['$event'])
  onPointerDown(event: PointerEvent): void {
    event.preventDefault();
    event.stopPropagation();

    const boundaryRect = this.dragBoundary().getBoundingClientRect();
    const position = this.dragPosition();

    this.pointerOffset = {
      x: event.clientX - boundaryRect.left - (position.x / 100) * boundaryRect.width,
      y: event.clientY - boundaryRect.top - (position.y / 100) * boundaryRect.height,
    };

    this.isDragging = true;
    this.pointerId = event.pointerId;

    this.elementRef.nativeElement.setPointerCapture?.(event.pointerId);

    window.addEventListener('pointermove', this.onPointerMove);
    window.addEventListener('pointerup', this.onPointerUp);
  }

  ngOnDestroy(): void {
    this.removeWindowListeners();
  }

  private onPointerMove = (event: PointerEvent): void => {
    if (!this.isDragging) {
      return;
    }

    const position = getPercentPosition(event, this.dragBoundary(), this.pointerOffset);

    this.dragMoved.emit({
      event,
      position,
      data: this.dragData(),
    });
  };

  private onPointerUp = (event: PointerEvent): void => {
    if (!this.isDragging) {
      return;
    }

    const position = getPercentPosition(event, this.dragBoundary(), this.pointerOffset);

    this.isDragging = false;
    this.removeWindowListeners();

    if (this.pointerId !== null) {
      this.elementRef.nativeElement.releasePointerCapture?.(this.pointerId);

      this.pointerId = null;
    }

    this.dragEnded.emit({
      event,
      position,
      data: this.dragData(),
    });
  };

  private removeWindowListeners(): void {
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
  }
}
