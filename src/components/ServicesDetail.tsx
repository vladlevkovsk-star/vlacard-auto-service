import { Search, Droplets, Settings, Disc, Zap, Wind, Clock, ArrowRight } from 'lucide-react';
import { SERVICES } from '../constants';

export default function ServicesDetail({ onBookingClick }: { onBookingClick: () => void }) {
  return (
    <div className="pt-[68px]">
      <section className="px-10 py-24 bg-card border-b border-white/5">
        <div className="flex items-center gap-2 font-ui text-11 font-700 tracking-[3px] uppercase text-primary mb-5">
          <div className="w-[30px] h-[2px] bg-primary" />
          Повний каталог
        </div>
        <h2 className="font-display text-[clamp(40px,5vw,68px)] tracking-[2px] leading-tight mb-4">
          ПОСЛУГИ<br />VLACARD
        </h2>
        <p className="text-muted text-16 leading-relaxed max-w-[560px]">
          Повний спектр комп'ютерної діагностики та обслуговування. Використовуємо лише якісні комплектуючі.
        </p>
      </section>

      <section className="px-10 py-24 bg-bg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <div key={i} className="group bg-card border border-white/5 rounded-2xl p-8 hover:border-primary/30 transition-all flex flex-col justify-between h-full">
              <div>
                <div className="w-14 h-14 bg-primary/20 border border-primary/20 rounded-xl flex items-center justify-center text-primary mb-7 group-hover:scale-110 transition-transform">
                  {(() => {
                    switch(s.icon) {
                      case 'Search': return <Search size={28} />;
                      case 'Droplets': return <Droplets size={28} />;
                      case 'Disc': return <Disc size={28} />;
                      case 'Zap': return <Zap size={28} />;
                      case 'Wind': return <Wind size={28} />;
                      default: return <Settings size={28} />;
                    }
                  })()}
                </div>
                <h3 className="font-ui text-22 font-700 mb-3 uppercase tracking-wide">{s.name}</h3>
                <p className="text-muted text-14 leading-relaxed mb-8">{s.desc}</p>
              </div>
              
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-display text-32 text-primary">{s.price} ₴</div>
                  <div className="text-11 text-muted uppercase font-ui font-700 flex items-center gap-1">
                    <Clock size={12} /> {s.dur}
                  </div>
                </div>
                <button 
                  onClick={onBookingClick}
                  className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-xl"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="px-10 py-24 bg-primary flex flex-col items-center text-center">
        <h2 className="font-display text-64 text-white uppercase tracking-wider mb-4">Не знайшли потрібну послугу?</h2>
        <p className="text-white/80 text-18 font-ui max-w-[600px] mb-10 font-500">
          Зателефонуйте нам, і ми проконсультуємо вас з будь-якого питання ремонту вашого автомобіля.
        </p>
        <button 
          onClick={onBookingClick}
          className="bg-white text-primary px-12 py-5 rounded-xl font-ui text-16 font-800 uppercase tracking-widest hover:bg-bg hover:text-white transition-all"
        >
          Безкоштовна консультація
        </button>
      </section>
    </div>
  );
}
