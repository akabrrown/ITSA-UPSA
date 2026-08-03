'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { changePasswordAction } from '@/lib/auth-actions';
import { Lock, AlertCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    setError(null);

    const form = new FormData();
    form.append('password', formData.password);
    form.append('confirmPassword', formData.confirmPassword);

    const result = await changePasswordAction(form);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/dashboard');
        router.refresh();
      }, 1500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8 animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Action Required</h1>
          <p className="text-gray-500 text-sm mt-2">
            For security reasons, you must change your temporary password before accessing the system.
          </p>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center py-6 text-emerald-600 space-y-4">
            <CheckCircle className="w-16 h-16 animate-bounce" />
            <p className="font-semibold">Password updated successfully!</p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p>{error}</p>
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">New Password</label>
              <input 
                type="password" 
                required 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-itsa-navy focus:border-transparent transition-all outline-none"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
              <input 
                type="password" 
                required 
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-itsa-navy focus:border-transparent transition-all outline-none"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading || !formData.password || !formData.confirmPassword}
              className="w-full py-3 bg-itsa-navy text-white font-bold rounded-xl hover:bg-itsa-navy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-4"
            >
              {loading ? 'Updating Password...' : 'Save & Continue'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
