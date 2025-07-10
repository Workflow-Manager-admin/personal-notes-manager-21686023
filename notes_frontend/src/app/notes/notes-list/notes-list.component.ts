import { Component, OnInit } from '@angular/core';
import { NotesService, Note } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule, SlicePipe, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'notes-list',
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.css',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    SlicePipe,
    DatePipe
  ]
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  searchTerm = '';
  loading = false;
  selectedCategory: string | null = null;

  ngOnInit(): void {
    const auth = window['ng'].injector.get(AuthService);
    auth.user$.subscribe((user: any) => {
      if (!user) return;
      this.loadNotes(user.id);
    });
  }

  loadNotes(userId: string, query = '', category: string | null = null): void {
    this.loading = true;
    const notesService = window['ng'].injector.get(NotesService);
    (query
      ? notesService.searchNotes(userId, query)
      : notesService.getNotes(userId)
    ).subscribe((notes: Note[]) => {
      this.notes = category
        ? notes.filter(n => n.category === category)
        : notes;
      this.loading = false;
    });
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement | null;
    const term = input?.value || '';
    this.searchTerm = term;
    const auth = window['ng'].injector.get(AuthService);
    auth.user$.subscribe((user: any) => {
      if (user) this.loadNotes(user.id, term, this.selectedCategory);
    });
  }

  selectNote(note: Note): void {
    const router = window['ng'].injector.get(Router);
    router.navigate(['/note', note.id]);
  }
}
