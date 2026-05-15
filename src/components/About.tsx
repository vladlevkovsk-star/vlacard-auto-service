import { Laptop, Shield, Warehouse, Leaf } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-[68px]">
      <section className="px-10 py-24 bg-card border-b border-white/5">
        <div className="flex items-center gap-2 font-ui text-11 font-700 tracking-[3px] uppercase text-primary mb-5">
          <div className="w-[30px] h-[2px] bg-primary" />
          Про нас
        </div>
        <h2 className="font-display text-[clamp(40px,5vw,68px)] tracking-[2px] leading-tight mb-4">
          ІСТОРІЯ<br />VLACARD
        </h2>
        <p className="text-muted text-16 leading-relaxed max-w-[600px]">
          Більше 7 років ми надаємо якісний автосервіс у Львові. Ми пройшли шлях від маленької майстерні до технологічного центру.
        </p>
      </section>

      <section className="px-10 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="flex items-center gap-2 font-ui text-11 font-700 tracking-[3px] uppercase text-primary mb-5">
            <div className="w-[30px] h-[2px] bg-primary" />
            Місія
          </div>
          <h3 className="font-display text-42 tracking-widest leading-tight mb-6">
            ЯКІСТЬ БЕЗ<br />КОМПРОМІСІВ
          </h3>
          <div className="text-muted text-15 space-y-4">
            <p>
              VLACARD був заснований у 2019 році з однією метою: змінити ставлення до автосервісу. Ми хотіли створити місце, де клієнт відчуває повну довіру, а кожен механік пишається своєю роботою.
            </p>
            <p>
              Сьогодні наш сервіс — це понад 800 м² сучасного простору, 8 підйомників та професійна команда майстрів. Ми інвестуємо в обладнання та навчання, щоб бути на крок попереду сучасних автовикликів.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-card border border-white/5 rounded-xl p-5 text-center">
              <div className="font-display text-48 text-primary">2019</div>
              <div className="text-11 text-muted font-ui font-700 uppercase tracking-widest">Рік заснування</div>
            </div>
            <div className="bg-card border border-white/5 rounded-xl p-5 text-center">
              <div className="font-display text-48 text-primary">800м²</div>
              <div className="text-11 text-muted font-ui font-700 uppercase tracking-widest">Площа центру</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { icon: <Laptop />, title: 'Цифрова діагностика', desc: 'Сканери дилерського рівня та актуальне ПЗ для всіх марок.' },
            { icon: <Shield />, title: 'Власний склад', desc: 'Завжди в наявності основні розхідники та деталі від перевірених постачальників.' },
            { icon: <Warehouse />, title: 'Зручна локація', desc: 'Просторе приміщення та велика стоянка з цілодобовою охороною.' },
            { icon: <Leaf />, title: 'Еко-стандарти', desc: 'Правильна утилізація мастил та відходів відповідно до норм.' }
          ].map((item, i) => (
            <div key={i} className="bg-card border border-white/5 rounded-xl p-6 flex gap-5 hover:bg-card-dark transition-all">
              <div className="w-10 h-10 min-w-[40px] bg-primary/20 border border-primary/20 rounded-lg flex items-center justify-center text-primary">
                {item.icon}
              </div>
              <div>
                <div className="font-ui font-700 text-15 mb-1">{item.title}</div>
                <p className="text-muted text-13 leading-tight">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
