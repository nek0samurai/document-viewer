import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import {
  TAddAnnotationPayload,
  TDocumentAnnotation,
  TMoveAnnotationPayload
} from '../../../annotations/models/annotation.model';
import { DocumentPage } from '../document-page/document-page';
import { DocumentService } from '../../services/document.service';
import { WorkspaceToolbar } from '../workspace-toolbar/workspace-toolbar';
import { AnnotationService } from '../../../annotations/services/annotation.service';
import {decreaseZoom, formatZoom, increaseZoom} from '../../../../shared/utils/zoom.util';

@Component({
  selector: 'app-document-workspace',
  imports: [WorkspaceToolbar, DocumentPage],
  templateUrl: './document-workspace.html',
  styleUrl: './document-workspace.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentWorkspace {
  private readonly route = inject(ActivatedRoute);
  private readonly documentService = inject(DocumentService);
  protected readonly annotationService = inject(AnnotationService);
  protected readonly documentId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('id') ?? '1')),
    { initialValue: '1' },
  );

  protected readonly documentResource = this.documentService.getDocument(this.documentId);

  readonly document = computed(() => {
    const document = this.documentResource.value();

    if (!document) {
      return null;
    }

    return {
      ...document,
      id: this.documentId(),
    };
  });

  readonly isAddingText = signal(false);
  readonly annotationText = signal('New note');
  readonly zoom = signal(1);
  readonly zoomLabel = computed(() => formatZoom(this.zoom()));

  zoomIn(): void {
    this.zoom.update((current) => increaseZoom(current));
  }

  zoomOut(): void {
    this.zoom.update((current) => decreaseZoom(current));
  }

  startTextAnnotation(): void {
    this.isAddingText.set(true);
  }

  setAnnotationText(text: string): void {
    this.annotationText.set(text);
  }

  addAnnotation(payload: TAddAnnotationPayload): void {
    if (!this.isAddingText()) {
      return;
    }

    this.annotationService.addAnnotation(payload, this.annotationText());

    this.isAddingText.set(false);
    this.annotationText.set('');
  }

  moveAnnotation(payload: TMoveAnnotationPayload): void {
    this.annotationService.moveAnnotations(payload);
  }

  deleteAnnotation(id: string): void {
    this.annotationService.deleteAnnotation(id);
  }

  getAnnotationsForPage(pageNumber: number): TDocumentAnnotation[] {
    return this.annotationService.getAnnotationsForPage(pageNumber);
  }

  save(): void {
    this.documentService.saveDocument(this.document(), this.annotationService.annotations());
  }
}
