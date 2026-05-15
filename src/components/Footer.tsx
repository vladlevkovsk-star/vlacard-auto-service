import { Wrench, Mail, Phone, MapPin, Clock, Instagram, Facebook, Send } from 'lucide-react';

export default function Footer({ onNavigate }: { onNavigate: (page: string) => void }) {
  return (
    <footer className="px-10 py-20 bg-card border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
              <Wrench size={20} />
            </div>
            <div className="font-display text-24 tracking-[2px] leading-none uppercase">
              VLA<span className="text-primary">CARD</span>
            </div>
          </div>
          <p className="text-muted text-14 leading-relaxed">
            Професійний автосервіс у Львові. Ремонт та обслуговування автомобілів з гарантією якості та повною історією робіт в особистому кабінеті.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-muted hover:text-primary hover:border-primary border border-transparent transition-all"><Instagram size={18} /></a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-muted hover:text-primary hover:border-primary border border-transparent transition-all"><Facebook size={18} /></a>
            <a href="#" className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-muted hover:text-primary hover:border-primary border border-transparent transition-all"><Send size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-ui text-13 font-700 uppercase tracking-widest text-muted mb-8">Навігація</h4>
          <ul className="space-y-4">
            {['Головна', 'Про СТО', 'Послуги', 'Контакти'].map((label, i) => (
              <li key={i}>
                <button 
                  onClick={() => onNavigate(['home', 'about', 'services', 'contacts'][i])}
                  className="text-muted hover:text-primary transition-all text-14 font-medium"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-ui text-13 font-700 uppercase tracking-widest text-muted mb-8">Популярні послуги</h4>
          <ul className="space-y-4">
            {['Діагностика', 'Ремонт двигуна', 'Ходова частина', 'Електрообладнання'].map((label, i) => (
              <li key={i}>
                <button className="text-muted hover:text-primary transition-all text-14 font-medium">{label}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-ui text-13 font-700 uppercase tracking-widest text-muted mb-8">Контакти</h4>
          <ul className="space-y-5">
            <li className="flex items-center gap-3 text-14 group">
              <Phone size={16} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="text-muted">+38 (032) 260-10-10</span>
            </li>
            <li className="flex items-center gap-3 text-14 group">
              <Mail size={16} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="text-muted">info@vlacard.com</span>
            </li>
            <li className="flex items-center gap-3 text-14 group">
              <MapPin size={16} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="text-muted">вул. Промислова, 18, Львів</span>
            </li>
            <li className="flex items-center gap-3 text-14 group">
              <Clock size={16} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="text-muted">Пн–Сб 8:00 – 20:00</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-dim text-13 font-ui font-500">
        <div>© 2026 VLACARD Auto Service. Всі права захищені.</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-all">Політика конфіденційності</a>
          <a href="#" className="hover:text-primary transition-all">Умови користування</a>
        </div>
      </div>
    </footer>
  );
}
