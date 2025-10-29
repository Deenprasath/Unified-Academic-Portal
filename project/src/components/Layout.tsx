import React from 'react';
import { LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  onLogout: () => void;
}

export function Layout({ children, title, onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-lavender-100">
      <header className="bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Unified Academic Portal</h1>
              <p className="text-violet-100 text-sm mt-1">{title}</p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
