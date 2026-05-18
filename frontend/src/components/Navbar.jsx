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
  Layers
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
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
    let viewParam = 'directory';
    if (featureName === 'Performance Charts' || featureName === 'Department Comparison' || featureName === 'Score Distribution') {
      viewParam = 'analytics';
    } else if (featureName === 'Promotion Suggestions' || featureName === 'Improvement Feedback' || featureName === 'AI Summaries') {
      viewParam = 'ai';
    } else if (featureName === 'Recommended Courses' || featureName === 'Skill Gaps') {
      viewParam = 'training';
    } else if (featureName === 'Export PDF/CSV' || featureName === 'Monthly Reports') {
      viewParam = 'reports';
    } else if (featureName === 'Top Employees by Score' || featureName === 'Department Rankings') {
      viewParam = 'rankings';
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
        navigate(`/dashboard?view=${viewParam}`);
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
        <Link to="/" className="text-xl font-bold text-amber-700 tracking-tight flex items-center gap-2">
          <span className="bg-amber-600 text-white p-1.5 rounded-lg shadow-sm shadow-amber-600/20">✨</span>
          ElevateHR
        </Link>

        {/* Dynamic Center Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {/* Analytics Dropdown */}
          <div className="relative group py-2">
            <button 
              className="flex items-center gap-1.5 text-stone-700 hover:text-amber-700 font-semibold transition-colors px-3.5 py-2 rounded-lg group-hover:bg-amber-100/50 cursor-pointer"
            >
              <BarChart3 size={16} /> Analytics <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-3 space-y-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <button onClick={() => handleItemClick('Performance Charts')} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-left text-stone-700 hover:text-amber-900 transition-colors cursor-pointer">
                <LineChart size={18} className="text-amber-600" />
                <div>
                  <div className="text-sm font-semibold">Performance Charts</div>
                  <div className="text-xs text-stone-500">Visual employee growth curves</div>
                </div>
              </button>
              <button onClick={() => handleItemClick('Department-wise Comparison')} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-left text-stone-700 hover:text-amber-900 transition-colors cursor-pointer">
                <Layers size={18} className="text-amber-600" />
                <div>
                  <div className="text-sm font-semibold">Department Comparison</div>
                  <div className="text-xs text-stone-500">Cross-department metrics</div>
                </div>
              </button>
              <button onClick={() => handleItemClick('Score Distribution')} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-left text-stone-700 hover:text-amber-900 transition-colors cursor-pointer">
                <PieChart size={18} className="text-amber-600" />
                <div>
                  <div className="text-sm font-semibold">Score Distribution</div>
                  <div className="text-xs text-stone-500">Bell curve evaluation analysis</div>
                </div>
              </button>
            </div>
          </div>

          {/* AI Recommendations Dropdown */}
          <div className="relative group py-2">
            <button 
              className="flex items-center gap-1.5 text-stone-700 hover:text-amber-700 font-semibold transition-colors px-3.5 py-2 rounded-lg group-hover:bg-amber-100/50 cursor-pointer"
            >
              <Sparkles size={16} /> AI Recommendations <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-3 space-y-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <button onClick={() => handleItemClick('Promotion Suggestions')} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-left text-stone-700 hover:text-amber-900 transition-colors cursor-pointer">
                <TrendingUp size={18} className="text-rose-500" />
                <div>
                  <div className="text-sm font-semibold">Promotion Suggestions</div>
                  <div className="text-xs text-stone-500">Bias-free career growth planning</div>
                </div>
              </button>
              <button onClick={() => handleItemClick('Improvement Feedback')} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-left text-stone-700 hover:text-amber-900 transition-colors cursor-pointer">
                <Lightbulb size={18} className="text-rose-500" />
                <div>
                  <div className="text-sm font-semibold">Improvement Feedback</div>
                  <div className="text-xs text-stone-500">Constructive feedback models</div>
                </div>
              </button>
              <button onClick={() => handleItemClick('AI Summaries')} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-left text-stone-700 hover:text-amber-900 transition-colors cursor-pointer">
                <BrainCircuit size={18} className="text-rose-500" />
                <div>
                  <div className="text-sm font-semibold">AI Summaries</div>
                  <div className="text-xs text-stone-500">Automated performance reviews</div>
                </div>
              </button>
            </div>
          </div>

          {/* Training Dropdown */}
          <div className="relative group py-2">
            <button 
              className="flex items-center gap-1.5 text-stone-700 hover:text-amber-700 font-semibold transition-colors px-3.5 py-2 rounded-lg group-hover:bg-amber-100/50 cursor-pointer"
            >
              <BookOpen size={16} /> Training <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-3 space-y-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <button onClick={() => handleItemClick('Recommended Courses')} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-left text-stone-700 hover:text-amber-900 transition-colors cursor-pointer">
                <GraduationCap size={18} className="text-emerald-600" />
                <div>
                  <div className="text-sm font-semibold">Recommended Courses</div>
                  <div className="text-xs text-stone-500">AI-curated training materials</div>
                </div>
              </button>
              <button onClick={() => handleItemClick('Skill Gaps')} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-left text-stone-700 hover:text-amber-900 transition-colors cursor-pointer">
                <Target size={18} className="text-emerald-600" />
                <div>
                  <div className="text-sm font-semibold">Skill Gaps</div>
                  <div className="text-xs text-stone-500">Identified upskilling metrics</div>
                </div>
              </button>
            </div>
          </div>

          {/* Reports Dropdown */}
          <div className="relative group py-2">
            <button 
              className="flex items-center gap-1.5 text-stone-700 hover:text-amber-700 font-semibold transition-colors px-3.5 py-2 rounded-lg group-hover:bg-amber-100/50 cursor-pointer"
            >
              <FileText size={16} /> Reports <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-3 space-y-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <button onClick={() => handleItemClick('Export PDF/CSV')} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-left text-stone-700 hover:text-amber-900 transition-colors cursor-pointer">
                <Download size={18} className="text-amber-600" />
                <div>
                  <div className="text-sm font-semibold">Export PDF/CSV</div>
                  <div className="text-xs text-stone-500">Download formatted dataset</div>
                </div>
              </button>
              <button onClick={() => handleItemClick('Monthly Reports')} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-left text-stone-700 hover:text-amber-900 transition-colors cursor-pointer">
                <Calendar size={18} className="text-amber-600" />
                <div>
                  <div className="text-sm font-semibold">Monthly Reports</div>
                  <div className="text-xs text-stone-500">Historical performance digests</div>
                </div>
              </button>
            </div>
          </div>

          {/* Rankings Dropdown */}
          <div className="relative group py-2">
            <button 
              className="flex items-center gap-1.5 text-stone-700 hover:text-amber-700 font-semibold transition-colors px-3.5 py-2 rounded-lg group-hover:bg-amber-100/50 cursor-pointer"
            >
              <Award size={16} /> Rankings <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-xl shadow-xl border border-stone-200 p-3 space-y-1 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
              <button onClick={() => handleItemClick('Top Employees by Score')} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-left text-stone-700 hover:text-amber-900 transition-colors cursor-pointer">
                <Medal size={18} className="text-orange-500" />
                <div>
                  <div className="text-sm font-semibold">Top Employees by Score</div>
                  <div className="text-xs text-stone-500">Leaderboard standings</div>
                </div>
              </button>
              <button onClick={() => handleItemClick('Department Rankings')} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 text-left text-stone-700 hover:text-amber-900 transition-colors cursor-pointer">
                <Layers size={18} className="text-orange-500" />
                <div>
                  <div className="text-sm font-semibold">Department Rankings</div>
                  <div className="text-xs text-stone-500">Group standing comparison</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center space-x-3">
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
