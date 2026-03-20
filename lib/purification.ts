import { supabase } from './supabaseClient';

export async function getPurificationDay(userId: string) {
  const { data, error } = await supabase
    .from('purification_progress')
    .select('current_day, last_completed_date')
    .eq('user_id', userId)
    .single();

  if (error || !data) return 1; // Default to Day 1

  const today = new Date().toISOString().split('T')[0];
  
  // If you finished yesterday, today is the next day.
  // If you finished today already, stay on the same day.
  if (data.last_completed_date !== today) {
    return data.current_day; 
  }
  
  return data.current_day;
}