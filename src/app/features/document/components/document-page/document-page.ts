import {ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild} from '@angular/core';
import { AnnotationItem } from '../../../annotations/components/annotation-item/annotation-item';
import { TDocumentAnnotation } from '../../../annotations/models/annotation.model';
import { IDocumentPage } from '../../models/document.model';
import {getPercentPosition} from '../../../../shared/utils/position.util';

@Component({
  selector: 'app-document-page',
  imports: [AnnotationItem],
  templateUrl: './document-page.html',
  styleUrl: './document-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentPage {
  readonly page = input.required<IDocumentPage>();
  readonly zoom = input.required<number>();
  readonly annotations = input.required<TDocumentAnnotation[]>();
  readonly isAddingText = input<boolean>();

  readonly pageClicked = output<{
    pageNumber: number;
    x: number;
    y: number;
  }>();

  readonly annotationMoved = output<{
    id: string;
    x: number;
    y: number;
  }>();

  readonly annotationDeleted = output<string>();

  private readonly pageElement = viewChild.required<ElementRef<HTMLElement>>('pageElement');

  onPageClick(event: MouseEvent): void {
    if (!this.isAddingText()) {
      return;
    }

    const position = getPercentPosition(event, this.pageElement().nativeElement);

    this.pageClicked.emit({
      pageNumber: this.page().number,
      ...position,
    });
  }
}
