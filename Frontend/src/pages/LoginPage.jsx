import React, { useState } from 'react';
import { ArrowLeft, Zap, Loader2 } from 'lucide-react';

export default function LoginPage({ onLoginSuccess, onBack }) {
  const [email, setEmail] = useState('shreya@gmail.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock bypass for testing out the UI
    if (email === 'shreya@gmail.com' && password === '123456') {
      setTimeout(() => {
        localStorage.setItem('token', 'mock_token_for_testing');
        onLoginSuccess({ name: 'Shreya', initials: 'S', email: 'shreya@gmail.com' });
        setLoading(false);
      }, 800);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      // Store token (in a real app, use localStorage or secure cookie)
      localStorage.setItem('token', data.access_token);
      
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f8fafc] font-sans overflow-x-hidden">
      <nav className="w-full bg-[#1a2744] text-white flex items-center px-8 py-5 shrink-0 shadow-md">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors mr-6"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <div className="flex items-center gap-3">
          <img 
            src="/shnoor-logo.png" 
            alt="Shnoor" 
            className="h-8 object-contain"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="text-xl font-bold font-serif tracking-wide">
            SHNOOR INTERNATIONAL
          </span>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white p-10 rounded-lg shadow-lg border border-gray-200 w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#1a2744] font-serif mb-2 text-center">Welcome Back</h2>
          <p className="text-gray-500 mb-8 text-center">Login to your dashboard</p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 border border-red-200 rounded text-sm font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                placeholder="admin@shnoor.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-[#2563eb] hover:bg-blue-600 text-white font-bold rounded shadow-md transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <span className="text-[#2563eb] cursor-pointer hover:underline">Contact Admin</span>
          </div>
        </div>
      </main>
    </div>
  );
}
