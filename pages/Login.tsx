import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Lock } from 'lucide-react';

export const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useData();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Invalid password. Try "admin123"');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-2xl">
        <div className="text-center mb-8">
          <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-500 border border-slate-700">
            <Lock size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white">Admin Access</h2>
          <p className="text-slate-400 mt-2 text-sm">Enter your password to manage the portfolio.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button type="submit" className="w-full">
            Sign In
          </Button>
          
          <div className="text-center mt-4">
             <a href="/" className="text-sm text-slate-500 hover:text-white transition-colors">Return to Home</a>
          </div>
        </form>
      </div>
    </div>
  );
};