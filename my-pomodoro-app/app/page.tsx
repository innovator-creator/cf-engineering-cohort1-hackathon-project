'use client';

import { useState, useEffect, useRef } from 'react';

type Session = {
  id: number;
  duration_minutes: number;
  completed_at: string;
};

export default function Home() {
 const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            saveSession();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [running]);

  const fetchSessions = async () => {
    try {
      const res = await fetch('/api/sessions');
      const data = await res.json();
      if (Array.isArray(data)) {
        setSessions(data);
        setError(null);
      } else {
        setSessions([]);
        setError(data.error || 'Could not load sessions');
      }
    } catch (err) {
      setSessions([]);
      setError('Could not connect to database');
    }
  };

  const saveSession = async () => {
    try {
      await fetch('/api/sessions', { method: 'POST' });
      fetchSessions();
    } catch (err) {
      console.error('Failed to save session');
    }
  };

  const reset = () => {
    setRunning(false);
    setTimeLeft(25 * 60);
  };

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');

  return (
    <main className="min-h-screen bg-red-50 flex flex-col items-center justify-start py-16 px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-2">🍅 Pomodoro Timer</h1>
      <p className="text-gray-500 mb-10">Stay focused. 25 minutes at a time.</p>

      <div className="bg-white rounded-3xl shadow-lg p-12 flex flex-col items-center gap-6 w-full max-w-sm">
        <div className="text-7xl font-mono font-bold text-gray-800">
          {minutes}:{seconds}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setRunning(!running)}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-xl transition"
          >
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-xl transition"
          >
            Reset
          </button>
        </div>
        {timeLeft === 0 && (
          <p className="text-green-600 font-semibold">✅ Session complete!</p>
        )}
      </div>

      <div className="mt-12 w-full max-w-sm">
        <h2 className="text-xl font-bold text-gray-700 mb-4">Last 10 Sessions</h2>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-3 rounded-xl mb-4 text-sm">
            ⚠️ {error}
          </div>
        )}

        {sessions.length === 0 && !error ? (
          <p className="text-gray-400">No sessions yet. Complete your first one!</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {sessions.map((s) => (
              <li key={s.id} className="bg-white rounded-xl shadow px-4 py-3 flex justify-between">
                <span className="text-gray-600">🍅 {s.duration_minutes} min session</span>
                <span className="text-gray-400 text-sm">
                  {new Date(s.completed_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}