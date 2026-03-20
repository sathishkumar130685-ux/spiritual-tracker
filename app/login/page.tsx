'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) alert(error.message);
    else router.push('/tracker');
    setLoading(false);
  };

  const handleSignUp = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    
    if (error) alert(error.message);
    else alert("Account created! You can now login.");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 text-center">PranaTrack Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <button 
            onClick={handleSignUp}
            className="w-full bg-white text-purple-600 border-2 border-purple-600 py-3 rounded-2xl font-bold hover:bg-purple-50 transition"
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}