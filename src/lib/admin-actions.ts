'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

// We must use a service role key to bypass RLS for admin mutations, OR ensure the user is authenticated via SSR auth.
// Since this is MVP and we are doing admin panels, we'll use a Supabase client configured for mutations.
// If you have RLS policies set up to allow authenticated admins, passing the access token is best.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // For secure production, use SERVICE_ROLE_KEY if bypassing RLS

function getAdminClient() {
  return createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    }
  });
}

// generic insert
export async function insertRecord<T>(table: string, data: T, pathToRevalidate?: string) {
  const supabase = getAdminClient();
  const { data: inserted, error } = await supabase.from(table).insert(data as any).select().single();
  
  if (error) {
    console.error(`Error inserting into ${table}:`, error);
    throw new Error(error.message);
  }

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
    revalidatePath('/admin/dashboard/' + table); // generic flush
  }
  return inserted;
}

// generic update
export async function updateRecord<T>(table: string, id: string, data: T, pathToRevalidate?: string) {
  const supabase = getAdminClient();
  const { data: updated, error } = await supabase.from(table).update(data as any).eq('id', id).select().single();
  
  if (error) {
    console.error(`Error updating ${table}:`, error);
    throw new Error(error.message);
  }

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
    revalidatePath('/admin/dashboard/' + table);
  }
  return updated;
}

// generic delete
export async function deleteRecord(table: string, id: string, pathToRevalidate?: string) {
  const supabase = getAdminClient();
  const { error } = await supabase.from(table).delete().eq('id', id);
  
  if (error) {
    console.error(`Error deleting from ${table}:`, error);
    throw new Error(error.message);
  }

  if (pathToRevalidate) {
    revalidatePath(pathToRevalidate);
    revalidatePath('/admin/dashboard/' + table);
  }
  return true;
}
