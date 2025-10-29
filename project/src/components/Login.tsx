import React, { useState } from 'react';
import { User, Lock, GraduationCap } from 'lucide-react';
import { authService } from '../services/authService';
import { User as UserType } from '../types';

interface LoginProps {
  onLoginSuccess: (user: UserType) => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showCredentials, setShowCredentials] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = authService.login(identifier, password);

    if (result.success && result.user) {
      onLoginSuccess(result.user);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-100 to-lavender-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-700 px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-full mb-4">
              <GraduationCap size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Unified Academic Portal
            </h1>
            <p className="text-violet-100">
              Student, Parent & Coordinator Access
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number / Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-violet-400" />
                  </div>
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="4311001 or coordinator@college.edu"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-violet-400" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-violet-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl"
              >
                Login
              </button>
            </form>

            <div className="mt-6">
              <button
                onClick={() => setShowCredentials(!showCredentials)}
                className="text-sm text-violet-600 hover:text-violet-800 font-medium"
              >
                {showCredentials ? 'Hide' : 'Show'} Demo Credentials
              </button>

              {showCredentials && (
                <div className="mt-4 p-4 bg-violet-50 rounded-lg text-sm space-y-2">
                  <p className="font-semibold text-violet-900">Sample Login Credentials:</p>
                  <div className="space-y-1 text-violet-700">
                    <p><strong>Student:</strong> 4311001 / student1@123</p>
                    <p><strong>Parent:</strong> 4311001 / parent1@123</p>
                    <p><strong>Coordinator:</strong> coordinator@college.edu / coord@123</p>
                  </div>
                  <p className="text-xs text-violet-600 mt-2">
                    * Students 4311001-4311060 available
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
