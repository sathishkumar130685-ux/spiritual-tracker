'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function ReportPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('spiritual_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('completed_at', { ascending: false });
        
        if (data) setLogs(data);
      }
      setLoading(false);
    }
    fetchLogs();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading your progress...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Practice Report</h1>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 uppercase font-bold">Total Sessions</p>
            <p className="text-3xl font-bold text-purple-600">{logs.length}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-xs text-slate-400 uppercase font-bold">Meditation types</p>
            <p className="text-3xl font-bold text-blue-600">
              {new Set(logs.map(l => l.activity_name)).size}
            </p>
          </div>
        </div>

        <h2 className="text-sm font-bold text-slate-400 uppercase mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {logs.map((log) => (
            <div key={log.id} className="bg-white p-4 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-800">{log.activity_name}</p>
                <p className="text-xs text-slate-400">{new Date(log.completed_at).toLocaleDateString()}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-slate-100 rounded text-slate-500">
                {log.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}