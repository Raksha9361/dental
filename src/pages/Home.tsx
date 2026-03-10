import React, { useEffect, useState } from 'react';
import { Bell, Camera } from 'lucide-react';
import { MOCK_USER } from '../constants';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { Case } from '../types';
import { format } from 'date-fns';

export const Home = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const currentDate = format(new Date(), 'eeee, MMMM d');

  useEffect(() => {
    fetch('/api/cases')
      .then(res => res.json())
      .then(data => {
        setCases(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching cases:", err);
        setLoading(false);
      });
  }, []);

  const stats = [
    { label: 'Total Cases', value: cases.length, color: 'text-sky-500' },
    { label: 'This Week', value: cases.filter(c => new Date(c.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, color: 'text-sky-500' },
    { label: 'Pending', value: cases.filter(c => c.status === 'Pending').length, color: 'text-sky-500' },
  ];

  return (
    <div className="pb-20 px-6 pt-6 max-w-md mx-auto bg-slate-50 min-h-screen">
      <header className="flex justify-between items-start mb-6">
        <div>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">{currentDate}</p>
          <h1 className="text-xl font-bold text-slate-900 leading-tight">Good Morning, {MOCK_USER.name}</h1>
        </div>
        <button className="relative p-2 bg-white rounded-full shadow-sm border border-gray-100">
          <Bell size={18} className="text-slate-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <div className="grid grid-cols-3 gap-2 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
            <span className={cn("text-xl font-bold mb-0.5", stat.color)}>{stat.value}</span>
            <span className="text-[9px] text-gray-400 font-bold uppercase text-center tracking-tighter">{stat.label}</span>
          </div>
        ))}
      </div>

      <section className="mb-6">
        <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Actions</h2>
        <Link 
          to="/scan"
          className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3.5 rounded-xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-sky-200 transition-all active:scale-95"
        >
          <Camera size={18} />
          Start New Scan
        </Link>
      </section>

      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recent Cases</h2>
          <button className="text-sky-500 text-[10px] font-bold uppercase">View All</button>
        </div>
        <div className="space-y-2">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : cases.length > 0 ? (
            cases.slice(0, 5).map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={item.id}
                className="bg-white p-4 rounded-xl border-l-4 border-l-sky-500 border border-gray-100 shadow-sm flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-slate-900">{item.patientName}</h3>
                  <p className="text-xs text-gray-400">Tooth {item.tooth} · {item.date}</p>
                </div>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold",
                  item.status === 'Analyzed' ? "bg-emerald-50 text-emerald-600" :
                  item.status === 'Pending' ? "bg-amber-50 text-amber-600" :
                  "bg-sky-50 text-sky-600"
                )}>
                  {item.status}
                </span>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400 text-sm py-8">No cases found.</p>
          )}
        </div>
      </section>
    </div>
  );
};
