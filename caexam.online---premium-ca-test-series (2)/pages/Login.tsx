import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { authService } from '../services/storage';
import { User as UserIcon, LogIn, ShieldCheck, ArrowRight, AlertCircle, Lock } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [course, setCourse] = useState<'Foundation' | 'Inter' | 'Final'>('Inter');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let user;
      if (isSignup) {
        const newUser: User = {
          id: '', // Will be set by Firebase
          name,
          email,
          mobile,
          city,
          role,
          enrolledCourse: role === UserRole.STUDENT ? course : undefined,
          joinedAt: new Date().toISOString()
        };
        user = await authService.register(newUser, password);
      } else {
        user = await authService.loginWithPassword(email, password);
        // Check role
        if (role === UserRole.ADMIN && user.role !== UserRole.ADMIN) {
           throw new Error("This account is not an Admin account.");
        }
      }

      if (user) {
        onLoginSuccess(user);
      }
    } catch (err: any) {
      console.error(err);
      let msg = err.message;
      if (msg.includes("auth/invalid-credential")) msg = "Incorrect email or password.";
      if (msg.includes("auth/email-already-in-use")) msg = "Email already registered. Please Login.";
      if (msg.includes("auth/weak-password")) msg = "Password should be at least 6 characters.";
      setError(msg || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-slate-100">
        
        {/* Left Side - Design */}
        <div className="md:w-1/2 bg-brand-dark relative p-12 text-white flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                <ShieldCheck className="text-brand-orange" size={24} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">CAexam.online</span>
            </div>
            
            <h2 className="text-4xl font-display font-bold leading-tight mb-4">
              {isSignup ? "Join the League of Rankers." : "Welcome Back, Future CA."}
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Experience India's most advanced test series platform with live evaluation and AI analytics.
            </p>
          </div>

          <div className="relative z-10 mt-12">
            <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
              <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-dark bg-slate-700"></div>
                ))}
              </div>
              <p>Trusted by 5,000+ Students</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 p-8 md:p-12 bg-white">
          <div className="flex justify-end mb-8">
             <div className="bg-slate-100 p-1 rounded-xl inline-flex">
                <button 
                  onClick={() => setRole(UserRole.STUDENT)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${role === UserRole.STUDENT ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Student
                </button>
                <button 
                  onClick={() => setRole(UserRole.ADMIN)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${role === UserRole.ADMIN ? 'bg-white text-brand-primary shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Admin
                </button>
             </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{isSignup ? 'Create Account' : 'Sign In'}</h3>
            <p className="text-slate-500 text-sm">Enter your details to access your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Mobile No.</label>
                     <input 
                      type="tel" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                      placeholder="98765..."
                      required
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">City</label>
                  <input 
                    type="text" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                    placeholder="e.g. Delhi, Jaipur"
                    required
                  />
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                placeholder="name@example.com"
                required
              />
            </div>

            <div className="space-y-1">
               <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Password</label>
               <div className="relative">
                 <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                  placeholder="******"
                  required
                  minLength={6}
                />
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
               </div>
            </div>

            {isSignup && role === UserRole.STUDENT && (
               <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Course Level</label>
                <select 
                  value={course}
                  onChange={(e: any) => setCourse(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all"
                >
                  <option value="Foundation">CA Foundation</option>
                  <option value="Inter">CA Intermediate</option>
                  <option value="Final">CA Final</option>
                </select>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-xs font-medium bg-red-50 p-3 rounded-lg">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary text-white font-bold py-3 rounded-xl shadow-lg shadow-brand-primary/20 hover:bg-slate-800 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  {isSignup ? 'Create Account' : 'Login to Dashboard'} <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{' '}
              <button 
                onClick={() => setIsSignup(!isSignup)}
                className="text-brand-primary font-bold hover:underline"
              >
                {isSignup ? 'Log in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};