import { Component, Input } from '@angular/core';
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

  selectCategory(): void {
    // Router navigation removed since router is not present.
  }
}
