import { Injectable, signal } from '@angular/core';
import {TAddAnnotationPayload, TDocumentAnnotation, TMoveAnnotationPayload} from '../models/annotation.model';

@Injectable({
  providedIn: 'root',
})
export class AnnotationService {
  readonly annotations = signal<TDocumentAnnotation[]>([]);

  addAnnotation(payload: TAddAnnotationPayload, text: string) {
    this.annotations.update((annotations) => [
      ...annotations,
      {
        id: crypto.randomUUID(),
        pageNumber: payload.pageNumber,
        type: 'text',
        text: text.trim() || 'New note',
        x: payload.x,
        y: payload.y,
      },
    ]);
  }

  deleteAnnotation(id: string) {
    this.annotations.update((annotations) =>
      annotations.filter((annotation) => annotation.id !== id),
    );
  }

  moveAnnotations(payload: TMoveAnnotationPayload) {
    this.annotations.update((annotations) =>
      annotations.map((annotation) =>
        annotation.id === payload.id
          ? {
              ...annotation,
              x: payload.x,
              y: payload.y,
            }
          : annotation,
      ),
    );
  }

  getAnnotationsForPage(pageNumber: number): TDocumentAnnotation[] {
    return this.annotations().filter((annotation) => annotation.pageNumber === pageNumber);
  }
}
