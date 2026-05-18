import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Award, BookOpen, Star, Send, ArrowRight, Zap, Target } from 'lucide-react';

const Home = () => {
  const token = localStorage.getItem('token');
  const [feedback, setFeedback] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFeedback({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "VP of HR at TechNova",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
      quote: "ElevateHR has completely transformed how we evaluate our engineering team. The AI recommendations for promotions are incredibly insightful and bias-free.",
      rating: 5,
      accent: "from-amber-500 to-orange-500"
    },
    {
      name: "Marcus Chen",
      role: "Chief Talent Officer at Solaria",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      quote: "The skills mapping and automated training suggestions saved our L&D team dozens of hours. A must-have tool for any modern growing organization.",
      rating: 5,
      accent: "from-rose-500 to-pink-500"
    },
    {
      name: "Elena Rostova",
      role: "HR Director at Innovate Ltd",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
      quote: "With ElevateHR's intuitive dashboard and session tracking, our talent analytics has reached a whole new level of efficiency.",
      rating: 5,
      accent: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <div className="space-y-28 pb-20 font-sans relative overflow-hidden bg-[#fafaf9]">
      {/* Custom Styles for Glassmorphic Elements & Float Animations */}
      <style>{`
        @keyframes float-blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float-blob-delayed {
          0%, 100% { transform: translate(0px, 0px) scale(1.1); }
          33% { transform: translate(-30px, 40px) scale(0.9); }
          66% { transform: translate(25px, -20px) scale(1.05); }
        }
        .animate-blob-1 {
          animation: float-blob 12s infinite alternate ease-in-out;
        }
        .animate-blob-2 {
          animation: float-blob-delayed 15s infinite alternate ease-in-out;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(231, 229, 228, 0.5);
        }
        .glow-hover:hover {
          box-shadow: 0 20px 40px -15px rgba(217, 119, 6, 0.15);
        }
      `}</style>

      {/* Decorative Interactive Background Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl filter animate-blob-1 pointer-events-none"></div>
      <div className="absolute top-40 right-10 w-[450px] h-[450px] bg-orange-200/30 rounded-full blur-3xl filter animate-blob-2 pointer-events-none"></div>
      <div className="absolute top-[800px] left-1/3 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl filter animate-blob-1 pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative text-center py-24 px-6 rounded-3xl border border-stone-200/40 overflow-hidden bg-white/50 backdrop-blur-sm shadow-xl shadow-stone-100/50">
        {/* Subtle Tech Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7e5e430_1px,transparent_1px),linear-gradient(to_bottom,#e7e5e430_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200/60 text-amber-900 text-xs px-4 py-2 rounded-full font-bold tracking-wider uppercase shadow-sm">
            <Sparkles size={14} className="text-amber-600 animate-spin" style={{ animationDuration: '3s' }} /> 
            AI-Driven HR Analytics Engine
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-stone-900 leading-tight tracking-tight">
            Supercharge Your Talent with <br />
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-600 bg-clip-text text-transparent drop-shadow-sm font-black">
              Next-Gen AI Insights
            </span>
          </h1>

          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            ElevateHR transforms static employee records into dynamic, visual growth charts, predictive promotion reports, and tailored skill gap learning recommendations.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row justify-center items-center gap-5">
            <Link
              to={token ? "/dashboard" : "/login"}
              className="group relative bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold px-9 py-4 rounded-xl shadow-lg shadow-amber-600/30 transition-all text-center flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              {token ? "Go to Dashboard" : "Get Started Now"}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a
              href="#about"
              className="bg-white/80 hover:bg-stone-50 text-stone-700 font-semibold px-9 py-4 rounded-xl border border-stone-200/80 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm"
            >
              Discover Features
            </a>
          </div>

          {/* Quick Stat Badges inside Hero */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto border-t border-stone-200/60 mt-12">
            <div className="text-center">
              <div className="text-3xl font-black text-amber-700">99.8%</div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mt-1">Accuracy Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-600">10x</div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mt-1">Faster Decisions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-rose-600">Zero</div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mt-1">Evaluation Bias</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-stone-800">100+</div>
              <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mt-1">Teams Empowered</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto px-4 scroll-mt-24 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-stone-100 border border-stone-200 text-stone-700 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
            <Target size={14} className="text-stone-500" /> Executive Ecosystem
          </div>
          <h2 className="text-4xl font-extrabold text-stone-900 tracking-tight">
            How ElevateHR Redefines Success
          </h2>
          <p className="text-stone-600 text-lg leading-relaxed">
            We bridge the gap between static spreadsheet records and generative AI strategies, empowering administrators to cultivate and retain top-tier team members easily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="glass-card glow-hover p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 group hover:border-amber-400 hover:-translate-y-2">
            <div className="w-14 h-14 bg-amber-50 rounded-2xl border border-amber-100 flex items-center justify-center text-amber-600 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500 group-hover:text-white transition-all shadow-sm">
              <Users size={28} />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">Unified Talent Profiles</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Consolidate team skills, history, and real-time scores into highly structured, search-optimized visual directories with secure local storage caches.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-amber-700">
              Explore Profiles <Zap size={12} className="animate-bounce" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card glow-hover p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 group hover:border-rose-400 hover:-translate-y-2">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl border border-rose-100 flex items-center justify-center text-rose-600 group-hover:bg-gradient-to-br group-hover:from-rose-500 group-hover:to-pink-500 group-hover:text-white transition-all shadow-sm">
              <Award size={28} />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 group-hover:text-rose-800 transition-colors">AI-Powered Evaluations</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Leverage secure Generative AI pipelines to deliver unbiased promotion metrics, department rankings, and insightful growth suggestions in seconds.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-rose-700">
              Generate AI Insights <Zap size={12} className="animate-bounce" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-card glow-hover p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 space-y-5 group hover:border-emerald-400 hover:-translate-y-2">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-500 group-hover:text-white transition-all shadow-sm">
              <BookOpen size={28} />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">Personalized L&D Suggestions</h3>
            <p className="text-stone-600 text-sm leading-relaxed">
              Instantly identify core skill deficits and let our integrated OpenRouter model design customized roadmap curricula for individual technical gaps.
            </p>
            <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-700">
              Curate Courses <Zap size={12} className="animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-b from-stone-100 to-stone-200/40 py-20 px-6 rounded-3xl border border-stone-200/50 shadow-inner relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e7e5e4_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-white border border-stone-200 text-stone-600 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
              <Star size={14} className="text-amber-500 fill-amber-500 animate-pulse" /> Certified Love
            </div>
            <h2 className="text-4xl font-extrabold text-stone-900 tracking-tight">Loved by Global People Leaders</h2>
            <p className="text-stone-600 text-lg">
              Hear directly from HR executives and team leads scaling top-performing organizations with our analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="bg-white p-8 rounded-2xl shadow-md border border-stone-150 flex flex-col justify-between space-y-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden"
              >
                {/* Visual Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${t.accent}`} />
                
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="stroke-amber-600" />)}
                  </div>
                  <p className="text-stone-700 text-sm md:text-base italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
                  <img
                    src={t.image}
                    alt={t.name}
                    className={`w-12 h-12 rounded-full object-cover border-2 p-0.5 bg-gradient-to-r ${t.accent}`}
                  />
                  <div>
                    <h4 className="font-bold text-stone-900 text-base">{t.name}</h4>
                    <p className="text-stone-500 text-xs font-semibold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="max-w-4xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-800 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
            <Send size={14} className="text-amber-600" /> Direct Access
          </div>
          <h2 className="text-4xl font-extrabold text-stone-900 tracking-tight">We Value Your Feedback</h2>
          <p className="text-stone-600 text-lg">
            Help us sculpt the future of AI talent analytics. Let us know how we can elevate your ElevateHR experience!
          </p>
        </div>

        <div className="bg-white p-10 rounded-3xl border border-stone-200/80 shadow-xl shadow-stone-100/50 relative overflow-hidden group">
          {/* Subtle warm decoration inside feedback */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-200/20 to-transparent rounded-bl-full pointer-events-none"></div>
          
          {submitted ? (
            <div className="text-center py-16 space-y-5">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-3xl animate-bounce shadow-md">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-stone-900">Your Feedback is In!</h3>
              <p className="text-stone-500 text-base max-w-md mx-auto">
                Thank you so much! Our product developers have logged your suggestions. We appreciate your partnership.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-stone-700 mb-2 text-sm font-semibold">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-stone-200 bg-stone-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-sm shadow-sm"
                    value={feedback.name}
                    onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-stone-700 mb-2 text-sm font-semibold">Work Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-stone-200 bg-stone-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-sm shadow-sm"
                    value={feedback.email}
                    onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-stone-700 mb-2 text-sm font-semibold">Your Insights & Suggestions</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your outstanding ideas, bug reports, or feature requests with our team..."
                  className="w-full px-4 py-3 border border-stone-200 bg-stone-50/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all text-sm shadow-sm"
                  value={feedback.message}
                  onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3.5 rounded-xl shadow-lg shadow-amber-600/20 hover:shadow-xl transition-all font-bold flex items-center justify-center gap-2 text-base hover:scale-[1.01] active:scale-[0.99]"
              >
                <Send size={18} /> Submit Feedback
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
