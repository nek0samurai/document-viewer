export interface IDocumentPage {
  number: number;
  imageUrl: string;
}

export interface IDocumentDto {
  name: string;
  pages: IDocumentPage[];
}

export interface IDocumentView extends IDocumentDto {
  id?: string;
}
