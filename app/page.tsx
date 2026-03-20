import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      {/* A nice greeting for your practice */}
      <h1 className="text-4xl font-black mb-6 text-slate-900 tracking-tight">
        My Spiritual Journey
      </h1>
      
      <Link 
        href="/login" 
        className="px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl shadow-lg hover:bg-purple-700 hover:scale-105 transition-all duration-200"
      >
        Sign In to Practice
      </Link>
      
      <p className="mt-6 text-slate-500 font-medium italic">
        "Consistency is the key to spiritual growth."
      </p>
    </div>
  );
}