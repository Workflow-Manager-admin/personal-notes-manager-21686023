import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService, Note } from '../../services/notes.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'note-details',
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class NoteDetailsComponent implements OnInit {
  note: Note | null = null;
  loading = false;
  editMode = false;
  error: string | null = null;

  editTitle = '';
  editContent = '';
  editCategory = '';

  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    if (noteId) this.loadNote(noteId);
  }

  loadNote(id: string): void {
    this.loading = true;
    this.notesService.getNoteById(id).subscribe((note: Note | null) => {
      this.note = note;
      this.loading = false;
    });
  }

  startEdit(): void {
    if (!this.note) return;
    this.editMode = true;
    this.editTitle = this.note.title;
    this.editContent = this.note.content;
    this.editCategory = this.note.category || '';
  }

  saveEdit(): void {
    if (!this.note) return;
    this.loading = true;
    this.notesService.updateNote(this.note.id, {
      title: this.editTitle,
      content: this.editContent,
      category: this.editCategory
    }).subscribe({
      next: (updated: Note | null) => {
        this.note = updated!;
        this.editMode = false;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = err.error?.message || 'Failed to update note.';
        this.loading = false;
      }
    });
  }

  deleteNote(): void {
    if (!this.note) return;
    if (!(globalThis.confirm('Delete this note?'))) return;
    this.loading = true;
    this.notesService.deleteNote(this.note.id).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => {
        this.error = "Failed to delete note."; this.loading = false;
      }
    });
  }
}
