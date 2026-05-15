import { motion } from 'motion/react';
import { Calendar, ArrowRight, Star, Clock, ShieldCheck, Settings, Search, Droplets, Zap, Wind, Disc } from 'lucide-react';
import { MECHANICS, SERVICES } from '../constants';

interface HomeProps {
  onBookingClick: () => void;
  onServicesClick: () => void;
}

export default function Home({ onBookingClick, onServicesClick }: HomeProps) {
  return (
    <div className="pt-[68px]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-10 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_70%_50%,rgba(255,107,0,0.08)_0%,transparent_70%),radial-gradient(ellipse_40%_40%_at_20%_80%,rgba(255,107,0,0.05)_0%,transparent_60%),linear-gradient(180deg,#0A0A0F_0%,#0D0D14_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        <div className="relative z-10 max-w-[700px]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/20 border border-primary/20 rounded-full font-ui text-12 font-700 tracking-[2px] uppercase text-primary mb-7"
          >
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            Сертифікований автосервіс · Львів
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(64px,9vw,120px)] leading-[0.92] tracking-[3px] mb-6"
          >
            <span className="text-primary">VLA</span>
            <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,107,0,0.5)' }}>CARD</span>
            <br />
            AUTO<br />SERVICE
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-17 text-muted leading-relaxed max-w-[480px] mb-10"
          >
            Професійне обслуговування автомобілів будь-яких марок. Досвідчені механіки, сучасне обладнання та повна прозорість робіт.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button 
              onClick={onBookingClick}
              className="bg-primary text-white px-8 py-4 rounded-lg font-ui text-15 font-700 uppercase tracking-wider flex items-center gap-2.5 hover:bg-primary-dark hover:-translate-y-0.5 transition-all shadow-[0_12px_30px_rgba(255,107,0,0.35)]"
            >
              <Calendar size={18} />
              Записатись на ремонт
            </button>
            <button 
              onClick={onServicesClick}
              className="px-8 py-4 border border-white/10 rounded-lg font-ui text-15 font-700 uppercase tracking-wider hover:border-primary hover:text-primary hover:bg-primary/5 transition-all"
            >
              Переглянути послуги
            </button>
          </motion.div>
        </div>

        {/* Hero Stats */}
        <div className="hidden lg:flex absolute right-20 top-1/2 -translate-y-1/2 flex-col gap-5">
          {[
            { n: '500+', l: 'Відремонтовано авто' },
            { n: '12', l: 'Механіків' },
            { n: '7', l: 'Років досвіду' },
            { n: '98%', l: 'Задоволених клієнтів' }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="bg-card border border-white/5 rounded-2xl p-5 px-7 w-44 text-center hover:border-primary/30 transition-all"
            >
              <div className="font-display text-46 text-primary leading-none">{stat.n}</div>
              <div className="text-11 text-dim font-ui font-600 uppercase tracking-wider mt-1">{stat.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advantages */}
      <section className="px-10 py-24 bg-bg">
        <div className="flex items-center gap-2 font-ui text-11 font-700 tracking-[3px] uppercase text-primary mb-5">
          <div className="w-[30px] h-[2px] bg-primary" />
          Чому обирають нас
        </div>
        <h2 className="font-display text-[clamp(40px,5vw,68px)] tracking-[2px] leading-tight mb-4 max-w-[700px]">
          ПЕРЕВАГИ<br />VLACARD
        </h2>
        <p className="text-muted text-16 leading-relaxed max-w-[560px] mb-16">
          Ми не просто ремонтуємо — ми будуємо довгострокові відносини з кожним клієнтом, гарантуючи якість.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <ShieldCheck />, title: 'Офіційна сертифікація', desc: 'Сертифіковані спеціалісти та гарантія на всі роботи від 6 до 24 місяців.' },
            { icon: <Settings />, title: 'Сучасне обладнання', desc: 'Комп\'ютерна діагностика, 3D розвал, новітні підйомники та інструменти.' },
            { icon: <Clock />, title: 'Швидкість та точність', desc: 'Виконуємо ремонт у визначені терміни. Більшість робіт — у той самий день.' },
          ].map((adv, i) => (
            <div key={i} className="group bg-card border border-white/5 rounded-2xl p-9 hover:border-primary/20 hover:-translate-y-1 transition-all relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-primary-dark scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              <div className="w-14 h-14 bg-primary/20 border border-primary/20 rounded-xl flex items-center justify-center text-primary text-22 mb-6">
                {adv.icon}
              </div>
              <h3 className="font-ui text-20 font-700 tracking-wide mb-3">{adv.title}</h3>
              <p className="text-muted text-14 leading-relaxed">{adv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mechanics (Team) */}
      <section className="px-10 py-24 bg-card">
        <div className="flex items-center gap-2 font-ui text-11 font-700 tracking-[3px] uppercase text-primary mb-5">
          <div className="w-[30px] h-[2px] bg-primary" />
          Наші майстри
        </div>
        <h2 className="font-display text-[clamp(40px,5vw,68px)] tracking-[2px] leading-tight mb-16">
          КОМАНДА<br />ПРОФЕСІОНАЛІВ
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {MECHANICS.map((m, i) => (
            <div key={i} className="group bg-bg border border-white/5 rounded-2xl overflow-hidden hover:border-primary/30 hover:-translate-y-1.5 transition-all">
              <div className="aspect-square bg-card-dark relative overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <img 
                  src={m.image} 
                  alt={m.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="p-5">
                <div className="font-ui text-18 font-700 mb-1">{m.name}</div>
                <div className="text-primary text-12 font-600 uppercase tracking-widest font-ui mb-3">{m.role}</div>
                <div className="text-muted text-13 flex items-center gap-1.5">
                   <Star size={12} className="text-primary fill-primary" />
                   {m.exp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="px-10 py-24 bg-bg">
        <div className="flex items-center gap-2 font-ui text-11 font-700 tracking-[3px] uppercase text-primary mb-5">
          <div className="w-[30px] h-[2px] bg-primary" />
          Послуги
        </div>
        <h2 className="font-display text-[clamp(40px,5vw,68px)] tracking-[2px] leading-tight mb-16">
          ОСНОВНІ<br />НАПРЯМКИ
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {SERVICES.map((s, i) => (
            <div key={i} className="bg-card border border-white/5 rounded-2xl p-7 flex gap-5 hover:bg-card-dark transition-all">
              <div className="w-12 h-12 min-w-[48px] bg-primary/20 border border-primary/20 rounded-xl flex items-center justify-center text-primary text-20">
                 {(() => {
                   switch(s.icon) {
                     case 'Search': return <Search />;
                     case 'Droplets': return <Droplets />;
                     case 'Disc': return <Settings />;
                     case 'Zap': return <Zap />;
                     case 'Wind': return <Wind />;
                     default: return <Settings />;
                   }
                 })()}
              </div>
              <div className="flex-1">
                <div className="font-ui text-18 font-700 mb-1.5">{s.name}</div>
                <p className="text-muted text-13 mb-3.5 leading-relaxed">{s.desc}</p>
                <div className="flex items-center gap-3.5">
                  <div className="font-display text-26 text-primary">{s.price} ₴</div>
                  <div className="text-12 text-dim flex items-center gap-1">
                    <Clock size={12} />
                    {s.dur}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button 
            onClick={onServicesClick}
            className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg font-ui text-15 font-700 uppercase tracking-widest hover:bg-primary-dark transition-all"
          >
            Всі послуги <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
