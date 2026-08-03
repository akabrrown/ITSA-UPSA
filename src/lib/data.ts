import { createClient } from '@/lib/supabase/server';
import { BannerSlide, PresidentSpeech, NewsPost, Activity, Tutorial, AcademicResource, DepartmentInfo, DepartmentAuthority, ItsaExecutive } from '@/types/database.types';

export async function getBannerSlides(): Promise<BannerSlide[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('banner_slides').select('*').eq('is_active', true).order('display_order', { ascending: true });
  if (error) console.error(error);
  return data || [];
}

export async function getPresidentSpeech(): Promise<PresidentSpeech | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('president_speech').select('*').limit(1).single();
  if (error) console.error(error);
  return data || null;
}

export async function getNewsPosts(limit = 6): Promise<NewsPost[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('news_posts').select('*').eq('is_published', true).order('published_at', { ascending: false }).limit(limit);
  if (error) console.error(error);
  return data || [];
}

export async function getActivities(status?: 'upcoming' | 'past'): Promise<Activity[]> {
  const supabase = await createClient();
  let query = supabase.from('activities').select('*').order('start_date', { ascending: status === 'upcoming' });
  if (status) query = query.eq('status', status);
  
  const { data, error } = await query;
  if (error) console.error(error);
  return data || [];
}

export async function getTutorials(): Promise<Tutorial[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('tutorials').select('*').eq('is_published', true).order('created_at', { ascending: false });
  if (error) console.error(error);
  return data || [];
}

export async function getAcademicResources(): Promise<AcademicResource[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('academic_resources').select('*').order('created_at', { ascending: false });
  if (error) console.error(error);
  return data || [];
}

export async function getDepartmentInfo(): Promise<DepartmentInfo | null> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('department_info').select('*').limit(1).single();
  if (error) console.error(error);
  return data || null;
}

export async function getDepartmentAuthorities(): Promise<DepartmentAuthority[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('department_authorities').select('*').order('display_order', { ascending: true });
  if (error) console.error(error);
  return data || [];
}

export async function getItsaExecutives(): Promise<ItsaExecutive[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('itsa_executives').select('*').order('display_order', { ascending: true });
  if (error) console.error(error);
  return data || [];
}
