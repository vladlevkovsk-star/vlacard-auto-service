import { UserRole, User } from '../types';
import { Wrench, LogIn, LogOut, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ user, onLoginClick, onLogout, onNavigate, currentPage }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Головна' },
    { id: 'about', label: 'Про СТО' },
    { id: 'services', label: 'Послуги' },
    { id: 'contacts', label: 'Контакти' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5 h-[68px] flex items-center justify-between px-6 md:px-10">
      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => onNavigate('home')}
      >
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
          <Wrench size={20} />
        </div>
        <div className="font-display text-24 tracking-[2px] leading-none">
          VLA<span className="text-primary">CARD</span>
        </div>
      </div>

      <ul className="hidden md:flex items-center gap-1">
        {navItems.map(item => (
          <li key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              className={`font-ui text-15 font-600 uppercase tracking-wider px-4 py-2 rounded-md transition-all ${
                currentPage === item.id ? 'text-primary bg-primary/20' : 'text-muted hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-card-dark border border-primary/20 rounded-lg text-primary font-ui text-13 font-600">
              <UserIcon size={16} />
              <span>{user.name}</span>
            </div>
            <button 
              onClick={onLogout}
              className="px-4 py-2 border border-white/10 rounded-md text-muted font-ui text-13 font-600 uppercase hover:border-red-500/50 hover:text-red-500 flex items-center gap-2"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Вийти</span>
            </button>
          </>
        ) : (
          <button
            onClick={onLoginClick}
            className="bg-primary text-white px-5 py-2.5 rounded-md font-ui text-14 font-700 uppercase tracking-wider hover:bg-primary-dark transition-all flex items-center gap-2"
          >
            <LogIn size={16} />
            <span>Увійти</span>
          </button>
        )}
      </div>
    </nav>
  );
}
