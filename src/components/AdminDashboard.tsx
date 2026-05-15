import { LayoutDashboard, Users, Car, HardHat, Tools, Boxes, ClipboardList, CreditCard, Bell, LogOut, Send } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Application, Message } from '../types';

interface DashProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: DashProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [apps, setApps] = useState<Application[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState({ title: '', content: '', type: 'info' as const });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Polling for "real-time" feel
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
      setMessages(msgData);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMessage)
      });
      setNewMessage({ title: '', content: '', type: 'info' });
      fetchData();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Огляд', icon: <LayoutDashboard size={18} /> },
    { id: 'applications', label: 'Заявки', icon: <ClipboardList size={18} /> },
    { id: 'messages', label: 'Сповіщення', icon: <Bell size={18} /> },
    { id: 'customers', label: 'Клієнти', icon: <Users size={18} /> },
    { id: 'mechanics', label: 'Механіки', icon: <HardHat size={18} /> },
  ];

  return (
    <div className="pt-[68px] flex min-h-screen bg-bg">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-white/5 flex flex-col fixed h-[calc(100vh-68px)]">
        <div className="p-6 border-b border-white/5 bg-card-dark/50">
          <div className="w-12 h-12 bg-primary/20 border border-primary/20 rounded-xl flex items-center justify-center text-primary mb-3">
            <Users size={24} />
          </div>
          <div className="font-ui font-700 text-16">Адміністратор</div>
          <div className="text-11 font-ui font-700 uppercase tracking-widest text-primary">Master Control</div>
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

      {/* Main Content */}
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-start mb-10 border-b border-white/5 pb-6">
              <div>
                <h1 className="font-display text-40 tracking-wider">ОГЛЯД СТО</h1>
                <p className="text-muted text-14 mt-1">Остання статистика та активність</p>
              </div>
              <div className="text-muted text-13 font-ui group px-4 py-2 bg-card border border-white/5 rounded-lg">
                <span className="text-primary font-700">ТРАВЕНЬ 2026</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { l: 'Нових заявок', v: apps.filter(a => a.status === 'pending').length, c: 'orange' },
                { l: 'В ремонті', v: apps.filter(a => a.status === 'repairing' || a.status === 'diagnosing').length, c: 'blue' },
                { l: 'Готово до видачі', v: apps.filter(a => a.status === 'ready').length, c: 'green' },
                { l: 'Сповіщень надіслано', v: messages.length, c: 'white' }
              ].map((m, i) => (
                <div key={i} className="bg-card border border-white/5 rounded-2xl p-6 hover:border-primary/20 transition-all">
                  <div className="text-11 font-ui font-700 uppercase tracking-widest text-muted mb-3">{m.l}</div>
                  <div className={`font-display text-40 leading-none ${m.c === 'orange' ? 'text-primary' : m.c === 'green' ? 'text-success' : 'text-white'}`}>{m.v}</div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-white/5 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-white/5 font-ui font-700 text-17 flex justify-between items-center">
                Останні замовлення
                <button 
                  onClick={() => setActiveTab('applications')}
                  className="text-primary text-13 font-600 hover:underline"
                >
                  Всі замовлення
                </button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-[#0A0A0F] text-muted text-11 font-ui font-700 uppercase tracking-widest">
                  <tr>
                    <th className="p-4">ID</th>
                    <th className="p-4">Клієнт</th>
                    <th className="p-4">Авто</th>
                    <th className="p-4">Статус</th>
                    <th className="p-4">Дія</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {apps.slice(0, 5).map(app => (
                    <tr key={app.id} className="hover:bg-white/5 transition-all text-14">
                      <td className="p-4 font-display text-18 text-primary">#{app.id}</td>
                      <td className="p-4 font-medium">{app.customerName}</td>
                      <td className="p-4">{app.carBrand} {app.carModel}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-10 font-700 uppercase tracking-wider ${
                          app.status === 'pending' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                          app.status === 'diagnosing' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                          app.status === 'repairing' ? 'bg-indigo-500/10 text-indigo-500 border border-indigo-500/20' :
                          'bg-green-500/10 text-green-500 border border-green-500/20'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button 
                          onClick={() => setActiveTab('applications')}
                          className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-md text-primary text-12 font-700 uppercase hover:bg-primary hover:text-white transition-all"
                        >
                          Деталі
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h1 className="font-display text-40 tracking-wider mb-10">Всі заявки</h1>
             <div className="grid gap-4">
               {apps.map(app => (
                 <div key={app.id} className="bg-card border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                   <div>
                     <div className="flex items-center gap-3 mb-2">
                       <span className="font-display text-24 text-primary">#{app.id}</span>
                       <span className={`px-2 py-0.5 rounded text-10 font-700 uppercase tracking-widest ${
                          app.status === 'pending' ? 'bg-orange-500/20 text-orange-500' : 'bg-green-500/20 text-green-500'
                       }`}>
                         {app.status}
                       </span>
                     </div>
                     <div className="text-16 font-bold">{app.customerName} — {app.phone}</div>
                     <div className="text-muted text-14">{app.carBrand} {app.carModel} ({app.carYear})</div>
                     <div className="text-primary text-13 mt-2 bg-primary/5 p-3 rounded-lg border border-primary/10 italic">
                       «{app.problem}»
                     </div>
                   </div>
                   <div className="flex flex-col gap-2 min-w-[200px]">
                      <label className="text-10 font-700 uppercase text-muted tracking-widest">Змінити статус</label>
                      <select 
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className="bg-bg border border-white/10 rounded-lg p-2 text-14 outline-none focus:border-primary transition-all"
                      >
                        <option value="pending">Прийнято (В черзі)</option>
                        <option value="diagnosing">Діагностика</option>
                        <option value="repairing">В ремонті</option>
                        <option value="ready">Готово до видачі</option>
                        <option value="completed">Видано клієнту</option>
                      </select>
                   </div>
                 </div>
               ))}
               {apps.length === 0 && <div className="text-center p-20 text-muted">Немає активних заявок</div>}
             </div>
          </div>
        )}

        {activeTab === 'messages' && (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <h1 className="font-display text-40 tracking-wider mb-10">Сповіщення клієнтам</h1>
             
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
               <form onSubmit={handleSendMessage} className="bg-card border border-white/5 rounded-2xl p-8 space-y-6">
                 <h2 className="font-ui text-20 font-700 uppercase tracking-widest flex items-center gap-2">
                   <Send className="text-primary" size={20} />
                   Нове повідомлення
                 </h2>
                 <div className="space-y-4">
                   <div className="space-y-2">
                     <label className="text-11 font-700 uppercase text-muted tracking-widest">Заголовок</label>
                     <input 
                       required
                       className="w-full bg-bg border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-all text-14"
                       placeholder="Замовлення готове / Проблема виявлена..."
                       value={newMessage.title}
                       onChange={e => setNewMessage({...newMessage, title: e.target.value})}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-11 font-700 uppercase text-muted tracking-widest">Тип</label>
                     <select 
                       className="w-full bg-bg border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-all text-14"
                       value={newMessage.type}
                       onChange={e => setNewMessage({...newMessage, type: e.target.value as any})}
                     >
                       <option value="info">Інформаційне (Blue)</option>
                       <option value="success">Успіх / Готово (Green)</option>
                       <option value="warning">Попередження (Yellow)</option>
                       <option value="danger">Терміново (Red)</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-11 font-700 uppercase text-muted tracking-widest">Зміст повідомлення</label>
                     <textarea 
                       required
                       className="w-full bg-bg border border-white/10 rounded-lg p-3 outline-none focus:border-primary transition-all text-14 min-h-[120px] resize-none"
                       placeholder="Опишіть деталі для клієнта..."
                       value={newMessage.content}
                       onChange={e => setNewMessage({...newMessage, content: e.target.value})}
                     />
                   </div>
                 </div>
                 <button 
                   disabled={loading}
                   className="w-full bg-primary text-white py-4 rounded-xl font-ui text-15 font-700 uppercase tracking-widest hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                 >
                   <Send size={18} />
                   Надіслати всім клієнтам
                 </button>
               </form>

               <div className="space-y-4">
                 <h2 className="font-ui text-20 font-700 uppercase tracking-widest">Історія відправлень</h2>
                 <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                   {messages.map(m => (
                     <div key={m.id} className="bg-card-dark/50 border border-white/5 rounded-xl p-5 border-l-4" style={{ borderLeftColor: `var(--${m.type})` }}>
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-bold text-15">{m.title}</div>
                          <div className="text-10 text-muted font-ui uppercase">{new Date(m.createdAt).toLocaleString()}</div>
                        </div>
                        <p className="text-13 text-muted leading-relaxed">{m.content}</p>
                     </div>
                   ))}
                   {messages.length === 0 && <div className="text-center p-10 text-muted border border-dashed border-white/10 rounded-xl">Історія порожня</div>}
                 </div>
               </div>
             </div>
           </div>
        )}
      </main>
    </div>
  );
}
