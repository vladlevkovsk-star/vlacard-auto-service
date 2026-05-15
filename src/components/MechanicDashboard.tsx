import { LayoutDashboard, ClipboardList, Timer, Boxes, LogOut, Wrench } from 'lucide-react';
import { useState } from 'react';

interface DashProps {
  onLogout: () => void;
}

export default function MechanicDashboard({ onLogout }: DashProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Огляд', icon: <LayoutDashboard size={18} /> },
    { id: 'orders', label: 'Мої замовлення', icon: <ClipboardList size={18} /> },
    { id: 'worklog', label: 'Відмітка годин', icon: <Timer size={18} /> },
    { id: 'parts', label: 'Запчастини', icon: <Boxes size={18} /> },
  ];

  return (
    <div className="pt-[68px] flex min-h-screen bg-bg">
      <aside className="w-64 bg-card border-r border-white/5 flex flex-col fixed h-[calc(100vh-68px)]">
        <div className="p-6 border-b border-white/5 bg-card-dark/50">
          <div className="w-12 h-12 bg-primary/20 border border-primary/20 rounded-xl flex items-center justify-center text-primary mb-3">
            <Wrench size={24} />
          </div>
          <div className="font-ui font-700 text-16">Олексій Шевчук</div>
          <div className="text-11 font-ui font-700 uppercase tracking-widest text-primary">Майстер</div>
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
            <h1 className="font-display text-40 tracking-wider">РОБОЧЕ МІСЦЕ</h1>
            <p className="text-muted text-14 mt-1">Керування процесом ремонту</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { l: 'Активних замовлень', v: '4', c: 'orange' },
            { l: 'Завершено сьогодні', v: '2', c: 'green' },
            { l: 'Трудогодин', v: '6.5', c: 'blue' },
            { l: 'Результативність', v: '94%', c: 'white' }
          ].map((m, i) => (
            <div key={i} className="bg-card border border-white/5 rounded-2xl p-6">
              <div className="text-11 font-ui font-700 uppercase tracking-widest text-muted mb-3">{m.l}</div>
              <div className={`font-display text-40 leading-none ${m.c === 'orange' ? 'text-primary' : m.c === 'green' ? 'text-success' : 'text-white'}`}>{m.v}</div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-white/5 rounded-2xl p-8 text-center border-dashed">
          <div className="w-20 h-20 bg-bg rounded-2xl border border-white/10 flex items-center justify-center text-muted mx-auto mb-6">
             <Construction size={40} className="animate-pulse" />
          </div>
          <h2 className="font-ui text-20 font-700 mb-2 uppercase tracking-widest">Розділ у розробці</h2>
          <p className="text-muted max-w-[400px] mx-auto">Ми працюємо над повним функціоналом кабінету майстра для відмітки годин та списання запчастин.</p>
        </div>
      </main>
    </div>
  );
}

import { Construction } from 'lucide-react';
