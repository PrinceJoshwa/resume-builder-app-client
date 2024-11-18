import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  LogOut, 
  ChevronDown,
  User
} from 'lucide-react';

export default function Sidebar({ onLogout }) {
  const location = useLocation();
  const [isResumeOpen, setIsResumeOpen] = useState(true);

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col">
      {/* User Profile Section */}
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div>
            <h2 className="font-semibold">Resume Builder</h2>
            <p className="text-sm text-gray-500">Build Your Future</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <Link
            to="/dashboard"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
              isActive('/dashboard') 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>

          {/* Resume Section */}
          <div>
            <button
              onClick={() => setIsResumeOpen(!isResumeOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-3">
                <FileText size={20} />
                <span>Resume</span>
              </div>
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  isResumeOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {isResumeOpen && (
              <div className="ml-9 mt-1 space-y-1">
                <Link
                  to="/templates"
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    isActive('/templates') 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Resume Templates
                </Link>
                <Link
                  to="/my-resumes"
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    isActive('/my-resumes') 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  My Resumes
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}