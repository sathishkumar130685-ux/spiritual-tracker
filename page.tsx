import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <h1 className="text-3xl font-bold mb-4">My Spiritual Journey</h1>
      <Link 
        href="/tracker" 
        className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
      >
        Go to Daily Tracker
      </Link>
    </div>
  );
}