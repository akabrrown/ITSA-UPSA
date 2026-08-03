'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      // Security rule: Generic error messages
      setError('Incorrect email or password.');
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-md border border-red-100">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email Address</label>
        <input 
          id="email"
          type="email" 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-itsa-gold focus:border-transparent"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
        <input 
          id="password"
          type="password" 
          required 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-itsa-gold focus:border-transparent"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-itsa-navy hover:bg-itsa-navy-dark text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-70"
      >
        {loading ? 'Authenticating...' : 'Sign In'}
      </button>
    </form>
  );
}
