import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://mzxyorlnbfdkneiezgjz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eHlvcmxuYmZka25laWV6Z2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwNDUxMDksImV4cCI6MjA2NzYyMTEwOX0.URYpbwtC2u5ORBlUzpWPNspXMWq_cLBOKWMOgGbilyQ';

/**
 * PUBLIC_INTERFACE
 * SupabaseService provides the Supabase client and authentication/session helpers app-wide.
 */
@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  // PUBLIC_INTERFACE
  getClient(): SupabaseClient {
    /** Returns the Supabase client */
    return this.supabase;
  }

  // PUBLIC_INTERFACE
  async getUser(): Promise<User | null> {
    /** Get the currently authenticated user (if any) */
    const { data: { user } } = await this.supabase.auth.getUser();
    return user;
  }

  // PUBLIC_INTERFACE
  async getSession(): Promise<Session | null> {
    /** Get the current session (if any) */
    const { data: { session } } = await this.supabase.auth.getSession();
    return session;
  }

  // PUBLIC_INTERFACE
  async signOut(): Promise<void> {
    /** Log the current user out */
    await this.supabase.auth.signOut();
  }
}
