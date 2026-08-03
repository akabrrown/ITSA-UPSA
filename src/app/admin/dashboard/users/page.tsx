'use client';

import { useState } from 'react';
import { createUserAction } from '@/lib/auth-actions';
import { UserPlus, Shield, CheckCircle, AlertCircle } from 'lucide-react';

export default function UserManagementPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    role: 'Editor',
  });
  
  const [generatedPassword, setGeneratedPassword] = useState('');

  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let pass = '';
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setGeneratedPassword(pass);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!generatedPassword) {
      setError('Please generate a temporary password first.');
      return;
    }
    
    setLoading(true);
    setError(null);
    setSuccess(null);

    const form = new FormData();
    form.append('email', formData.email);
    form.append('password', generatedPassword);
    form.append('role', formData.role);

    const result = await createUserAction(form);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(`User ${formData.email} created successfully. They will be forced to change their password on first login.`);
      setFormData({ email: '', role: 'Editor' });
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-itsa-navy text-white flex items-center justify-center shadow-sm">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Roles & Access</h1>
          <p className="text-sm text-gray-500">Provision new accounts and manage system roles</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-itsa-gold-dark" />
            Create New User
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            New users are created with a temporary password and will be forced to set a new one on their first login.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="p-4 bg-emerald-50 text-emerald-700 text-sm rounded-xl border border-emerald-100 flex flex-col gap-2">
              <div className="flex items-center gap-3 font-semibold">
                <CheckCircle className="w-5 h-5" />
                {success}
              </div>
              <div className="bg-white p-3 rounded-lg border border-emerald-200 mt-2 font-mono text-sm break-all">
                <span className="text-gray-500">Temporary Password:</span> <strong>{generatedPassword}</strong>
                <p className="text-xs text-gray-500 mt-1">Securely copy and send this password to the user. It will not be shown again.</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email Address *</label>
              <input 
                type="email" 
                required 
                placeholder="name@example.com"
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-itsa-navy focus:border-transparent transition-all outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">System Role *</label>
              <select 
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-itsa-navy focus:border-transparent transition-all outline-none bg-white"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
              >
                <option value="Superadmin">Superadmin</option>
                <option value="Editor">Editor</option>
                <option value="Author">Author</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Temporary Password *</label>
            <div className="flex gap-3">
              <input 
                type="text" 
                required 
                readOnly
                placeholder="Click generate"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl bg-gray-50 text-gray-600 font-mono focus:outline-none"
                value={generatedPassword}
              />
              <button 
                type="button" 
                onClick={generatePassword}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors border border-gray-200"
              >
                Generate
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={loading || !generatedPassword || !formData.email}
              className="px-6 py-2.5 bg-itsa-navy text-white text-sm font-semibold rounded-xl hover:bg-itsa-navy-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              {loading ? 'Creating...' : 'Create User Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
