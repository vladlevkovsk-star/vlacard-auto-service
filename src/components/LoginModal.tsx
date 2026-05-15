import { X, LogIn, User as UserIcon, HardHat, ShieldAlert } from 'lucide-react';
import { useState } from 'react';
import { UserRole, User } from '../types';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

const DEMO_ACCOUNTS = {
  customer: { email: 'petrenko@example.com', pass: 'customer123', name: 'Іван Петренко', role: 'customer' as UserRole },
  mechanic: { email: 'shevchuk@vlacard.com', pass: 'mechanic123', name: 'Олексій Шевчук', role: 'mechanic' as UserRole },
  admin:    { email: 'admin@vlacard.com',     pass: 'admin123',    name: 'Адміністратор', role: 'admin' as UserRole }
};

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [role, setRole] = useState<UserRole>('customer');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    const acc = DEMO_ACCOUNTS[role];
    if (email === acc.email && pass === acc.pass) {
      onLogin({ id: role, name: acc.name, email: acc.email, role: acc.role });
      onClose();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const handleRoleSelect = (newRole: UserRole) => {
    setRole(newRole);
    setEmail('');
    setPass('');
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-[440px] bg-card border border-white/10 rounded-[24px] p-10 shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 bg-bg border border-white/10 rounded-lg flex items-center justify-center text-muted hover:text-red-500 hover:border-red-500/30 transition-all"
        >
          <X size={18} />
        </button>

        <div className="mb-10 text-center">
          <div className="font-display text-34 tracking-wider mb-1 uppercase">
            VLA<span className="text-primary">CARD</span>
          </div>
          <p className="text-muted text-14">Особистий кабінет автосервісу</p>
        </div>

        <h3 className="font-display text-28 tracking-widest mb-8 uppercase text-center md:text-left">Вхід</h3>

        <div className="flex gap-2 p-1 bg-bg rounded-xl mb-6">
          {(['customer', 'mechanic', 'admin'] as UserRole[]).map(r => (
            <button
              key={r}
              onClick={() => handleRoleSelect(r)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-ui text-13 font-700 tracking-wider transition-all uppercase ${
                role === r ? 'bg-primary text-white shadow-lg' : 'text-muted hover:text-white'
              }`}
            >
              {r === 'customer' && <UserIcon size={14} />}
              {r === 'mechanic' && <HardHat size={14} />}
              {r === 'admin' && <ShieldAlert size={14} />}
              <span className="hidden sm:inline">{r === 'customer' ? 'Клієнт' : r === 'mechanic' ? 'Майстер' : 'Адмін'}</span>
            </button>
          ))}
        </div>

        <div className="bg-bg border border-white/5 rounded-lg p-3.5 mb-8 text-13 text-muted leading-snug">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <strong className="text-primary font-ui uppercase font-700 text-11 tracking-wider">Demo Access</strong>
          </div>
          <div className="font-mono text-12">{DEMO_ACCOUNTS[role].email}</div>
          <div className="font-mono text-12 opacity-50">Пароль: {DEMO_ACCOUNTS[role].pass}</div>
        </div>

        <div className="space-y-5">
           <div className="space-y-2">
             <label className="text-11 font-700 font-ui uppercase tracking-widest text-muted">Email</label>
             <input 
               type="email" 
               className={`w-full bg-bg border rounded-lg px-4 py-3 outline-none transition-all text-14 ${error ? 'border-red-500/50 shake' : 'border-white/10 focus:border-primary'}`}
               placeholder="email@example.com"
               value={email}
               onChange={e => setEmail(e.target.value)}
             />
           </div>
           <div className="space-y-2">
             <label className="text-11 font-700 font-ui uppercase tracking-widest text-muted">Пароль</label>
             <input 
               type="password" 
               className={`w-full bg-bg border rounded-lg px-4 py-3 outline-none transition-all text-14 ${error ? 'border-red-500/50' : 'border-white/10 focus:border-primary'}`}
               placeholder="••••••••"
               value={pass}
               onChange={e => setPass(e.target.value)}
             />
           </div>
           
           {error && <div className="text-red-500 text-12 font-ui font-700 uppercase tracking-widest animate-in fade-in slide-in-from-top-2">Невірний логін або пароль</div>}

           <button 
             onClick={handleLogin}
             className="w-full bg-primary text-white py-4 mt-2 rounded-xl font-ui text-15 font-700 uppercase tracking-widest flex items-center justify-center gap-2.5 hover:bg-primary-dark transition-all transform active:scale-[0.98]"
           >
             <LogIn size={20} />
             Увійти в кабінет
           </button>
        </div>

        <p className="text-center mt-8 text-13 text-dim font-ui">
          Проблеми з входом? <a href="#" className="text-primary hover:underline font-700">Зв'яжіться з адміном</a>
        </p>
      </div>
    </div>
  );
}
