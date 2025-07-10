import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { SupabaseService } from './supabase.service';
import { User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User | null>(null);

  constructor(supabase: SupabaseService) {
    // On construction, try to fetch current user and listen for changes.
    this.refreshUser = () => {};
    supabase.getClient();
  }

  get user$(): Observable<User | null> {
    return this._user.asObservable();
  }

  async refreshUser() {
    const user = await this.supabase.getUser();
    this._user.next(user);
  }

  login(email: string, password: string): Observable<{ error: any }> {
    return from(this.supabase.getClient().auth.signInWithPassword({ email, password }));
  }

  signUp(email: string, password: string): Observable<{ error: any }> {
    return from(this.supabase.getClient().auth.signUp({ email, password }));
  }

  logout(): Observable<void> {
    return from(this.supabase.signOut());
  }
}
