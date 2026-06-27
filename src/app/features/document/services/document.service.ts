import { httpResource } from '@angular/common/http';
import { Injectable, Signal } from '@angular/core';
import {IDocumentDto, IDocumentView} from '../models/document.model';
import {ITextAnnotation} from '../../annotations/models/annotation.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {

  getDocument(id: Signal<string>) {
    return httpResource<IDocumentDto>(() => {
      return `/mock/${id()}.json`;
    });
  }

  saveDocument(document: IDocumentView | null, annotations: ITextAnnotation[]) {

    if (!document) {
      return;
    }

    console.log({
      documentId: document.id,
      name: document.name,
      pages: document.pages,
      annotations: annotations,
    });
  }
}
