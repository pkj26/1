import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Users, FileText, Award, PlayCircle, BarChart3, ShieldCheck, Download, PenTool, Upload, Trophy, Clock, Zap, Star, Highlighter, Search, Play, Bell, ExternalLink, Calendar, Check, BrainCircuit, MousePointer2, AlertCircle, TrendingUp } from 'lucide-react';

interface HomeProps {
  onNavigate: (path: string) => void;
}

type CourseType = 'foundation' | 'inter' | 'final';
type GroupType = 'single' | 'both';

const PRICING_DATA = {
  foundation: {
    single: { subject: 299, detailed: 2499, mentorship: 4499 }, 
    both: { subject: 299, detailed: 2499, mentorship: 4499 }
  },
  inter: {
    single: { subject: 399, detailed: 3499, mentorship: 5999 },
    both: { subject: 699, detailed: 5999, mentorship: 9999 }
  },
  final: {
    single: { subject: 499, detailed: 3999, mentorship: 6999 },
    both: { subject: 899, detailed: 6999, mentorship: 11999 }
  }
};

const AnimatedPrice = ({ price }: { price: number }) => {
  const [displayPrice, setDisplayPrice] = useState(price);
  
  useEffect(() => {
    let start = displayPrice;
    const end = price;
    if (start === end) return;
    
    const duration = 500;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      
      const current = Math.floor(start + (end - start) * ease);
      setDisplayPrice(current);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [price]);

  return <span>{displayPrice.toLocaleString()}</span>;
};

// Component to simulate live student count fluctuation
const LiveStudentCounter = () => {
  const [count, setCount] = useState(330);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 7) - 3; // Randomly add/subtract between -3 and +3
      setCount(prev => {
        const newCount = prev + change;
        return newCount < 310 ? 310 : newCount; // Minimum floor
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="tabular-nums font-bold transition-all duration-300 inline-block min-w-[2ch] text-center">
      {count}
    </span>
  );
};

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [selectedCourse, setSelectedCourse] = useState<CourseType>('inter');
  const [selectedGroup, setSelectedGroup] = useState<GroupType>('both');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const prices = PRICING_DATA[selectedCourse][selectedGroup];

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      // Reset after 3 seconds
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="home" className="relative pt-6 pb-12 lg:pt-16 lg:pb-24 overflow-visible bg-brand-cream min-h-fit">
        <div className="hidden md:block absolute top-0 right-0 w-[45%] h-full z-0">
          <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=60&w=800&auto=format&fit=crop" alt="CA Student Online Practice" className="w-full h-full object-cover opacity-90" loading="eager" decoding="async" style={{objectPosition: 'center 30%'}} />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/80 to-transparent"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
            <div className="flex-1 text-center md:text-left pt-2 lg:pt-6">
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-dark text-[10px] sm:text-xs font-black uppercase tracking-wider border border-brand-primary/20 shadow-sm animate-fade-up hover:scale-105 transition-transform cursor-default">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Jan 2026 Test Series <span className="text-green-600 font-bold animate-pulse">LIVE</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] sm:text-xs font-black uppercase tracking-wider border border-red-100 shadow-sm animate-fade-up">
                  Only 12 Students/Batch
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-[10px] sm:text-xs font-black uppercase tracking-wider border border-green-200 shadow-sm animate-fade-up">
                  <span className="relative">
                    <Users size={12} />
                    <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-500 rounded-full border border-white animate-pulse"></span>
                  </span>
                  <LiveStudentCounter /> Students Practicing
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-[3.5rem] font-display font-black text-slate-900 leading-[1.1] mb-6 animate-fade-up">
                Crack Your CA Exams <br/>
                <span className="text-2xl md:text-3xl lg:text-[2.5rem] text-slate-600 block mt-2 mb-2 font-bold italic">In First Attempt & Become a</span>
                <span className="relative inline-block px-1">
                  <div className="inline-grid justify-items-center md:justify-items-start">
                    <span className="font-hand text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-primary font-bold overflow-hidden whitespace-nowrap border-r-4 border-brand-orange animate-writing pr-1">
                      Chartered Accountant
                    </span>
                  </div>
                </span>
              </h1>
              <p className="text-xs md:text-sm lg:text-lg text-slate-600 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed font-medium animate-fade-up">
                Expert evaluation by Rankers within 48 hours. <span className="text-brand-primary font-bold">Free AIR Topper's Copy</span> included with every test series.
              </p>
              
              <div className="flex flex-col items-center md:items-start gap-6 mb-10 animate-fade-up">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full">
                  <button onClick={() => onNavigate('/dashboard')} className="group flex items-center gap-3 bg-brand-dark hover:bg-slate-800 text-white rounded-xl px-5 py-3 shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-brand-orange/20 flex items-center justify-center group-hover:bg-brand-orange/30 transition-colors">
                      <Zap size={16} className="text-brand-orange fill-current" />
                    </div>
                    <div className="text-left">
                      <div className="text-[11px] font-black uppercase tracking-wider leading-none">Free Demo Check</div>
                      <div className="text-[9px] font-bold text-slate-400 mt-1">1 Question Free Evaluation</div>
                    </div>
                    <ArrowRight size={14} className="ml-1 text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => onNavigate('/#test-series')} className="group flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-brand-primary/40 text-brand-dark rounded-xl px-5 py-3 shadow-md transition-all hover:-translate-y-0.5 active:scale-95">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                      <FileText size={16} className="text-brand-primary" />
                    </div>
                    <div className="text-left">
                      <div className="text-[11px] font-black uppercase tracking-wider leading-none">View Pricing</div>
                      <div className="text-[9px] font-bold text-slate-400 mt-1">Jan '26 Special Offers</div>
                    </div>
                    <ArrowRight size={14} className="ml-1 text-slate-300 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className="bg-white/95 rounded-[2rem] border border-brand-primary/10 p-5 shadow-2xl w-full max-w-[320px] relative z-20">
                  <div className="flex items-center gap-2 mb-3 pl-1">
                    <PlayCircle size={18} className="text-brand-orange" />
                    <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider">Start Your Prep</h3>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <button onClick={() => onNavigate('/dashboard')} className="px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-tight border-2 transition-all flex-1 bg-slate-50 border-slate-100 text-slate-500 hover:border-brand-primary/20 hover:bg-white hover:text-brand-primary">Foundation</button>
                    <button onClick={() => onNavigate('/dashboard')} className="px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-tight border-2 transition-all flex-1 bg-slate-50 border-slate-100 text-slate-500 hover:border-brand-primary/20 hover:bg-white hover:text-brand-primary">Intermediate</button>
                    <button onClick={() => onNavigate('/dashboard')} className="px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-tight border-2 transition-all flex-1 bg-slate-50 border-slate-100 text-slate-500 hover:border-brand-primary/20 hover:bg-white hover:text-brand-primary">Final</button>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold text-center italic">Pick a level to see courses</p>
                </div>
              </div>
            </div>

            <div className="w-full max-w-[340px] flex flex-col gap-4 mt-4 md:mt-0 z-20 animate-fade-up">
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full -translate-y-12 translate-x-12"></div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display font-black text-slate-800 text-xl">Free Strategy Call</h3>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Talk to AIR 4 Expert</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-brand-orange">
                    <Clock size={22} className="animate-pulse" />
                  </div>
                </div>
                <form className="space-y-4" onSubmit={handleCallbackSubmit}>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
                    <input type="text" placeholder="Rahul Sharma" required className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold focus:ring-2 focus:ring-brand-orange/20 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp Mobile</label>
                    <input type="tel" placeholder="+91 98765 XXXXX" required className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-100 text-sm font-bold focus:ring-2 focus:ring-brand-orange/20 transition-all" />
                  </div>
                  <button 
                    className="inline-flex items-center justify-center font-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl active:scale-95 bg-brand-orange text-white hover:bg-[#E65000] focus:ring-brand-orange shadow-lg shadow-brand-orange/20 hover:shadow-xl text-sm px-8 py-4 w-full uppercase tracking-widest mt-2" 
                    type="submit"
                    disabled={formStatus !== 'idle'}
                  >
                    {formStatus === 'idle' && "Call Me Back"}
                    {formStatus === 'submitting' && "Requesting..."}
                    {formStatus === 'success' && "We'll call soon!"}
                  </button>
                </form>
              </div>
              <div 
                onClick={() => onNavigate('/login')}
                className="bg-brand-dark rounded-[2rem] p-6 text-center cursor-pointer hover:bg-slate-800 transition-all border border-white/10 shadow-2xl relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange to-brand-primary"></div>
                <span className="text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] block mb-2">New Batch Jan '26</span>
                <h4 className="text-white font-hand text-3xl font-bold leading-none mb-4">Join First 50 Batch</h4>
                <button className="inline-flex items-center justify-center font-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl active:scale-95 bg-white text-brand-orange hover:bg-slate-50 shadow-lg text-xs px-6 py-3 w-full uppercase tracking-widest border-none">
                  Book My Spot <ArrowRight size={14} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="relative z-20 -mt-8 mb-12">
        <div className="bg-brand-dark overflow-hidden py-3 border-y border-white/10 shadow-2xl">
          <div className="flex whitespace-nowrap animate-marquee">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={i} className="flex items-center gap-2 mx-8">
                <Award size={14} className="text-brand-orange" />
                <span className="text-white text-[11px] font-black uppercase tracking-widest">AIR {i * 4} - Nov '23</span>
              </div>
            ))}
             {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <div key={`dup-${i}`} className="flex items-center gap-2 mx-8">
                <Award size={14} className="text-brand-orange" />
                <span className="text-white text-[11px] font-black uppercase tracking-widest">AIR {i * 7} - May '24</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section id="benefits" className="py-10 md:py-14 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
            <span className="text-brand-orange font-bold tracking-wider uppercase text-[9px] mb-1 block">The Competitive Edge</span>
            <h2 className="text-xl md:text-3xl font-display font-bold text-slate-900 mb-3">Don't just Study. <span className="text-brand-primary">Practice Smart.</span></h2>
            <p className="text-sm md:text-base text-slate-600 leading-relaxed">Most students fail due to poor presentation and time management. We fix that.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {/* Benefit 1 */}
            <div className="group relative bg-brand-cream rounded-[1.2rem] p-5 border border-brand-secondary/20 hover:shadow-lg transition-all overflow-hidden">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-primary shadow-sm mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <PenTool size={20} />
                </div>
                <h3 className="text-lg font-display font-bold text-slate-800 mb-1.5">Master Presentation</h3>
                <p className="text-[11px] md:text-xs text-slate-600 mb-4 leading-relaxed">Examiners have very little time. We teach you how to present answers to grab marks instantly.</p>
                <div className="bg-white rounded-lg p-2.5 shadow-sm border border-slate-100">
                  <div className="space-y-1">
                    <div className="h-1 w-full bg-slate-100 rounded-full"></div>
                    <div className="h-1 w-[80%] bg-brand-orange/30 rounded-full"></div>
                  </div>
                  <div className="mt-1.5 flex justify-end">
                    <span className="text-[9px] font-hand font-bold text-red-500 rotate-[-10deg]">4/4 Marks</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Benefit 2 */}
            <div className="group relative bg-slate-50 rounded-[1.2rem] p-5 border border-slate-200 hover:shadow-lg transition-all overflow-hidden">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Clock size={20} />
                </div>
                <h3 className="text-lg font-display font-bold text-slate-800 mb-1.5">Attempt 100% Paper</h3>
                <p className="text-[11px] md:text-xs text-slate-600 mb-4 leading-relaxed">Stop leaving marks unattempted. Our tests train your muscle memory to finish on time.</p>
                <div className="bg-white rounded-lg p-2.5 shadow-sm border border-slate-100">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div className="h-full bg-blue-500 w-[85%]"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="group relative bg-brand-cream rounded-[1.2rem] p-5 border border-brand-secondary/20 hover:shadow-lg transition-all overflow-hidden">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-orange shadow-sm mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                  <BrainCircuit size={20} />
                </div>
                <h3 className="text-lg font-display font-bold text-slate-800 mb-1.5">Kill Exam Fear</h3>
                <p className="text-[11px] md:text-xs text-slate-600 mb-4 leading-relaxed">Simulate the exam pressure before the actual day. Walk into the hall with confidence.</p>
                <div className="flex items-center justify-around gap-2 bg-white rounded-lg p-2 shadow-sm">
                  <div className="h-6 w-1 bg-green-500 rounded-full"></div>
                  <div className="h-4 w-1 bg-green-300 rounded-full"></div>
                  <div className="h-8 w-1 bg-green-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 bg-brand-dark rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-3 relative overflow-hidden">
            <div className="relative z-10 flex items-start gap-3">
              <AlertCircle size={18} className="text-brand-orange mt-0.5" />
              <div>
                <h4 className="text-white font-bold text-sm">Did you know?</h4>
                <p className="text-slate-300 text-[10px] md:text-xs max-w-lg">The difference between pass and fail is often just <span className="text-white font-bold underline decoration-brand-orange">writing practice</span>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white relative py-10 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:hidden pb-8 text-center">
            <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900">Why We Are <span className="text-blue-600">#1</span></h2>
            <p className="text-slate-500 text-xs mt-1">The difference between 199 and 200 is our process.</p>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="hidden lg:flex w-1/2 sticky top-0 h-screen flex-col justify-center pr-12">
              <div className="relative">
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-1">Why We Are <span className="text-blue-600">#1</span></h2>
                <p className="text-slate-500 text-sm mb-8">The difference between 199 and 200 is our process.</p>
                <div className="relative h-[300px] w-full">
                  {/* Feature Cards Stack Simulation */}
                  <div className="absolute inset-0 transition-all duration-700 ease-in-out transform opacity-100 translate-y-0 scale-100">
                    <div className="h-full bg-white rounded-2xl p-6 border-2 border-brand-primary/30 shadow-xl flex flex-col justify-center relative overflow-hidden">
                      <div className="w-12 h-12 rounded-xl bg-brand-primary/20 text-brand-dark flex items-center justify-center mb-4">
                        <Clock size={24} />
                      </div>
                      <h3 className="text-xl font-display font-bold text-slate-800 mb-0.5">48-Hour Evaluation</h3>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-3">Speed Meets Quality</div>
                      <p className="text-sm text-slate-600 leading-relaxed">Submit your sheet, and get it checked line-by-line within 48 hours guaranteed.</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 transition-all duration-700 ease-in-out transform opacity-0 translate-y-6 scale-95 pointer-events-none">
                     {/* Hidden cards for animation effect if we had scroll logic */}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute left-3 lg:left-10 top-0 bottom-0 w-0.5 bg-slate-100 rounded-full">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 to-blue-700 transition-all duration-500 ease-out rounded-full" style={{height: '37.5%'}}></div>
              </div>
              <div className="flex flex-col gap-6 lg:gap-0">
                {/* Feature 1 */}
                <div className="flex gap-3 lg:gap-10 items-start lg:items-center transition-all duration-500 min-h-0 lg:min-h-[45vh]">
                  <div className="relative z-10 flex-shrink-0 ml-0.5 lg:ml-7.5 mt-4 lg:mt-0">
                    <div className="w-5 h-5 rounded-full border-[2px] border-white shadow-md transition-all duration-500 bg-blue-600 border-blue-600 scale-110"></div>
                  </div>
                  <div className="py-1 w-full lg:pb-8 lg:pt-2">
                    <div className="lg:hidden bg-white p-3.5 rounded-xl shadow-md border border-slate-100 relative overflow-hidden">
                      <div className="flex items-start gap-3 mb-1.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                          <FileText size={16} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-tight">ICAI Pattern Replication</h3>
                          <p className="text-[8px] font-bold text-blue-600 uppercase tracking-wide mt-0.5">Exact Exam Simulation</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">We replicate the ICAI font, spacing, and paper texture. Difficulty matches latest trends.</p>
                    </div>
                    <div className="hidden lg:block">
                      <span className="text-4xl font-display font-bold block mb-0.5 transition-colors duration-500 text-slate-500">01</span>
                      <h3 className="text-xl font-bold transition-colors duration-500 text-slate-500">ICAI Pattern Replication</h3>
                      <p className="mt-0.5 max-w-sm text-xs font-medium transition-colors duration-500 text-slate-400">Exact Exam Simulation</p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-3 lg:gap-10 items-start lg:items-center transition-all duration-500 min-h-0 lg:min-h-[45vh]">
                  <div className="relative z-10 flex-shrink-0 ml-0.5 lg:ml-7.5 mt-4 lg:mt-0">
                    <div className="w-5 h-5 rounded-full border-[2px] border-white shadow-md transition-all duration-500 bg-blue-600 border-blue-600 scale-110"></div>
                  </div>
                  <div className="py-1 w-full lg:pb-8 lg:pt-2">
                    <div className="lg:hidden bg-white p-3.5 rounded-xl shadow-md border border-slate-100 relative overflow-hidden">
                      <div className="flex items-start gap-3 mb-1.5">
                        <div className="w-8 h-8 rounded-lg bg-brand-primary/20 text-brand-dark flex items-center justify-center flex-shrink-0">
                          <Clock size={16} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-tight">48-Hour Evaluation</h3>
                          <p className="text-[8px] font-bold text-blue-600 uppercase tracking-wide mt-0.5">Speed Meets Quality</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">Submit your sheet, and get it checked line-by-line within 48 hours guaranteed.</p>
                    </div>
                    <div className="hidden lg:block">
                      <span className="text-4xl font-display font-bold block mb-0.5 transition-colors duration-500 text-blue-600">02</span>
                      <h3 className="text-xl font-bold transition-colors duration-500 text-slate-900">48-Hour Evaluation</h3>
                      <p className="mt-0.5 max-w-sm text-xs font-medium transition-colors duration-500 text-blue-600">Speed Meets Quality</p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-3 lg:gap-10 items-start lg:items-center transition-all duration-500 min-h-0 lg:min-h-[45vh]">
                   <div className="relative z-10 flex-shrink-0 ml-0.5 lg:ml-7.5 mt-4 lg:mt-0">
                    <div className="w-5 h-5 rounded-full border-[2px] border-white shadow-md transition-all duration-500 bg-white border-slate-300"></div>
                  </div>
                  <div className="py-1 w-full lg:pb-8 lg:pt-2">
                    <div className="lg:hidden bg-white p-3.5 rounded-xl shadow-md border border-slate-100 relative overflow-hidden">
                      <div className="flex items-start gap-3 mb-1.5">
                        <div className="w-8 h-8 rounded-lg bg-brand-orange/20 text-brand-orange flex items-center justify-center flex-shrink-0">
                          <TrendingUp size={16} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-tight">Micro-Analysis Report</h3>
                          <p className="text-[8px] font-bold text-blue-600 uppercase tracking-wide mt-0.5">Data-Driven Growth</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">Dashboard tells you which chapter is weak and topper comparisons.</p>
                    </div>
                    <div className="hidden lg:block">
                      <span className="text-4xl font-display font-bold block mb-0.5 transition-colors duration-500 text-slate-500">03</span>
                      <h3 className="text-xl font-bold transition-colors duration-500 text-slate-500">Micro-Analysis Report</h3>
                      <p className="mt-0.5 max-w-sm text-xs font-medium transition-colors duration-500 text-slate-400">Data-Driven Growth</p>
                    </div>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex gap-3 lg:gap-10 items-start lg:items-center transition-all duration-500 min-h-0 lg:min-h-[45vh]">
                   <div className="relative z-10 flex-shrink-0 ml-0.5 lg:ml-7.5 mt-4 lg:mt-0">
                    <div className="w-5 h-5 rounded-full border-[2px] border-white shadow-md transition-all duration-500 bg-white border-slate-300"></div>
                  </div>
                  <div className="py-1 w-full lg:pb-8 lg:pt-2">
                    <div className="lg:hidden bg-white p-3.5 rounded-xl shadow-md border border-slate-100 relative overflow-hidden">
                      <div className="flex items-start gap-3 mb-1.5">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                          <Users size={16} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900 leading-tight">Ranker Mentorship</h3>
                          <p className="text-[8px] font-bold text-blue-600 uppercase tracking-wide mt-0.5">Learn from the Best</p>
                        </div>
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">Get on a 1-on-1 call with a Rank holder to review your paper live.</p>
                    </div>
                    <div className="hidden lg:block">
                      <span className="text-4xl font-display font-bold block mb-0.5 transition-colors duration-500 text-slate-500">04</span>
                      <h3 className="text-xl font-bold transition-colors duration-500 text-slate-500">Ranker Mentorship</h3>
                      <p className="mt-0.5 max-w-sm text-xs font-medium transition-colors duration-500 text-slate-400">Learn from the Best</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-brand-orange font-black uppercase tracking-[0.2em] text-[10px] mb-2 block">Our Workflow</span>
            <h2 className="text-3xl md:text-5xl font-display font-black">How Your <span className="text-brand-primary">Marks Improve</span></h2>
            <p className="text-slate-400 text-sm mt-4 max-w-xl mx-auto">A seamless 4-step process designed by Rankers to identify your weak points before the actual ICAI exam.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative group">
              <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-white/20 to-transparent z-0">
                <div className="absolute right-0 -top-1">
                   <ArrowRight size={12} className="text-white/20" />
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all duration-300 relative z-10 h-full group-hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <Download size={24} />
                </div>
                <div className="absolute top-8 right-8 text-4xl font-black text-white/5 italic">01</div>
                <h3 className="text-xl font-bold mb-3">Download Paper</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">Get your ICAI-pattern question paper instantly after enrollment.</p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <MousePointer2 size={12} />
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div className="relative group">
              <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-white/20 to-transparent z-0">
                <div className="absolute right-0 -top-1">
                   <ArrowRight size={12} className="text-white/20" />
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all duration-300 relative z-10 h-full group-hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-brand-orange flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <PenTool size={24} />
                </div>
                <div className="absolute top-8 right-8 text-4xl font-black text-white/5 italic">02</div>
                <h3 className="text-xl font-bold mb-3">Write Answers</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">Solve on physical A4 sheets within the time limit for real exam feel.</p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <MousePointer2 size={12} />
                </div>
              </div>
            </div>
            {/* Step 3 */}
            <div className="relative group">
              <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-white/20 to-transparent z-0">
                <div className="absolute right-0 -top-1">
                   <ArrowRight size={12} className="text-white/20" />
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all duration-300 relative z-10 h-full group-hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-brand-primary flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <Upload size={24} />
                </div>
                <div className="absolute top-8 right-8 text-4xl font-black text-white/5 italic">03</div>
                <h3 className="text-xl font-bold mb-3">Scan & Upload</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">Use any mobile scanner to upload your answer sheet on our portal.</p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <MousePointer2 size={12} />
                </div>
              </div>
            </div>
            {/* Step 4 */}
            <div className="relative group">
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all duration-300 relative z-10 h-full group-hover:-translate-y-2">
                <div className="w-16 h-16 rounded-2xl bg-purple-600 flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <Trophy size={24} />
                </div>
                <div className="absolute top-8 right-8 text-4xl font-black text-white/5 italic">04</div>
                <h3 className="text-xl font-bold mb-3">Ranker Feedback</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">Get checked sheet with AIR Ranker's tips within 48 hours.</p>
                <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <MousePointer2 size={12} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-full">
              <Award size={18} className="text-brand-orange" />
              <span className="text-sm font-bold text-slate-300 italic">"The process that helped 500+ students score 60+ in Audit & FR."</span>
            </div>
          </div>
        </div>
      </section>

      {/* Test Series Section (Pricing) */}
      <section id="test-series" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <Zap size={14} className="fill-current" /> Special Jan '26 Offers
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mb-4">Select Your <span className="text-brand-primary">Test Series</span></h2>
            <p className="text-slate-500 text-sm max-w-lg mb-10">Expert checking with <span className="text-brand-orange font-bold">AIR Ranker Comparison</span> included in all plans.</p>
            
            <div className="bg-white p-2 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col md:flex-row gap-2 items-center transform transition-all hover:scale-[1.02]">
              <div className="flex bg-slate-100 rounded-2xl p-1.5 w-full md:w-auto relative">
                {['foundation', 'inter', 'final'].map((course) => (
                  <button 
                    key={course}
                    onClick={() => setSelectedCourse(course as CourseType)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex-1 md:flex-none relative z-10 ${selectedCourse === course ? 'text-brand-dark shadow-md bg-white' : 'text-slate-500 hover:text-brand-primary'}`}
                  >
                    {course}
                  </button>
                ))}
              </div>
              <div className="flex bg-slate-100 rounded-2xl p-1.5 w-full md:w-auto">
                <button 
                  onClick={() => setSelectedGroup('single')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex-1 md:flex-none ${selectedGroup === 'single' ? 'bg-brand-dark text-white shadow-md' : 'text-slate-500 hover:text-brand-primary'}`}
                >
                  1 Group
                </button>
                <button 
                  onClick={() => setSelectedGroup('both')}
                  className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex-1 md:flex-none ${selectedGroup === 'both' ? 'bg-brand-dark text-white shadow-md' : 'text-slate-500 hover:text-brand-primary'}`}
                >
                  Both Grps
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {/* Plan 1: Standard */}
            <div className="flex flex-col bg-white rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group relative">
              <div className="p-8 pb-0">
                <div className="w-14 h-14 rounded-2xl bg-brand-primary/5 flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                  <FileText size={28} />
                </div>
                <h3 className="text-xl font-display font-black text-slate-900 mb-2">Subject Wise</h3>
                <p className="text-xs text-slate-500 font-medium mb-6">Perfect for single subject weakness.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    ₹<AnimatedPrice price={prices.subject} />
                  </span>
                  <span className="text-slate-400 font-bold text-xs uppercase">/ sub</span>
                </div>
              </div>
              <div className="w-full h-px bg-slate-100 mx-auto w-[85%]"></div>
              <div className="p-8 pt-6 flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    '1 Full Syllabus Test', 
                    '3 Chapter-wise Tests', 
                    'Evaluation in 48-72h', 
                    'Suggested Answers'
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-bold text-slate-600">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span className="opacity-80 group-hover:opacity-100 transition-opacity">{feat}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => onNavigate('/login')}
                  className="w-full py-4 rounded-xl border-2 border-brand-primary text-brand-primary font-black text-sm uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  Enroll Now
                </button>
              </div>
            </div>

            {/* Plan 2: Recommended (Detailed) */}
            <div className="flex flex-col bg-brand-dark rounded-[2rem] shadow-2xl border border-brand-orange/30 overflow-hidden transform md:-translate-y-4 md:scale-105 relative z-10">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-orange via-red-500 to-brand-orange"></div>
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-[10px] font-black text-brand-orange uppercase tracking-wider flex items-center gap-1.5">
                <Star size={10} fill="#FFA239" /> Recommended
              </div>
              
              <div className="p-8 pb-0">
                <div className="w-14 h-14 rounded-2xl bg-brand-orange flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-orange/20">
                  <Award size={28} />
                </div>
                <h3 className="text-xl font-display font-black text-white mb-2">Detailed Prep</h3>
                <p className="text-xs text-slate-400 font-medium mb-6">Most popular choice for rankers.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-5xl font-black text-white tracking-tighter">
                    ₹<AnimatedPrice price={prices.detailed} />
                  </span>
                  <span className="text-slate-500 font-bold text-xs uppercase">/ pkg</span>
                </div>
              </div>
              <div className="w-full h-px bg-white/10 mx-auto w-[85%]"></div>
              <div className="p-8 pt-6 flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    'All Chapter Tests', 
                    '5 Full Mocks', 
                    'Keyword Highlighting', 
                    'Ranker Comparison', 
                    'IndAS Special Charts'
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-bold text-slate-300">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-brand-orange flex items-center justify-center text-brand-dark shrink-0">
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => onNavigate('/login')}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 text-white font-black text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-brand-orange/25 transition-all duration-300 flex items-center justify-center gap-2 transform active:scale-95"
                >
                  Enroll Now <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Plan 3: Mentorship */}
            <div className="flex flex-col bg-white rounded-[2rem] shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group relative">
              <div className="p-8 pb-0">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                  <Trophy size={28} />
                </div>
                <h3 className="text-xl font-display font-black text-slate-900 mb-2">Mentorship Pro</h3>
                <p className="text-xs text-slate-500 font-medium mb-6">Personal guidance from AIRs.</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-slate-900 tracking-tighter">
                    ₹<AnimatedPrice price={prices.mentorship} />
                  </span>
                  <span className="text-slate-400 font-bold text-xs uppercase">/ pkg</span>
                </div>
              </div>
              <div className="w-full h-px bg-slate-100 mx-auto w-[85%]"></div>
              <div className="p-8 pt-6 flex flex-col flex-grow">
                <ul className="space-y-4 mb-8 flex-grow">
                  {[
                    'Includes Detailed Prep', 
                    '1-on-1 Ranker Call', 
                    'Study Plan by AIR 4', 
                    'WhatsApp Priority'
                  ].map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-bold text-slate-600">
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span className="opacity-80 group-hover:opacity-100 transition-opacity">{feat}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => onNavigate('/login')}
                  className="w-full py-4 rounded-xl border-2 border-purple-600 text-purple-600 font-black text-sm uppercase tracking-widest hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Copy Checker Section */}
      <section id="copy-checker" className="py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-cream/50 skew-x-12 translate-x-20 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <span className="inline-block py-1 px-3 rounded-full bg-brand-orange/10 text-brand-orange font-bold tracking-wider uppercase text-[10px] mb-4 border border-brand-orange/20">Detailed Evaluation</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">We Don't Just Check. <br/><span className="text-brand-primary">We Correct.</span></h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">ICAI reduces marks for generic answers. Our examiners identify exactly where you missed technical keywords, section numbers, or presentation logic.</p>
              
              <div className="space-y-6 mb-10">
                <div className="flex gap-4 group">
                  <div className="mt-1 w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-brand-dark group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Highlighter size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg group-hover:text-brand-primary transition-colors">Keyword Highlight</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mt-1">We underline missing ICAI keywords in your answer so you know exactly what to write next time.</p>
                  </div>
                </div>
                <div className="flex gap-4 group">
                  <div className="mt-1 w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-brand-dark group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Search size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg group-hover:text-brand-orange transition-colors">Step-wise Marking</h4>
                    <p className="text-slate-500 text-sm leading-relaxed mt-1">Full marks distribution per step (Working Notes + Final Answer) as per the latest suggested answers.</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onNavigate('/dashboard')}
                  className="inline-flex items-center justify-center font-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl active:scale-95 bg-brand-orange text-white hover:bg-[#E65000] focus:ring-brand-orange shadow-lg shadow-brand-orange/20 hover:shadow-xl text-sm px-6 py-3 font-bold"
                >
                  Submit a Sample Sheet
                </button>
                <button 
                  onClick={() => onNavigate('/dashboard')}
                  className="inline-flex items-center justify-center font-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl active:scale-95 border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white focus:ring-brand-primary text-sm px-6 py-3"
                >
                  View Topper's Copy <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>

            {/* Visual Checker Demo */}
            <div className="w-full lg:w-1/2 relative perspective-1000">
              <div className="bg-white rounded-sm shadow-2xl border border-slate-200 p-6 md:p-10 relative transform rotate-1 transition-transform duration-500 hover:rotate-0 hover:scale-[1.01] max-w-md mx-auto lg:mx-0">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_23px,#000_24px)] [background-size:100%_24px]"></div>
                <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4 mb-6 relative">
                  <div>
                    <div className="font-serif font-bold text-xl text-slate-900">Q.3 (b) GST Input Tax Credit</div>
                    <div className="text-xs text-slate-500 font-medium mt-1">Max Marks: 5</div>
                  </div>
                  <div className="text-red-600 font-hand font-black text-4xl -rotate-12 border-4 border-red-600 rounded-full w-20 h-20 flex items-center justify-center bg-white shadow-sm z-10">3.5</div>
                </div>
                <div className="font-hand text-xl md:text-2xl text-slate-700 space-y-6 leading-loose relative">
                  <div className="relative">
                    <p>As per Section 16 of CGST Act, registered person is entitled to take credit of input tax charged on any supply...</p>
                    <CheckCircle size={24} className="absolute -left-8 top-2 text-green-500 opacity-80" />
                  </div>
                  <div className="relative">
                    <p>The payment must be made within <span className="relative inline-block px-1">120 days<span className="absolute top-1/2 left-0 w-full h-1 bg-red-500/60 rounded-full -rotate-3"></span></span> from the date of invoice.</p>
                    <div className="absolute left-10 -bottom-8 bg-red-50 border border-red-200 text-red-700 text-xs font-sans px-3 py-1.5 rounded-lg shadow-sm rotate-[-1deg] z-20">
                      <span className="font-bold block text-[10px] uppercase tracking-wider">Correction</span>It is 180 days, not 120!
                    </div>
                    <FileText size={24} className="absolute -left-8 top-2 text-red-500 opacity-80" />
                  </div>
                  <div className="relative pt-6 opacity-60">
                    <p>Condition regarding receipt of goods must be satisfied...</p>
                  </div>
                </div>
                <div className="absolute bottom-8 right-8 rotate-[-15deg] border-2 border-brand-primary text-brand-primary px-4 py-2 rounded-lg font-stamp text-lg opacity-80 uppercase tracking-widest bg-white/80 backdrop-blur-sm">Good Attempt</div>
              </div>
              <div className="hidden md:flex absolute top-1/2 -right-6 lg:-right-12 bg-slate-900 text-white p-4 rounded-xl shadow-2xl items-center gap-3 animate-wiggle-slow z-20">
                <div className="bg-brand-orange p-2 rounded-lg text-white">
                   <AlertCircle size={20} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Mistakes Found</div>
                  <div className="text-lg font-bold">12 Errors</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hall of Fame */}
      <section className="py-16 bg-brand-cream overflow-hidden">
        <div className="text-center mb-10 px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-2">Hall of <span className="text-brand-primary">Fame</span></h2>
          <p className="text-slate-500 text-sm md:text-base">See what happens when you practice right. Real results.</p>
        </div>
        <div className="flex overflow-hidden relative w-full mb-6">
          <div className="flex animate-marquee hover:[animation-play-state:paused]">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0 w-72 md:w-80 p-5 mx-3 bg-white rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-dark font-bold text-sm border border-brand-primary/20">S</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Student {i}</h4>
                    <span className="text-xs text-slate-500 font-medium block">CA Final</span>
                  </div>
                  <div className="ml-auto flex text-yellow-400">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs text-slate-600 font-bold ml-1">5.0</span>
                  </div>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed mb-2 line-clamp-3">"Scored Exemption in Audit! The 48hr feedback is a game changer."</p>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-red-600/40 text-red-600/40 font-stamp text-2xl font-black uppercase tracking-widest px-4 py-2 rounded-lg z-10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity">Exemption!</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates */}
      <section className="py-12 md:py-16 bg-white border-y border-slate-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            <div className="space-y-6 flex flex-col">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-100">
                  <Play size={24} fill="currentColor" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-800">Strategy of the Week</h3>
                  <p className="text-slate-500 text-sm">Expert tips to boost your preparation.</p>
                </div>
              </div>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group cursor-pointer flex-grow">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] rounded-2xl"></div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm mb-1">In this video:</h4>
                <p className="text-slate-500 text-xs">AIR 1 shares his secret to scoring 80+ in Audit using keyword techniques and proper presentation standards.</p>
              </div>
            </div>
            
            <div className="flex flex-col h-full min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-lg animate-pulse">
                    <Bell size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-display font-bold text-slate-800">Latest Updates</h3>
                    <p className="text-slate-500 text-sm">Official announcements & news.</p>
                  </div>
                </div>
                <button className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-1">
                  View All <ExternalLink size={14} />
                </button>
              </div>
              <div className="bg-brand-cream/30 rounded-2xl p-6 border border-brand-secondary/20 flex-grow relative overflow-hidden shadow-inner">
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#FCF9EA] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#FCF9EA] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-6 left-6 right-6 animate-marquee-vertical hover:[animation-play-state:paused]">
                  <div className="space-y-4 pb-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4 items-start hover:border-brand-primary/50 hover:shadow-md transition-all group cursor-pointer">
                        <div className="flex-shrink-0 flex flex-col items-center justify-center bg-slate-50 rounded-lg p-2 w-14 border border-slate-200 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-colors">
                          <span className="text-[10px] text-slate-400 font-bold uppercase group-hover:text-brand-primary">Oct</span>
                          <span className="text-lg font-bold text-slate-800 leading-none group-hover:text-brand-dark">{20 + i}</span>
                        </div>
                        <div>
                          <p className="text-slate-700 text-sm font-medium leading-relaxed group-hover:text-brand-primary transition-colors line-clamp-2">ICAI Exam Dates for Nov 2024 Announced. Check Schedule and download PDF.</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};