import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule]
})
export class SidebarComponent {
  @Input() selectedCategory: string | null = null;
  categories: string[] = [];

  constructor() {}

  selectCategory(cat: string | null): void {
    // Router navigation removed since router is not present.
  }
}
