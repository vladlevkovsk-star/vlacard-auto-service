import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';

interface ContactsProps {
  onFormSubmit: (data: any) => Promise<void>;
}

export default function Contacts({ onFormSubmit }: ContactsProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    email: '',
    carBrand: '',
    carModel: '',
    carYear: '',
    problem: '',
    desiredDate: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await onFormSubmit(formData);
    setLoading(false);
    setFormData({
      customerName: '',
      phone: '',
      email: '',
      carBrand: '',
      carModel: '',
      carYear: '',
      problem: '',
      desiredDate: ''
    });
  };

  return (
    <div className="pt-[68px]">
      <section className="px-10 py-24 bg-card border-b border-white/5 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start gap-2 font-ui text-11 font-700 tracking-[3px] uppercase text-primary mb-5">
          <div className="w-[30px] h-[2px] bg-primary" />
          Зв'язок
        </div>
        <h2 className="font-display text-[clamp(40px,5vw,68px)] tracking-[2px] leading-tight mb-4">
          КОНТАКТИ<br />ТА ЗАПИС
        </h2>
        <p className="text-muted text-16 leading-relaxed max-w-[560px] mx-auto md:mx-0">
          Запишіться на ремонт онлайн або зателефонуйте нам. Працюємо швидко та якісно.
        </p>
      </section>

      <section className="px-10 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <div className="flex gap-5 items-start">
            <div className="w-12 h-12 bg-primary/20 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
              <MapPin />
            </div>
            <div>
              <div className="font-ui font-700 text-16 mb-1">Адреса</div>
              <div className="text-muted text-14 leading-relaxed">м. Львів, вул. Промислова, 18<br />Залізничний район</div>
            </div>
          </div>
          
          <div className="flex gap-5 items-start">
            <div className="w-12 h-12 bg-primary/20 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
              <Phone />
            </div>
            <div>
              <div className="font-ui font-700 text-16 mb-1">Телефон</div>
              <div className="text-muted text-14 leading-relaxed">+38 (032) 260-10-10<br />+38 (067) 123-45-67</div>
            </div>
          </div>

          <div className="flex gap-5 items-start">
            <div className="w-12 h-12 bg-primary/20 border border-primary/20 rounded-xl flex items-center justify-center text-primary">
              <Clock />
            </div>
            <div>
              <div className="font-ui font-700 text-16 mb-1">Графік роботи</div>
              <div className="text-muted text-14 leading-relaxed">
                Пн – Пт: 8:00 – 20:00<br />
                Сб: 9:00 – 18:00<br />
                Нд: Вихідний
              </div>
            </div>
          </div>

          <div className="w-full h-80 bg-card rounded-2xl overflow-hidden border border-white/10 group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2572.1!2d24.03!3d49.84!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDUwJzI0LjAiTiAyNMKwMDEnNDguMCJF!5e0!3m2!1suk!2sua!4v1650000000000!5m2!1suk!2sua" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-white/5 rounded-2xl p-10 space-y-5">
          <div>
            <h3 className="font-display text-32 tracking-[1.5px] mb-2 uppercase">Запишіться зараз</h3>
            <p className="text-muted text-14 mb-7">Заповніть форму — ми передзвонимо для підтвердження запису.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block font-ui text-12 font-700 tracking-wider uppercase text-muted">Ім'я *</label>
              <input 
                required
                type="text" 
                placeholder="Іван Петренко"
                className="w-full bg-bg/50 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all text-14"
                value={formData.customerName}
                onChange={e => setFormData({...formData, customerName: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-ui text-12 font-700 tracking-wider uppercase text-muted">Телефон *</label>
                <input 
                  required
                  type="tel" 
                  placeholder="+380..."
                  className="w-full bg-bg/50 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all text-14"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="block font-ui text-12 font-700 tracking-wider uppercase text-muted">Бажана дата</label>
                <input 
                  type="date" 
                  className="w-full bg-bg/50 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all text-14"
                  value={formData.desiredDate}
                  onChange={e => setFormData({...formData, desiredDate: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block font-ui text-12 font-700 tracking-wider uppercase text-muted">Марка авто *</label>
                <input 
                  required
                  type="text" 
                  placeholder="Toyota, BMW..."
                  className="w-full bg-bg/50 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all text-14"
                  value={formData.carBrand}
                  onChange={e => setFormData({...formData, carBrand: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="block font-ui text-12 font-700 tracking-wider uppercase text-muted">Модель</label>
                <input 
                  type="text" 
                  placeholder="Camry, X5..."
                  className="w-full bg-bg/50 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all text-14"
                  value={formData.carModel}
                  onChange={e => setFormData({...formData, carModel: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-ui text-12 font-700 tracking-wider uppercase text-muted">Опис проблеми</label>
              <textarea 
                placeholder="Що трапилось з авто..."
                className="w-full bg-bg/50 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-primary transition-all text-14 min-h-[100px] resize-none"
                value={formData.problem}
                onChange={e => setFormData({...formData, problem: e.target.value})}
              />
            </div>
          </div>

          <button 
            disabled={loading}
            className="w-full bg-primary text-white py-4 rounded-lg font-ui text-15 font-700 uppercase tracking-widest flex items-center justify-center gap-2.5 hover:bg-primary-dark transition-all disabled:opacity-50"
          >
            <Send size={18} />
            {loading ? 'Надсилаємо...' : 'Відправити заявку'}
          </button>
        </form>
      </section>
    </div>
  );
}
