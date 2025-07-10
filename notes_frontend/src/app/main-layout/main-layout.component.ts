import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    SidebarComponent
  ]
})
export class MainLayoutComponent {
  public auth: AuthService;
  constructor(auth: AuthService) {
    this.auth = auth;
  }
  logout(): void {
    this.auth.logout().subscribe();
  }
}
