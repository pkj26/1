import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';
import { GeminiTutor } from './components/GeminiTutor';
import { User, UserRole } from './types';
import { initStorage, authService } from './services/storage';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [user, setUser] = useState<User | null>(null);
  const [isStorageReady, setIsStorageReady] = useState(false);

  // Initialize Firebase and Listen for Auth Changes
  useEffect(() => {
    initStorage();
    
    const unsubscribe = authService.onAuthStateChanged((firebaseUser) => {
        setUser(firebaseUser);
        setIsStorageReady(true);
    });

    return () => {
        if(unsubscribe) unsubscribe();
    };
  }, []);

  const handleNavigate = (path: string) => {
    if (path.startsWith('/#')) {
      const targetId = path.substring(2);
      if (currentPath !== '/') {
        setCurrentPath('/');
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      return;
    }

    window.scrollTo(0, 0);
    setCurrentPath(path);
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    // Auth state listener will handle setUser
    setCurrentPath(loggedInUser.role === UserRole.ADMIN ? '/admin' : '/dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentPath('/');
  };

  const renderContent = () => {
    if (!isStorageReady) return <div className="h-screen flex items-center justify-center bg-slate-50"><div className="animate-spin rounded-full h-12 w-12 border-b-4 border-brand-orange"></div></div>;

    switch (currentPath) {
      case '/':
        return <Home onNavigate={handleNavigate} />;
      case '/login':
        return <Login onLoginSuccess={handleLoginSuccess} />;
      case '/dashboard':
        return user ? <Dashboard /> : <Login onLoginSuccess={handleLoginSuccess} />;
      case '/admin':
        return user?.role === UserRole.ADMIN ? <Admin /> : <Home onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout user={user} onLogout={handleLogout} onNavigate={handleNavigate} currentPath={currentPath}>
      {renderContent()}
      <GeminiTutor />
    </Layout>
  );
};

export default App;