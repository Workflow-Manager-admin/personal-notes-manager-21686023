import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable } from 'rxjs';

export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  category: string | null;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(supabase: SupabaseService) {}

  getNotes(userId: string): Observable<Note[]> {
    return from(this.supabase.getClient()
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .then((res: any) => res.data || []));
  }

  getNoteById(id: string): Observable<Note | null> {
    return from(this.supabase.getClient()
      .from('notes')
      .select('*').eq('id', id).single().then((res: any) => res.data));
  }

  createNote(note: Partial<Note>): Observable<Note | null> {
    return from(this.supabase.getClient()
      .from('notes').insert(note).select().single().then((res: any) => res.data));
  }

  updateNote(id: string, update: Partial<Note>): Observable<Note | null> {
    return from(this.supabase.getClient()
      .from('notes').update(update).eq('id', id).select().single().then((res: any) => res.data));
  }

  deleteNote(id: string): Observable<void> {
    return from(this.supabase.getClient().from('notes').delete().eq('id', id).then(() => {}));
  }

  searchNotes(userId: string, query: string): Observable<Note[]> {
    return from(this.supabase.getClient()
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('updated_at', { ascending: false })
      .then((res: any) => res.data || []));
  }

  getCategories(userId: string): Observable<string[]> {
    return from(this.supabase.getClient()
      .from('notes')
      .select('category')
      .eq('user_id', userId)
      .neq('category', null)
      .then((res: any) => Array.from(new Set((res.data || []).map((n: { category: string }) => n.category)).values()).filter((c): c is string => typeof c === "string" && c !== null)));
  }
}
