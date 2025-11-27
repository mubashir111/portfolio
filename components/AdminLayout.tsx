import React from 'react';
import { useData } from '../context/DataContext';
import { Navigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Briefcase, Users, Settings, LogOut, Code2, Layers } from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth, logout } = useData();
  const location = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/admin" },
    { icon: Settings, label: "Profile Info", path: "/admin/profile" },
    { icon: Layers, label: "Services", path: "/admin/services" },
    { icon: Briefcase, label: "Experience", path: "/admin/experience" },
    { icon: Code2, label: "Projects", path: "/admin/projects" },
    { icon: Users, label: "Testimonials", path: "/admin/testimonials" },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-200">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-700">
            <Link to="/" className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
                <span className="text-xl font-bold text-white">Admin Panel</span>
            </Link>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-900/50' 
                    : 'text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button 
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 md:hidden flex justify-between items-center sticky top-0 z-20">
             <span className="font-bold text-white">Admin Panel</span>
             <button onClick={logout} className="text-red-400"><LogOut size={20}/></button>
        </header>
        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};