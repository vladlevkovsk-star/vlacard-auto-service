import { Bell, Package, CreditCard, LayoutDashboard, LogOut, CheckCircle, Clock, Construction } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Application, Message } from '../types';

interface DashProps {
  onLogout: () => void;
}

export default function CustomerDashboard({ onLogout }: DashProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [apps, setApps] = useState<Application[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const [appsRes, msgRes] = await Promise.all([
        fetch('/api/applications'),
        fetch('/api/messages')
      ]);
      const appsData = await appsRes.json();
      const msgData = await msgRes.json();
      setApps(appsData);
      setMessages(msgData.reverse()); // Latest first
    } catch (e) {
      console.error(e);
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Огляд', icon: <LayoutDashboard size={18} /> },
    { id: 'orders', label: 'Мої замовлення', icon: <Package size={18} /> },
    { id: 'payments', label: 'Оплати', icon: <CreditCard size={18} /> },
    { id: 'notifications', label: 'Сповіщення', icon: <Bell size={18} /> },
  ];

  return (
    <div className="pt-[68px] flex min-h-screen bg-bg">
      <aside className="w-64 bg-card border-r border-white/5 flex flex-col fixed h-[calc(100vh-68px)]">
        <div className="p-6 border-b border-white/5 bg-card-dark/50">
          <div className="w-12 h-12 bg-primary group border border-primary/20 rounded-xl flex items-center justify-center text-white mb-3">
            <Package size={24} />
          </div>
          <div className="font-ui font-700 text-16">Іван Петренко</div>
          <div className="text-11 font-ui font-700 uppercase tracking-widest text-primary">Клієнт</div>
        </div>
        
        <nav className="flex-1 p-3 space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-ui font-600 transition-all ${
                activeTab === item.id ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="m-3 p-3 text-red-500 font-ui font-700 text-14 flex items-center gap-2 hover:bg-red-500/10 rounded-lg transition-all"
        >
          <LogOut size={16} /> Вийти
        </button>
      </aside>

      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="flex justify-between items-start mb-10 border-b border-white/5 pb-6">
          <div>
            <h1 className="font-display text-40 tracking-wider uppercase">{activeTab === 'overview' ? 'ОГЛЯД ПОРТАЛУ' : menuItems.find(m => m.id === activeTab)?.label}</h1>
            <p className="text-muted text-14 mt-1">Остання інформація по вашому авто</p>
          </div>
          <div className="text-muted text-13 font-ui group px-4 py-2 bg-card border border-white/5 rounded-lg flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Online
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card border border-primary/20 rounded-2xl p-7 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform"></div>
                 <div className="text-11 font-ui font-700 uppercase tracking-widest text-primary mb-4">Активне замовлення</div>
                 <div className="font-display text-48 leading-none mb-3">#{apps[0]?.id || '...'}</div>
                 <div className="flex items-center gap-2 text-primary font-ui font-700 text-14">
                   <Construction size={16} />
                   <span>Ремонт розпочато</span>
                 </div>
              </div>
              
              <div className="bg-card border border-white/5 rounded-2xl p-7">
                 <div className="text-11 font-ui font-700 uppercase tracking-widest text-muted mb-4">До сплати</div>
                 <div className="font-display text-48 text-success leading-none mb-3">3 850 ₴</div>
                 <div className="text-muted text-13">Орієнтовна вартість робіт</div>
              </div>

               <div className="bg-card border border-white/5 rounded-2xl p-7">
                 <div className="text-11 font-ui font-700 uppercase tracking-widest text-muted mb-4">Сповіщення</div>
                 <div className="font-display text-48 leading-none mb-3">{messages.length}</div>
                 <div className="text-muted text-13">Повідомлень від майстра</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4">
                 <h2 className="font-ui text-18 font-700 flex items-center gap-2">
                   <Bell className="text-primary" size={18} /> Останні новини
                 </h2>
                 <div className="space-y-3">
                   {messages.slice(0, 3).map(m => (
                     <div key={m.id} className="bg-card border border-white/5 rounded-xl p-5 flex gap-4">
                        <div className={`w-10 h-10 min-w-[40px] rounded-lg flex items-center justify-center opacity-80 ${m.type === 'info' ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary'}`}>
                          <Bell size={18} />
                        </div>
                        <div>
                          <div className="font-bold text-14 mb-1">{m.title}</div>
                          <p className="text-12 text-muted leading-relaxed">{m.content}</p>
                          <div className="text-10 text-primary/50 font-ui mt-2 uppercase">{new Date(m.createdAt).toLocaleTimeString()}</div>
                        </div>
                     </div>
                   ))}
                   {messages.length === 0 && <div className="p-10 border border-dashed border-white/10 rounded-xl text-center text-muted">Немає повідомлень</div>}
                 </div>
              </div>

               <div className="space-y-4">
                 <h2 className="font-ui text-18 font-700 flex items-center gap-2">
                   <CheckCircle className="text-success" size={18} /> Мої авто
                 </h2>
                 <div className="bg-card border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-card-dark rounded-xl border border-white/5 flex items-center justify-center text-primary">
                        <Car size={32} />
                      </div>
                      <div>
                        <div className="text-20 font-bold">Toyota Camry</div>
                        <div className="text-muted text-14">Рік: 2019 · VIN: 1HG...345</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-13">
                        <span className="text-muted uppercase font-ui tracking-wider font-700 text-11">Останнє ТО</span>
                        <span>03.04.2026</span>
                      </div>
                      <div className="flex justify-between text-13">
                        <span className="text-muted uppercase font-ui tracking-wider font-700 text-11">Пробіг</span>
                        <span>87 000 км</span>
                      </div>
                      <div className="pt-3 border-t border-white/5">
                        <div className="w-full bg-bg h-2 rounded-full overflow-hidden">
                           <div className="bg-primary h-full w-[80%]"></div>
                        </div>
                        <div className="flex justify-between mt-2 text-10 font-ui font-700 uppercase tracking-widest text-primary">
                          <span>Стан ремонту</span>
                          <span>80% готово</span>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-[#0A0A0F] text-muted text-11 font-ui font-700 uppercase tracking-widest border-b border-white/5">
                     <tr>
                        <th className="p-4">№ Замовлення</th>
                        <th className="p-4">Послуга</th>
                        <th className="p-4">Статус</th>
                        <th className="p-4">Сума</th>
                        <th className="p-4">Дата</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5">
                      {apps.map(app => (
                        <tr key={app.id} className="hover:bg-white/5 transition-all text-14">
                           <td className="p-4 font-display text-20 text-primary">#{app.id}</td>
                           <td className="p-4 font-bold">{app.problem}</td>
                           <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-10 font-700 uppercase tracking-wider ${
                                app.status === 'ready' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-primary/10 text-primary border border-primary/20'
                              }`}>
                                {app.status === 'pending' ? 'В черзі' :
                                 app.status === 'repairing' ? 'В ремонті' :
                                 app.status === 'ready' ? 'Готово' : app.status}
                              </span>
                           </td>
                           <td className="p-4 font-ui font-700 text-16">3 850 ₴</td>
                           <td className="p-4 text-muted">{new Date(app.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           </div>
        )}

        {activeTab === 'notifications' && (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-4">
              {messages.map(m => (
                 <div key={m.id} className="bg-card border border-white/5 rounded-2xl p-8 flex gap-8 items-start hover:border-primary/20 transition-all border-l-8" style={{ borderLeftColor: `var(--${m.type})` }}>
                    <div className="w-16 h-16 bg-bg border border-white/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      <Bell size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <h2 className="text-20 font-bold">{m.title}</h2>
                        <span className="text-10 px-2 py-0.5 bg-white/5 rounded-full text-muted font-ui uppercase font-700 tracking-wider">
                          {new Date(m.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-15 text-muted leading-relaxed max-w-[700px]">
                        {m.content}
                      </p>
                    </div>
                 </div>
              ))}
              {messages.length === 0 && (
                <div className="text-center py-20 px-10 bg-card border border-dashed border-white/10 rounded-2xl">
                   <Bell className="mx-auto mb-4 text-muted opacity-30" size={48} />
                   <div className="text-muted font-ui font-700 uppercase tracking-widest">Сповіщень немає</div>
                </div>
              )}
           </div>
        )}
      </main>
    </div>
  );
}
