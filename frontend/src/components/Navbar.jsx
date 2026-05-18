import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  BarChart3, 
  BookOpen, 
  FileText, 
  Award, 
  ChevronDown, 
  PieChart, 
  LineChart, 
  TrendingUp, 
  Lightbulb, 
  BrainCircuit, 
  GraduationCap, 
  Target, 
  Download, 
  Calendar,
  Medal,
  Layers,
  Sun,
  Moon
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const loginTime = localStorage.getItem('loginTime');
  const [elapsedTime, setElapsedTime] = useState(0);

  // Custom Toast State
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    if (token && loginTime) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - parseInt(loginTime)) / 1000));
      }, 1000);
      
      setElapsedTime(Math.floor((Date.now() - parseInt(loginTime)) / 1000));
      
      return () => clearInterval(interval);
    }
  }, [token, loginTime]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loginTime');
    navigate('/login');
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const handleItemClick = (featureName) => {
    let targetPath = '/dashboard?view=directory';
    if (featureName === 'Search & Filters') {
      targetPath = '/dashboard?view=directory&focus=search';
    }

    if (!token) {
      setToast({
        show: true,
        message: `To access "${featureName}", please log in or register first. Redirecting...`,
        type: 'info'
      });
      setTimeout(() => {
        setToast({ show: false, message: '', type: 'success' });
        navigate('/login');
      }, 2500);
    } else {
      setToast({
        show: true,
        message: `"${featureName}" has been successfully loaded!`,
        type: 'success'
      });
      setTimeout(() => {
        setToast({ show: false, message: '', type: 'success' });
        navigate(targetPath);
      }, 1000);
    }
  };

  return (
    <nav className="bg-[#fffbeb] shadow-sm border-b border-amber-100 relative z-50">
      {/* Custom Keyframe Styles for Toast Notification */}
      <style>{`
        @keyframes slide-in-toast {
          0% { transform: translateY(-30px) scale(0.9); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-toast {
          animation: slide-in-toast 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .glass-toast {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>

      {/* Sleek Custom Glassmorphic Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-[9999] animate-toast">
          <div className={`p-4 rounded-2xl shadow-2xl border flex items-center gap-3.5 glass-toast max-w-sm transition-all ${
            toast.type === 'success' 
              ? 'border-emerald-200 text-emerald-950 shadow-emerald-900/5' 
              : 'border-amber-200 text-amber-950 shadow-amber-900/5'
          }`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white shadow-sm shrink-0 ${
              toast.type === 'success' ? 'bg-emerald-600' : 'bg-amber-600'
            }`}>
              {toast.type === 'success' ? '✓' : 'ℹ'}
            </div>
            <div className="text-sm font-bold leading-snug">
              {toast.message}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="text-xl font-bold text-amber-700 tracking-tight flex items-center gap-2.5">
          <div className="bg-amber-600 text-white p-1.5 rounded-xl shadow-md shadow-amber-600/30 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <path d="M17 21v-2a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v2" />
              <circle cx="11" cy="7" r="3" />
              <path d="M23 21v-2a3 3 0 0 0-3-3h-1" />
              <circle cx="20" cy="8" r="2" />
            </svg>
          </div>
          <span className="dark:text-amber-500 transition-colors">ElevateHR</span>
        </Link>



        {/* Right Navigation Controls */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center justify-center hover:bg-stone-50 hover:border-amber-200 transition-all text-stone-700 hover:text-amber-700 cursor-pointer shrink-0"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          {token ? (
            <>
              {/* Session Tracker */}
              <div className="flex flex-col items-end bg-amber-50 px-3.5 py-1 rounded-lg border border-amber-100/80 shadow-sm">
                <span className="text-[9px] uppercase font-bold text-amber-600/70 tracking-wider">Session Time</span>
                <span className="text-sm font-mono font-bold text-amber-800 tabular-nums">{formatTime(elapsedTime)}</span>
              </div>
              <Link to="/dashboard" className="text-stone-600 hover:text-amber-700 font-semibold transition-colors hidden sm:inline-block">Dashboard</Link>
              <Link to="/add-employee" className="text-stone-600 hover:text-amber-700 font-semibold transition-colors bg-white border border-stone-200 px-4 py-2.5 rounded-xl hover:border-amber-200 shadow-sm">Add Employee</Link>
              <button 
                onClick={handleLogout}
                className="bg-stone-200 hover:bg-rose-100 text-stone-700 hover:text-rose-700 px-4.5 py-2.5 rounded-xl transition-colors font-bold cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-stone-600 hover:text-amber-700 font-bold transition-colors">Login</Link>
              <Link to="/register" className="bg-amber-600 hover:bg-amber-700 shadow-md shadow-amber-600/20 text-white px-5.5 py-2.5 rounded-xl transition-all font-bold">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
