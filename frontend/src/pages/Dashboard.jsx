import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Search, 
  Sparkles, 
  Trash2, 
  BarChart3, 
  BrainCircuit, 
  BookOpen, 
  FileText, 
  Award, 
  UserCheck, 
  TrendingUp, 
  Layers, 
  Download, 
  ShieldAlert, 
  CheckCircle,
  GraduationCap
} from 'lucide-react';
import { API_BASE_URL } from '../config';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);
  const [selectedEmp, setSelectedEmp] = useState(null);

  // Dynamic View Navigation
  const [activeView, setActiveView] = useState('directory'); // 'directory', 'analytics', 'ai', 'training', 'reports', 'rankings'

  const token = localStorage.getItem('token');

  const searchInputRef = useRef(null);

  // Read view from URL search query parameters (e.g. ?view=analytics)
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const viewParam = queryParams.get('view');
    const focusParam = queryParams.get('focus');

    if (viewParam && ['directory', 'analytics', 'ai', 'training', 'reports', 'rankings'].includes(viewParam)) {
      setActiveView(viewParam);
    }

    if (focusParam === 'search' && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
        searchInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [window.location.search]);

  const fetchEmployees = async (searchQuery = '') => {
    try {
      setLoading(true);
      const url = searchQuery 
        ? `${API_BASE_URL}/api/employees/search?department=${searchQuery}`
        : `${API_BASE_URL}/api/employees`;
      
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(search);
  };

  const deleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/employees/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchEmployees(search);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const generateAIRecommendation = async (employee) => {
    setAiLoading(true);
    setSelectedEmp(employee.name);
    setRecommendation(null);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/ai/recommend`, 
        { employeeId: employee._id },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      setRecommendation(res.data.recommendation);
    } catch (err) {
      console.error(err);
      setRecommendation("Failed to generate recommendation. Check backend logs.");
    } finally {
      setAiLoading(false);
    }
  };

  // CSV Exporter Feature
  const handleExportCSV = () => {
    if (employees.length === 0) {
      alert("No data available to export!");
      return;
    }
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Name,Email,Department,Performance Score,Experience (Years),Skills\n";
    
    employees.forEach(emp => {
      const skillsStr = emp.skills ? emp.skills.join(" | ") : "";
      csvContent += `"${emp.name}","${emp.email}","${emp.department}",${emp.performanceScore},${emp.experience},"${skillsStr}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ElevateHR_Employee_Report_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic View Components
  const renderSubView = () => {
    switch (activeView) {
      case 'analytics':
        const avgScore = employees.length > 0 
          ? (employees.reduce((acc, emp) => acc + emp.performanceScore, 0) / employees.length).toFixed(1)
          : 0;
        
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-3 flex items-center gap-2">
              <BarChart3 className="text-amber-600" /> Executive Analytics Panel
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider">Average Performance Score</span>
                <div className="text-4xl font-extrabold text-amber-700">{avgScore}%</div>
                <div className="text-xs text-stone-400">Calculated across {employees.length} active employees</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider">Total Headcount</span>
                <div className="text-4xl font-extrabold text-stone-800">{employees.length} Members</div>
                <div className="text-xs text-stone-400">All registered corporate divisions</div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-2">
                <span className="text-stone-500 text-xs font-semibold uppercase tracking-wider">Company Health Index</span>
                <div className="text-4xl font-extrabold text-emerald-600">A+ Stable</div>
                <div className="text-xs text-stone-400">92% Skill Alignment Coverage</div>
              </div>
            </div>

            {/* Department Comparison Graphs */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-6">
              <h3 className="font-bold text-stone-900 text-base">Department Average Rankings</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm font-semibold text-stone-700 mb-1">
                    <span>Data Science & Engineering</span>
                    <span>94% average</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-3">
                    <div className="bg-amber-600 h-3 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-semibold text-stone-700 mb-1">
                    <span>Cloud Platform & Infra</span>
                    <span>88% average</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-3">
                    <div className="bg-orange-500 h-3 rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-semibold text-stone-700 mb-1">
                    <span>UX / Frontend Systems</span>
                    <span>78% average</span>
                  </div>
                  <div className="w-full bg-stone-100 rounded-full h-3">
                    <div className="bg-rose-500 h-3 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-3 flex items-center gap-2">
              <BrainCircuit className="text-rose-500" /> AI Insights & Promotions
            </h2>
            <div className="bg-[#fffbeb] p-6 rounded-2xl border border-amber-200 space-y-4">
              <div className="flex gap-3">
                <Sparkles className="text-amber-600 shrink-0 mt-1" />
                <div className="space-y-1">
                  <h4 className="font-bold text-amber-900">Predictive Promotion Audits</h4>
                  <p className="text-sm text-amber-800/80 leading-relaxed">
                    Our OpenRouter-powered intelligence analyzes employee performance scores against experience levels. Head over to the Directory and click <span className="font-bold text-rose-700">"AI Analysis"</span> on any employee card to get custom recommendations!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-bold text-stone-900">Automated Promotion Pool</h3>
              {employees.length === 0 ? (
                <p className="text-stone-500 text-sm">No employees available to evaluate.</p>
              ) : (
                <div className="divide-y divide-stone-100">
                  {employees.map(emp => (
                    <div key={emp._id} className="py-3 flex justify-between items-center">
                      <div>
                        <div className="font-bold text-stone-900">{emp.name}</div>
                        <div className="text-xs text-stone-500">{emp.department} • Score: {emp.performanceScore}%</div>
                      </div>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        emp.performanceScore >= 90 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : emp.performanceScore >= 80 
                            ? 'bg-amber-50 text-amber-700 border border-amber-100'
                            : 'bg-stone-50 text-stone-600 border border-stone-200'
                      }`}>
                        {emp.performanceScore >= 90 ? 'High Probability' : emp.performanceScore >= 80 ? 'Promotable (6m)' : 'Training Path Required'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'training':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-3 flex items-center gap-2">
              <BookOpen className="text-emerald-600" /> Skill Gaps & Coursework Suggestions
            </h2>
            
            <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
              <h3 className="font-bold text-stone-900 flex items-center gap-2">
                <GraduationCap className="text-emerald-600" /> Interactive Learning Tracks
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/20 space-y-2">
                  <h4 className="font-bold text-emerald-950">MERN Stack Advanced Patterns</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    Designed for employees targeting frontend upskilling. Includes advanced state management, Tailwind design structures, and node routing controls.
                  </p>
                  <span className="inline-block text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">3 Members Enrolled</span>
                </div>
                <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/20 space-y-2">
                  <h4 className="font-bold text-amber-950">System Architecture & AWS Cloud</h4>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    Targeting infrastructure deficits. Focuses on Docker containerization, AWS compute provisioning, and secure JWT API configurations.
                  </p>
                  <span className="inline-block text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">2 Members Enrolled</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-3 flex items-center gap-2">
              <FileText className="text-amber-600" /> Export System Reports
            </h2>
            <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm text-center space-y-6">
              <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto text-2xl border border-amber-100">
                <Download />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-stone-900">Compile Corporate Performance Ledger</h3>
                <p className="text-sm text-stone-600 max-w-md mx-auto">
                  Export your compiled directory performance metrics directly as a structured CSV spreadsheet format for external audits.
                </p>
              </div>
              <button 
                onClick={handleExportCSV}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-amber-600/10 cursor-pointer"
              >
                Export CSV Dataset
              </button>
            </div>
          </div>
        );

      case 'rankings':
        // Sort employees in descending order of score for a visual leaderboard
        const rankedEmployees = [...employees].sort((a, b) => b.performanceScore - a.performanceScore);

        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-stone-900 border-b border-stone-200 pb-3 flex items-center gap-2">
              <Award className="text-orange-500" /> Enterprise Standing Leaderboard
            </h2>

            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
              {rankedEmployees.length === 0 ? (
                <div className="p-8 text-center text-stone-500">No employees registered yet to rank!</div>
              ) : (
                <div className="divide-y divide-stone-100">
                  {rankedEmployees.map((emp, index) => (
                    <div key={emp._id} className="p-5 flex items-center justify-between hover:bg-stone-50 transition-colors">
                      <div className="flex items-center gap-4">
                        {/* Placement medal indicators */}
                        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold border shrink-0">
                          {index === 0 ? (
                            <span className="text-xl" title="Gold Medal">🥇</span>
                          ) : index === 1 ? (
                            <span className="text-xl" title="Silver Medal">🥈</span>
                          ) : index === 2 ? (
                            <span className="text-xl" title="Bronze Medal">🥉</span>
                          ) : (
                            <span className="text-sm text-stone-500">#{index + 1}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-stone-900">{emp.name}</h4>
                          <p className="text-xs text-stone-500">{emp.role || 'Division Engineer'} • {emp.department}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-extrabold text-amber-700">{emp.performanceScore}%</div>
                        <div className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Score Index</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default: // 'directory'
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: List */}
            <div className="lg:col-span-2 space-y-4">
              {loading ? (
                <div className="text-center py-10 text-stone-500">Loading employees...</div>
              ) : employees.length === 0 ? (
                <div className="text-center py-10 bg-white rounded-xl border border-stone-200 text-stone-500 shadow-sm">No employees found.</div>
              ) : (
                employees.map(emp => (
                  <div key={emp._id} className="bg-white p-5 rounded-xl shadow-sm border border-stone-100 hover:shadow-md hover:border-amber-100 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-stone-800">{emp.name}</h3>
                        <p className="text-sm text-stone-500">{emp.email} • {emp.department}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {emp.skills.map((skill, idx) => (
                            <span key={idx} className="bg-orange-50 text-orange-700 border border-orange-100 text-xs px-2.5 py-1 rounded-full font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <div className="text-sm font-semibold bg-stone-50 px-2 py-1 rounded border border-stone-100">
                          Score: <span className={emp.performanceScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}>{emp.performanceScore}/100</span>
                        </div>
                        <div className="text-xs text-stone-500">{emp.experience} yrs exp</div>
                        <div className="flex gap-2 mt-2">
                          <button 
                            onClick={() => generateAIRecommendation(emp)}
                            className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-100 text-rose-700 px-3 py-1.5 rounded-lg text-sm transition-colors font-medium shadow-sm cursor-pointer"
                            title="AI Recommend"
                          >
                            <Sparkles size={14} className="text-rose-500 animate-pulse" /> AI Analysis
                          </button>
                          <button 
                            onClick={() => deleteEmployee(emp._id)}
                            className="text-stone-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Right Column: AI Output */}
            <div className="lg:col-span-1">
              <div className="bg-[#fffbeb] p-6 rounded-xl shadow-sm border border-amber-200 sticky top-4 min-h-[400px]">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-amber-800 border-b border-amber-200 pb-3">
                  <Sparkles className="text-amber-600" /> 
                  AI Assistant
                </h2>
                
                {aiLoading ? (
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-amber-100 rounded w-3/4"></div>
                    <div className="h-4 bg-amber-100 rounded w-full"></div>
                    <div className="h-4 bg-amber-100 rounded w-5/6"></div>
                    <p className="text-sm text-amber-600 pt-4 text-center font-medium">Analyzing {selectedEmp}'s profile...</p>
                  </div>
                ) : recommendation ? (
                  <div className="prose prose-sm prose-amber">
                    <h4 className="text-sm font-semibold text-amber-700/70 mb-2 uppercase tracking-wider">Analysis for {selectedEmp}</h4>
                    <div className="whitespace-pre-wrap text-sm text-stone-700 leading-relaxed bg-white/60 p-4 rounded-lg border border-amber-100/50">
                      {recommendation}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-amber-700/50 mt-20 text-sm font-medium">
                    Click on "AI Analysis" on any employee card to generate performance insights and recommendations.
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* View Directory Header */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-stone-200">
        <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight flex items-center gap-2 capitalize">
          ElevateHR Console
        </h1>
        
        {/* Dynamic Sidebar Tabs switcher directly inside Dashboard */}
        <div className="flex flex-wrap gap-1 bg-stone-50 border border-stone-200/80 p-1 rounded-xl">
          <button 
            onClick={() => setActiveView('directory')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === 'directory' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-200/55'
            }`}
          >
            Directory
          </button>
          <button 
            onClick={() => setActiveView('analytics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === 'analytics' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-200/55'
            }`}
          >
            Analytics
          </button>
          <button 
            onClick={() => setActiveView('ai')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === 'ai' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-200/55'
            }`}
          >
            AI Suggestions
          </button>
          <button 
            onClick={() => setActiveView('training')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === 'training' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-200/55'
            }`}
          >
            Training
          </button>
          <button 
            onClick={() => setActiveView('reports')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === 'reports' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-200/55'
            }`}
          >
            Reports
          </button>
          <button 
            onClick={() => setActiveView('rankings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeView === 'rankings' ? 'bg-amber-600 text-white shadow-sm' : 'text-stone-600 hover:bg-stone-200/55'
            }`}
          >
            Rankings
          </button>
        </div>

        {activeView === 'directory' && (
          <form onSubmit={handleSearch} className="flex gap-2 shrink-0">
             <input 
              ref={searchInputRef}
              type="text" 
              placeholder="Search by Department..." 
              className="px-4 py-2 border border-stone-200 bg-stone-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 transition-shadow text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit" className="bg-amber-100 p-2.5 rounded-xl hover:bg-amber-200 text-amber-700 transition-colors cursor-pointer">
              <Search size={18} />
            </button>
          </form>
        )}
      </div>

      {/* Renders Selected Feature View Pane */}
      <div className="transition-all duration-300">
        {renderSubView()}
      </div>
    </div>
  );
};

export default Dashboard;
