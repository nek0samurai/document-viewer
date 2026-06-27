import { Routes } from '@angular/router';
import { DocumentWorkspace } from './features/document/components/document-workspace/document-workspace';

export const routes: Routes = [
  {
    path: 'documents/:id',
    component: DocumentWorkspace,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'documents/1',
  },
];
