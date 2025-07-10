import { Component } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'note-form',
  templateUrl: './note-form.component.html',
  styleUrl: './note-form.component.css',
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
export class NoteFormComponent {
  title = '';
  content = '';
  category = '';
  loading = false;
  error: string | null = null;

  constructor(
    private notesService: NotesService,
    private auth: AuthService,
    private router: Router
  ) {}

  createNote(): void {
    if (!this.title || !this.content) {
      this.error = 'Title and content are required.';
      return;
    }
    this.loading = true;
    this.auth.user$.subscribe(user => {
      if (!user) { this.error = 'Not authenticated!'; this.loading = false; }
      else {
        this.notesService.createNote({
          title: this.title,
          content: this.content,
          category: this.category,
          user_id: user.id
        }).subscribe({
          next: note => {
            this.loading = false;
            this.router.navigate(['/note', note!.id]);
          },
          error: (err: any) => {
            this.error = err.error?.message || 'Failed to create note.';
            this.loading = false;
          }
        });
      }
    });
  }
}
