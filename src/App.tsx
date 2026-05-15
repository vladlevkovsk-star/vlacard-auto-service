import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import ServicesDetail from './components/ServicesDetail';
import Contacts from './components/Contacts';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import MechanicDashboard from './components/MechanicDashboard';
import { User } from './types';
import { CheckCircle, AlertTriangle, Info, X } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number, title: string, msg: string, type: string }[]>([]);

  useEffect(() => {
    // Check if we are on a dashboard and logged out
    const dashPages = ['admin-dashboard', 'customer-dashboard', 'mechanic-dashboard'];
    if (dashPages.includes(currentPage) && !user) {
      setCurrentPage('home');
    }
  }, [currentPage, user]);

  const addToast = (title: string, msg: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, msg, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    addToast('Успішний вхід', `Вітаємо, ${newUser.name}!`, 'success');
    setCurrentPage(newUser.role + '-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
    addToast('Вихід', 'Ви успішно вийшли з системи', 'info');
  };

  const handleBookingSubmit = async (data: any) => {
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        addToast('Заявку прийнято', 'Ми передзвонимо вам найближчим часом', 'success');
        // Also send a system message to admin if we were real, but admin dashboard polls anyway.
      } else {
        throw new Error();
      }
    } catch (e) {
      addToast('Помилка', 'Не вдалося надіслати заявку. Спробуйте ще раз.', 'error');
    }
  };

  const renderPage = () => {
    if (user) {
      if (currentPage === 'admin-dashboard' && user.role === 'admin') return <AdminDashboard onLogout={handleLogout} />;
      if (currentPage === 'customer-dashboard' && user.role === 'customer') return <CustomerDashboard onLogout={handleLogout} />;
      if (currentPage === 'mechanic-dashboard' && user.role === 'mechanic') return <MechanicDashboard onLogout={handleLogout} />;
    }

    switch (currentPage) {
      case 'home': return <Home onBookingClick={() => setCurrentPage('contacts')} onServicesClick={() => setCurrentPage('services')} />;
      case 'about': return <About />;
      case 'services': return <ServicesDetail onBookingClick={() => setCurrentPage('contacts')} />;
      case 'contacts': return <Contacts onFormSubmit={handleBookingSubmit} />;
      default: return <Home onBookingClick={() => setCurrentPage('contacts')} onServicesClick={() => setCurrentPage('services')} />;
    }
  };

  const isDashboard = ['admin-dashboard', 'customer-dashboard', 'mechanic-dashboard'].includes(currentPage);

  return (
    <div className="min-h-screen bg-bg text-text noise">
      {!isDashboard && (
        <Navbar 
          user={user} 
          currentPage={currentPage} 
          onLoginClick={() => setIsLoginOpen(true)} 
          onLogout={handleLogout} 
          onNavigate={setCurrentPage} 
        />
      )}

      {renderPage()}

      {!isDashboard && <Footer onNavigate={setCurrentPage} />}

      {isLoginOpen && (
        <LoginModal 
          onClose={() => setIsLoginOpen(false)} 
          onLogin={handleLogin} 
        />
      )}

      {/* Toast Container */}
      <div className="fixed bottom-10 right-10 z-[10000] flex flex-col gap-3 pointer-events-none">
        {toasts.map(t => (
          <div 
            key={t.id} 
            className="pointer-events-auto bg-card border border-white/10 rounded-xl p-5 shadow-2xl min-w-[320px] max-w-[400px] flex gap-4 animate-in slide-in-from-right-full duration-300 border-l-4"
            style={{ borderLeftColor: t.type === 'success' ? '#22C55E' : t.type === 'error' ? '#EF4444' : t.type === 'warning' ? '#F59E0B' : '#3B82F6' }}
          >
            <div className="shrink-0 mt-1">
              {t.type === 'success' && <CheckCircle className="text-success" size={20} />}
              {t.type === 'error' && <AlertTriangle className="text-danger" size={20} />}
              {t.type === 'warning' && <AlertTriangle className="text-warning" size={20} />}
              {t.type === 'info' && <Info className="text-info" size={20} />}
            </div>
            <div className="flex-1">
              <div className="font-ui font-700 text-15 uppercase tracking-wide leading-none mb-2">{t.title}</div>
              <div className="text-muted text-13 leading-tight">{t.msg}</div>
            </div>
            <button onClick={() => setToasts(prev => prev.filter(toast => toast.id !== t.id))} className="text-dim hover:text-white transition-all self-start">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
