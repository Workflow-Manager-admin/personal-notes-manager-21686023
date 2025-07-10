import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent)
  },
  {
    path: '',
    loadComponent: () => import('./main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./notes/notes-list/notes-list.component').then(m => m.NotesListComponent)
      },
      {
        path: 'note/:id',
        loadComponent: () => import('./notes/note-details/note-details.component').then(m => m.NoteDetailsComponent)
      },
      {
        path: 'add',
        loadComponent: () => import('./notes/note-form/note-form.component').then(m => m.NoteFormComponent)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];
