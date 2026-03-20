'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient'; // Make sure this file exists!

export default function TrackerPage() {
  // 1. State for Meditations (Multi-select)
  const [selectedMeds, setSelectedMeds] = useState<string[]>([]);
  
  // 2. State for Inner Purification (Checkboxes)
  const [reflection, setReflection] = useState(false);
  const [blueTriangle, setBlueTriangle] = useState(false);

  const meditationList = ["MTH", "Meditation on Blue Pearl", "Arhatic Dhyan", "Arhatic Inner Breath"];

  const toggleMeditation = (name: string) => {
    setSelectedMeds(prev => 
      prev.includes(name) ? prev.filter(m => m !== name) : [...prev, name]
    );
  };

// Inside your TrackerPage function
const [userName, setUserName] = useState('');
const [streakCount, setStreakCount] = useState(0); // <-- ADD THIS LINE

useEffect(() => {
  async function fetchName() {
    const { data: { user } } = await supabase.auth.getUser();
    console.log("Current User ID:", user?.id); // CHECK 1

    if (user) {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();
      
      if (error) console.error("Profile Fetch Error:", error); // CHECK 2
      if (data) {
        console.log("Found Name:", data.full_name); // CHECK 3
        setUserName(data.full_name);
      }
    }
  }
  fetchName();
}, []);

// In your return/JSX:
<h1 className="text-3xl font-black text-slate-900">
  Namaste, {userName} <span className="text-orange-500">🔥 {streakCount}</span>
</h1>

const handleSave = async () => {
  try {
    // 1. Get the current user (if you've set up Auth)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Please sign in to save your progress!");
      return;
    }

    // 2. Prepare the data for 'spiritual_logs'
    const logs = selectedMeds.map(med => ({
      user_id: user.id,
      category: 'Meditation',
      activity_name: med
    }));

    // Add Purification items if checked
    if (reflection) logs.push({ user_id: user.id, category: 'Purification', activity_name: 'Inner Reflection' });
    if (blueTriangle) logs.push({ user_id: user.id, category: 'Purification', activity_name: 'Blue Triangle' });

    // 3. Insert into Supabase
    const { error } = await supabase.from('spiritual_logs').insert(logs);

    if (error) throw error;
    // Inside handleSave function
const today = new Date().toISOString().split('T')[0];

const { data: profile } = await supabase
  .from('profiles')
  .select('streak_count, last_log_date')
  .eq('id', user.id)
  .single();

let newStreak = profile?.streak_count || 0;
const lastDate = profile?.last_log_date;

if (lastDate === today) {
  // Already logged today, streak stays the same
} else {
  // Check if yesterday was the last log to continue streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastDate === yesterdayStr) {
    newStreak += 1;
  } else {
    newStreak = 1; // Reset to 1 if a day was missed
  }
}

// Update the profile with the new streak
await supabase
  .from('profiles')
  .update({ streak_count: newStreak, last_log_date: today })
  .eq('id', user.id);
    alert("Great work! Your practice is logged.");
    // Reset the form
    setSelectedMeds([]);
    setReflection(false);
    setBlueTriangle(false);

  } catch (error) {
    console.error("Error saving:", error);
    alert("Something went wrong while saving.");
  }
};
  return (
  <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
    <div className="max-w-md mx-auto space-y-6">
      
      {/* 1. PERSONALIZED HEADER */}
      <header className="p-6 bg-white rounded-3xl shadow-md border-2 border-purple-100 bg-gradient-to-r from-white to-purple-50">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Namaste, <span className="text-purple-600">{userName || 'Sathish'}</span>
        </h1>
        <p className="text-slate-500 text-sm font-bold mt-2 uppercase tracking-widest">
          Spiritual Practise • Daily Log
        </p>
      </header>

      {/* 2. DAILY MEDITATIONS SECTION */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
          🧘‍♂️ Daily Meditations
        </h2>
        <div className="grid grid-cols-1 gap-3">
          {['MTH', 'Arhatic Dhyan', 'Meditation on Blue Pearl', 'Arhatic Inner Breath'].map((med) => (
            <button
              key={med}
              onClick={() => {
                setSelectedMeds(prev => 
                  prev.includes(med) ? prev.filter(m => m !== med) : [...prev, med]
                );
              }}
              className={`p-4 rounded-2xl text-left font-bold transition-all border-2 ${
                selectedMeds.includes(med) 
                ? 'bg-purple-600 border-purple-600 text-white shadow-lg scale-[1.02]' 
                : 'bg-slate-50 border-slate-100 text-slate-600 hover:border-purple-200'
              }`}
            >
              {med}
            </button>
          ))}
        </div>
      </section>

      {/* 3. PURIFICATION SECTION */}
      <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4 text-slate-800 flex items-center gap-2">
          ✨ Inner Purification
        </h2>
        <div className="space-y-4">
          <label className="flex items-center gap-3 p-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={reflection} 
              onChange={() => setReflection(!reflection)}
              className="w-6 h-6 rounded-full accent-purple-600"
            />
            <span className="text-slate-700 font-medium">Inner Reflection & Firm Resolution</span>
          </label>
          <label className="flex items-center gap-3 p-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={blueTriangle} 
              onChange={() => setBlueTriangle(!blueTriangle)}
              className="w-6 h-6 rounded-full accent-purple-600"
            />
            <span className="text-slate-700 font-medium">Blue Triangle</span>
          </label>
        </div>
      </section>

      {/* 4. SAVE BUTTON */}
      <button 
        onClick={handleSave}
        className="w-full bg-slate-900 text-white font-black py-5 rounded-3xl shadow-xl active:scale-[0.95] transition-all hover:bg-black text-lg"
      >
        SAVE DAILY PROGRESS
      </button>

    </div>
  </div>
);

  
}