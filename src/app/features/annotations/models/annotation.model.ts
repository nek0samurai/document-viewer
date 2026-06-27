import {IPercentPosition} from '../../../shared/utils/position.util';

export interface IAnnotationBase extends IPercentPosition {
  id: string;
  pageNumber: number;
}

export interface ITextAnnotation extends IAnnotationBase {
  type: 'text';
  text: string;
}

export type TAnnotationType = 'text';
export type TDocumentAnnotation = ITextAnnotation;
export type TAddAnnotationPayload = Pick<IAnnotationBase, "pageNumber" | "x" | "y">
export type TMoveAnnotationPayload = Pick<IAnnotationBase, "x" | "y" | "id">
