import { Component, OnInit } from '@angular/core';
import { NotesService, Note } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { SlicePipe, DatePipe } from '@angular/common';
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

  constructor(
    private notesService: NotesService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(user => {
      if (!user) return;
      this.loadNotes(user.id);
    });
  }

  loadNotes(userId: string, query = '', category: string | null = null): void {
    this.loading = true;
    (query
      ? this.notesService.searchNotes(userId, query)
      : this.notesService.getNotes(userId)
    ).subscribe(notes => {
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
    this.auth.user$.subscribe(user => {
      if (user) this.loadNotes(user.id, term, this.selectedCategory);
    });
  }

  selectNote(note: Note): void {
    this.router.navigate(['/note', note.id]);
  }
}
