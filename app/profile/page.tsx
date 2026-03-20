'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ProfilePage() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
        if (data) setName(data.full_name);
      }
      setLoading(false);
    }
    getProfile();
  }, []);

  const updateProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('profiles').upsert({ id: user?.id, full_name: name });
    if (error) alert(error.message);
    else alert("Profile updated!");
  };

  if (loading) return <p className="p-8 text-center">Loading...</p>;

  return (
    <div className="max-w-md mx-auto p-8 bg-white mt-10 rounded-3xl shadow-sm border">
      <h1 className="text-xl font-bold mb-4">What is your name?</h1>
      <input 
        className="w-full p-4 border rounded-2xl mb-4 outline-none focus:ring-2 focus:ring-purple-500"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name..."
      />
      <button onClick={updateProfile} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold">
        Save Name
      </button>
    </div>
  );
}