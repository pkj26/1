import React, { useState, useEffect } from 'react';
import { Menu, X, BookOpen, User, LogOut } from 'lucide-react';
import { NAV_LINKS, APP_NAME } from '../constants';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: any;
  onLogout: () => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, onNavigate, currentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Determine if we are in "App Mode" (Dashboard or Admin)
  const isAppPage = currentPath === '/dashboard' || currentPath === '/admin';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-dark bg-slate-50">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isAppPage ? 'bg-brand-cream/95 backdrop-blur-sm shadow-sm border-b border-brand-secondary/20 py-2' : 'bg-brand-cream/95 border-b border-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between lg:justify-start">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer group flex-shrink-0" 
              onClick={() => onNavigate(isAppPage ? currentPath : '/')}
            >
              <div className="w-9 h-9 relative transition-transform duration-300 group-hover:scale-105">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                  <rect x="10" y="10" width="80" height="80" rx="20" fill="#002B5B"></rect>
                  <path d="M35 30H65C67.7614 30 70 32.2386 70 35V70C70 72.7614 67.7614 75 65 75H35C32.2386 75 30 72.7614 30 70V35C30 32.2386 32.2386 30 35 30Z" fill="#FFFFFF" opacity="0.9"></path>
                  <path d="M40 52L48 60L65 40" stroke="#FFA239" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <span className="text-2xl font-display font-bold tracking-tight text-slate-800 flex items-baseline">
                ca<span className="text-brand-primary">exam</span><span className="text-brand-orange font-hand text-3xl ml-0.5 transform -rotate-2 origin-bottom-left">.online</span>
              </span>
            </div>

            {/* Desktop Nav - ONLY SHOW ON WEBSITE PAGES, HIDE ON DASHBOARD/ADMIN */}
            {!isAppPage && (
              <nav className="hidden lg:flex items-center gap-8 ml-16">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => onNavigate(link.path)}
                    className="text-[17px] font-bold tracking-tight transition-all duration-200 font-sans whitespace-nowrap relative py-1 text-slate-600 hover:text-brand-primary group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-full h-[3px] rounded-full bg-brand-orange transform transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100"></span>
                  </button>
                ))}
              </nav>
            )}

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-6 ml-auto">
              {user ? (
                <div className="flex items-center gap-4">
                  {/* Show "Go to Dashboard" button only if we are NOT on the dashboard/admin page */}
                  {!isAppPage && (
                    <button 
                      onClick={() => onNavigate(user.role === UserRole.ADMIN ? '/admin' : '/dashboard')}
                      className="text-sm font-bold text-slate-600 hover:text-brand-primary"
                    >
                      Go to Dashboard
                    </button>
                  )}
                   <button 
                    className="flex items-center space-x-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-xl font-bold hover:bg-brand-primary/20 transition-colors"
                  >
                    <User size={18} />
                    <span>{user.name}</span>
                  </button>
                  <button 
                    onClick={onLogout}
                    className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-slate-100"
                    title="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => onNavigate('/login')}
                    className="text-[15px] font-bold text-slate-600 hover:text-brand-primary cursor-pointer font-sans transition-colors"
                  >
                    Log in
                  </button>
                  <button 
                    onClick={() => onNavigate('/login')}
                    className="inline-flex items-center justify-center font-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl active:scale-95 bg-brand-orange text-white hover:bg-[#E65000] focus:ring-brand-orange shadow-lg shadow-brand-orange/20 hover:shadow-xl text-sm px-6 py-2.5 uppercase tracking-wide"
                  >
                    Get Started 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><path d="m9 18 6-6-6-6"></path></svg>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button - Hide on App Pages if desired, or keep generic */}
            {!isAppPage && (
              <button 
                className="lg:hidden p-2 text-slate-600 hover:text-brand-primary transition-colors focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            )}
            
            {/* Mobile Controls for App Pages */}
            {isAppPage && (
              <div className="lg:hidden ml-auto flex items-center gap-3">
                 <button className="p-2 bg-brand-primary/10 text-brand-primary rounded-lg">
                   <User size={20} />
                 </button>
                 <button onClick={onLogout} className="p-2 text-slate-400">
                   <LogOut size={20} />
                 </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu - Only for Website */}
        {isMenuOpen && !isAppPage && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-brand-cream border-b border-brand-secondary/20 shadow-xl transition-all duration-300 ease-in-out origin-top animate-fade-in">
            <div className="p-6 space-y-3">
               {NAV_LINKS.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    onNavigate(link.path);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-lg font-bold px-4 py-3 rounded-2xl transition-colors font-sans text-slate-600 hover:text-brand-primary hover:bg-white"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-6 border-t border-brand-secondary/20 flex flex-col gap-3">
                {user ? (
                   <button 
                    onClick={() => {
                      onNavigate(user.role === UserRole.ADMIN ? '/admin' : '/dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="inline-flex items-center justify-center font-black rounded-xl border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white px-6 py-3 w-full"
                  >
                    Dashboard
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        onNavigate('/login');
                        setIsMenuOpen(false);
                      }}
                      className="inline-flex items-center justify-center font-black transition-all rounded-xl border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white px-6 py-3 w-full"
                    >
                      Log in
                    </button>
                    <button 
                      onClick={() => {
                        onNavigate('/login');
                        setIsMenuOpen(false);
                      }}
                      className="inline-flex items-center justify-center font-black transition-all rounded-xl bg-brand-orange text-white hover:bg-[#E65000] shadow-lg shadow-brand-orange/20 px-6 py-3 w-full"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 lg:pt-24">
        {children}
      </main>

      {/* Footer - HIDE ON APP PAGES */}
      {!isAppPage && (
        <footer className="bg-brand-dark text-white pt-10 pb-6 border-t border-brand-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-8 h-8 relative transition-transform duration-300 group-hover:scale-105">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                      <rect x="10" y="10" width="80" height="80" rx="20" fill="rgba(255,255,255,0.1)" stroke="#FFA239" strokeWidth="2"></rect>
                      <path d="M40 52L48 60L65 40" stroke="#FFA239" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <span className="text-xl font-display font-bold text-white">
                    ca<span className="text-brand-primary">exam</span><span className="text-brand-orange font-hand text-2xl ml-0.5">.online</span>
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">India's most trusted platform for CA Test Series.</p>
              </div>
              <div>
                <h4 className="text-base font-display font-bold mb-4 text-white">Quick Links</h4>
                <ul className="space-y-2 text-xs">
                  <li><button className="text-slate-400 hover:text-brand-orange transition-colors">Home</button></li>
                  <li><button className="text-slate-400 hover:text-brand-orange transition-colors">Plans</button></li>
                  <li><button className="text-slate-400 hover:text-brand-orange transition-colors">Benefits</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-base font-display font-bold mb-4 text-white">Our Courses</h4>
                <ul className="space-y-2 text-xs">
                  <li><button className="text-slate-400 hover:text-brand-orange transition-colors">Foundation</button></li>
                  <li><button className="text-slate-400 hover:text-brand-orange transition-colors">Intermediate</button></li>
                  <li><button className="text-slate-400 hover:text-brand-orange transition-colors">Final</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-base font-display font-bold mb-4 text-white">Stay Updated</h4>
                <div className="flex gap-1 mb-4">
                  <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-brand-orange w-full" />
                  <button className="bg-brand-orange p-1.5 rounded-lg text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </button>
                </div>
                <div className="space-y-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-brand-primary font-bold">+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-2">
                    support@caexam.online
                  </div>
                </div>
              </div>
            </div>
            <div className="h-px bg-white/10 my-6"></div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-slate-500 text-center">
              <p>© {new Date().getFullYear()} CA Exam Online. All rights reserved.</p>
              <div className="flex gap-4">
                <button>Privacy</button>
                <button>Terms</button>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};